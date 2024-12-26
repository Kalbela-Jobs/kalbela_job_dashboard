import { LockOutlined } from '@ant-design/icons'

export default function ConversationTimeline() {
      const timelineItems = [
            {
                  date: '14 Dec, 2024',
                  text: 'Applied on 14 Dec, 2024',
                  type: 'applied'
            },
            {
                  date: '16 Dec, 2024',
                  text: 'Conversations started on 16 Dec, 2024',
                  type: 'conversation'
            },
            {
                  date: '16 Dec, 2024',
                  text: 'Pipeline changed to Shortlist on 16 Dec, 2024',
                  type: 'pipeline'
            },
            {
                  date: '16 Dec, 2024',
                  text: 'Pipeline changed to Applied on 16 Dec, 2024',
                  type: 'pipeline'
            }
      ]

      return (
            <div className="p-4">
                  <div className="space-y-3">
                        {timelineItems.map((item, index) => (
                              <div
                                    key={index}
                                    className={`p-3 rounded-lg flex items-center justify-between ${item.type === 'applied' ? 'bg-blue-50' :
                                          item.type === 'conversation' ? 'bg-yellow-50' :
                                                'bg-cyan-50'
                                          }`}
                              >
                                    <span>{item.text}</span>
                                    <div className="flex items-center gap-2">
                                          <span className="text-sm text-gray-500">{item.date}</span>
                                          <LockOutlined className="text-gray-400" />
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div className="mt-4">
                        <textarea
                              className="w-full border rounded-lg p-3 min-h-[100px]"
                              placeholder="Hello"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                              <button className="p-2 rounded hover:bg-gray-100">
                                    😊
                              </button>
                              <button className="p-2 rounded hover:bg-gray-100">
                                    📎
                              </button>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                    Send
                              </button>
                        </div>
                  </div>
            </div>
      )
}
