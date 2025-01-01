import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';


export function ApplicantList({ applicants }) {
      return (
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-4">
                  {applicants.map((applicant) => (
                        <motion.div
                              key={applicant.id}
                              variants={fadeInUp}
                              className="p-4 bg-gray-800 text-white rounded-lg shadow flex justify-between items-center"
                        >
                              <div>
                                    <h3 className="font-semibold">{applicant.name}</h3>
                                    <p className="text-sm text-gray-400">{applicant.position}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-sm ${applicant.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                    applicant.status === 'Interviewed' ? 'bg-blue-200 text-blue-800' :
                                          'bg-red-200 text-red-800'
                                    }`}>
                                    {applicant.status}
                              </span>
                        </motion.div>
                  ))}
            </motion.div>
      );
}
