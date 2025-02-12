
import { useContext, useState } from "react";
import MessageInput from "../../../message/components/MessageInput"
import Message from "../../../message/Message"
import { initialMessages, users } from "../../../../../utils/message_data";
import ChatArea from "../../../message/components/ChatArea";
import { useParams } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../../context/MainContext";
import { useQuery } from "@tanstack/react-query";
import uploadImage from "../../../../../hooks/upload_image";
import upload_audio from "../../../../../hooks/upload_audio";

export default function ConversationTimeline({ candidate }) {
      const [selectedUser, setSelectedUser] = useState(users[0]);
      const { base_url, user } = useContext(Kalbela_AuthProvider);
      const { id } = useParams();





      const { data: messages = [], isLoading, error, refetch } = useQuery({
            queryKey: ["chat", user._id, candidate.user_id],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/chat/get-chat-by-user?token=${user._id}&to=${candidate.user_id}&sender=${user._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!user._id && !!candidate.user_id && !!base_url,
      });


      const handleSendMessage = async (message) => {

            const newMessage = {
                  to: candidate.user_id,
                  sender: user._id,
                  content: message.text,
                  attachments: message.attachments?.length
                        ? await Promise.all(message.attachments.map(async (attachment) => uploadImage(attachment.file)))
                        : [],
                  audio: message.audio ? await upload_audio(message.audio) : null,
                  timestamp: new Date().toISOString(),
            };

            fetch(`${base_url}/chat/add-new-chat?token=${user._id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newMessage),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                  });

            // setMessages(prevMessages => ({
            //       ...prevMessages,
            //       [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
            // }));
      };

      return (
            <div>
                  <div className="rounded-2xl bg-red-500  overflow-auto">
                        <ChatArea refetch={refetch} isLoading={isLoading} candidate={candidate} messages={messages} selectedUser={selectedUser} onSendMessage={handleSendMessage} />
                  </div>

                  {/* <MessageInput onSendMessage={handleSendMessage} /> */}
            </div>
      )
}
