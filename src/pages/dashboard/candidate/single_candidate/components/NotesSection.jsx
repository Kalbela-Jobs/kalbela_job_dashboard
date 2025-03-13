import { UserAddOutlined } from "@ant-design/icons";
import { message, Select } from "antd";
import { useState } from "react";

export default function NotesSection({ data }) {
  const [note, setNote] = useState(""); // Textarea এর স্টেট
  const [savedNotes, setSavedNotes] = useState([]); // সংরক্ষিত নোট গুলো রাখার জন্য

  const handleSave = () => {
    if (note.trim() === "") return; // খালি নোট গ্রহণ করবে না

    setSavedNotes([...savedNotes, note]);
    message.success("Note Store Successfully");
    // নতুন নোট অ্যারে তে যোগ করবে
    setNote(""); // Textarea খালি করবে
  };
  return (
    <div className="w-80 bg-white p-6 border-l">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">Notes</h3>
        <p className="text-sm text-gray-500">(Notes for team members only)</p>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-lg p-3 min-h-[200px] mb-4"
        placeholder="Add a note here"
      />

      <Select
        className="w-full mb-4"
        placeholder="Tag a manager"
        options={[
          { value: "manager1", label: "Manager 1" },
          { value: "manager2", label: "Manager 2" },
        ]}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setNote("")}
          className="flex-1 bg-red-50 text-red-600 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      <div className="mt-5">
        <div className="list-disc pl-5 bg-gray-100">
          {savedNotes.length > 0 && (
            <div className="flex items-center justify-start gap-4 py-1 ">
              <div>
                <UserAddOutlined />
              </div>
              <div>
                <h2 className="text-md font-semibold ">
                  {data?.user?.fullName}
                </h2>
              </div>
            </div>
          )}
          {savedNotes.map((item, index) => (
            <div key={index} className=" p-2 rounded mb-1">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
