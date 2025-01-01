import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

export function StatCard({ icon, count, label, color }) {
      return (
            <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-4 bg-card text-card-foreground rounded-lg shadow"
            >
                  <div className={`p-3 rounded-lg ${color}`}>
                        {icon}
                  </div>
                  <div>
                        <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="text-2xl font-bold"
                        >
                              {count}
                        </motion.div>
                        <div className="text-muted-foreground">{label}</div>
                  </div>
            </motion.div>
      );
}
