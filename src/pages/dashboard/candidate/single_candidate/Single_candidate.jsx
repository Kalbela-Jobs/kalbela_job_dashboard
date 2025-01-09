import { Tabs } from 'antd'
import { UserOutlined, FileTextOutlined, CheckOutlined, MessageOutlined } from '@ant-design/icons'
import ProfileSidebar from './components/ProfileSidebar'
import ResumeViewer from './components/ResumeViewer'
import NotesSection from './components/NotesSection'
import ConversationTimeline from './components/ConversationTimeline'
import { useQuery } from '@tanstack/react-query'
import { Kalbela_AuthProvider } from '../../../../context/MainContext'
import { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Qualification from './components/Qualification'


const Single_candidate = () => {

      const { id } = useParams();
      const { base_url } = useContext(Kalbela_AuthProvider);

      console.log("Candidate ID:", id);
      console.log("Base URL:", base_url);

      // Fetch candidate data
      const { data, isLoading, error } = useQuery({
            queryKey: ["candidate", id],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/employer/candidate?candidate_id=${id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!id && !!base_url,
      });

      // Handle loading state
      if (isLoading) {
            return <div>Loading candidate details...</div>;
      }

      // Handle errors
      if (error) {
            return <div>Error: {error.message}</div>;
      }

      const items = [

            {
                  key: '1',
                  label: (
                        <span className="flex items-center gap-2">
                              <FileTextOutlined />
                              Resume
                        </span>
                  ),
                  children: <ResumeViewer data={data} />,
            },
            {
                  key: '2',
                  label: (
                        <span className="flex items-center gap-2">
                              <UserOutlined />
                              Qualifications
                        </span>
                  ),
                  children: <Qualification data={data} />,
            },
            {
                  key: '3',
                  label: (
                        <span className="flex items-center gap-2">
                              <CheckOutlined />
                              Evaluation
                        </span>
                  ),
                  children: <div className="p-4">Evaluation content</div>,
            },
            {
                  key: '4',
                  label: (
                        <span className="flex items-center gap-2">
                              <MessageOutlined />
                              Conversation
                        </span>
                  ),
                  children: <ConversationTimeline />,
            },
      ]

      return (
            <div>
                  <div className="flex min-h-screen bg-gray-50 px-10">
                        <ProfileSidebar data={data} />
                        <main className="flex-1 p-6">
                              <Tabs defaultActiveKey="1" items={items} className="bg-white rounded-lg p-4" />
                        </main>
                        <NotesSection />
                  </div>
            </div>
      );
};

export default Single_candidate;
