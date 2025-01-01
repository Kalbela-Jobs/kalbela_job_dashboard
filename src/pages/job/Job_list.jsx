import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';


export function JobList({ jobs }) {
      return (
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-4">
                  {jobs.map((job) => (
                        <motion.div
                              key={job.id}
                              variants={fadeInUp}
                              className="p-4 bg-gray-800 text-white rounded-lg shadow"
                        >
                              <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-sm ${job.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                                          }`}>
                                          {job.status}
                                    </span>
                              </div>
                              <div className="mt-2 flex justify-between text-sm text-gray-400">
                                    <span>Applicants: {job.applicants}</span>
                                    <span>Deadline: {job.deadline}</span>
                              </div>
                        </motion.div>
                  ))}
            </motion.div>
      );
}
