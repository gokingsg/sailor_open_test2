import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export const EmptyState = ({ 
  message = "No records found", 
  description = "There is currently no data to display."
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center w-full">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Inbox size={40} className="text-slate-300" />
      </div>
      <h3 className="text-xl font-black text-[#000080] mb-2">{message}</h3>
      <p className="text-slate-400 font-medium text-sm max-w-sm leading-relaxed">{description}</p>
    </div>
  );
};