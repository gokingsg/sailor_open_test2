
import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-12 px-6 lg:px-24 text-center">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          Sailors Open 2026
        </p>
        <p className="text-slate-400 text-xs font-medium">
          © 2026 Sailors Open Tennis Tournament. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
