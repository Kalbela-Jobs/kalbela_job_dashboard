import { Select } from 'antd'

export default function NotesSection() {
      return (
            <div className="w-80 bg-white p-6 border-l">
                  <div className="mb-4">
                        <h3 className="text-lg font-medium mb-1">Notes</h3>
                        <p className="text-sm text-gray-500">(Notes for team members only)</p>
                  </div>

                  <textarea
                        className="w-full border rounded-lg p-3 min-h-[200px] mb-4"
                        placeholder="Add a note here"
                  />

                  <Select
                        className="w-full mb-4"
                        placeholder="Tag a manager"
                        options={[
                              { value: 'manager1', label: 'Manager 1' },
                              { value: 'manager2', label: 'Manager 2' },
                        ]}
                  />

                  <div className="flex gap-2">
                        <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-md">
                              Cancel
                        </button>
                        <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-md">
                              Save
                        </button>
                  </div>
            </div>
      )
}
