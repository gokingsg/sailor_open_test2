import React from 'react';
import { motion } from 'framer-motion';
import { EmptyState } from './EmptyState';

export const TestEmptyStateSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-slate-50 px-6 py-20">
      {/* Fixed Framer Motion type error by casting props to any */}
      <motion.div 
        {...({
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 }
        } as any)}
        className="max-w-md w-full bg-white/50 p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        <EmptyState 
          message="No Data Available" 
          description="This view is currently empty. There are no records to display at this moment." 
        />
      </motion.div>
    </section>
  );
};