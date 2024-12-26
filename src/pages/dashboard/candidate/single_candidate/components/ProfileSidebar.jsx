import { Avatar, Rate } from 'antd'
import { LinkedinFilled, FacebookFilled } from '@ant-design/icons'

export default function ProfileSidebar() {
      return (
            <div className="w-80 bg-white p-6 border-r">
                  <div className="text-center mb-6">
                        <Avatar size={80} src="/placeholder.svg" />
                        <h2 className="text-xl font-semibold mt-2">Mahadi Hasan</h2>
                        <p className="text-gray-500 text-sm">test</p>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 w-full">
                              Applied
                        </button>
                  </div>

                  <div className="space-y-4">
                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">First name</label>
                              <p className="font-medium">Mahadi</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Last name</label>
                              <p className="font-medium">Hasan</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Email Address</label>
                              <p className="font-medium">codewithmahadihasan@gmail.com</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Phone Number</label>
                              <p className="font-medium">+880179220520</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Date of Application</label>
                              <p className="font-medium">14 Dec, 2024 05:56PM</p>
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Rate</label>
                              <Rate defaultValue={0} />
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm text-gray-500">Social Profiles</label>
                              <div className="flex gap-2">
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                          <LinkedinFilled className="text-xl" />
                                    </a>
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                          <FacebookFilled className="text-xl" />
                                    </a>
                              </div>
                        </div>

                        <button className="w-full bg-blue-50 text-blue-600 rounded-md py-2 mt-4">
                              Email Mahadi Hasan
                        </button>
                  </div>
            </div>
      )
}
