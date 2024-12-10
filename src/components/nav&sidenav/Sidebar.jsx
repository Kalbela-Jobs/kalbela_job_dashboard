import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { darkModeTransition } from '../../utils/animations';

const menuItems = [
      { icon: "🏠", label: "Dashboard", id: "dashboard" },
      { icon: "💼", label: "Jobs", id: "jobs" },
      { icon: "👥", label: "Candidates", id: "candidates" },
      { icon: "💬", label: "Messages", id: "messages" },
      { icon: "⚙️", label: "Settings", id: "settings" },
      { icon: "📚", label: "Evaluation", id: "evaluation" },
];

export function Sidebar({ activeItem }) {
      return (
            <motion.div
                  initial={{ x: -250 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col"
            >
                  <motion.div {...darkModeTransition} className="flex items-center gap-2 mb-8 text-xl font-bold">
                        <span className="text-2xl">⚡</span>
                        easy.jobs
                  </motion.div>

                  {menuItems.map(item => (
                        <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${activeItem === item.id ? 'bg-blue-700' : 'hover:bg-gray-800'
                                    }`}
                        >
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                        </motion.div>
                  ))}

                  <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 p-3 mt-auto cursor-pointer hover:bg-gray-800"
                  >
                        <LogOut size={20} />
                        <span>Logout</span>
                  </motion.div>
            </motion.div>
      );
}
