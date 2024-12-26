import { Tabs } from 'antd'
import { UserOutlined, FileTextOutlined, CheckOutlined, MessageOutlined } from '@ant-design/icons'
import ProfileSidebar from './components/ProfileSidebar'
import ResumeViewer from './components/ResumeViewer'
import NotesSection from './components/NotesSection'
import ConversationTimeline from './components/ConversationTimeline'

const Single_candidate = () => {

      const items = [
            {
                  key: '1',
                  label: (
                        <span className="flex items-center gap-2">
                              <UserOutlined />
                              Application
                        </span>
                  ),
                  children: <div className="p-4">Application content</div>,
            },
            {
                  key: '2',
                  label: (
                        <span className="flex items-center gap-2">
                              <FileTextOutlined />
                              Resume
                        </span>
                  ),
                  children: <ResumeViewer />,
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
                        <ProfileSidebar />
                        <main className="flex-1 p-6">
                              <Tabs defaultActiveKey="1" items={items} className="bg-white rounded-lg p-4" />
                        </main>
                        <NotesSection />
                  </div>
            </div>
      );
};

export default Single_candidate;
