import React from 'react';
import { UserProfile } from './UserProfile';

interface TopHeaderProps {
  onNavigate: (view: 'home' | 'history' | 'leaderboard' | 'registration' | 'test') => void;
}

export const TopHeader = ({ onNavigate }: TopHeaderProps) => {
  return (
    <header className="w-full h-16 lg:h-20 bg-white flex items-center justify-end px-6 lg:px-10 z-[80] fixed top-0 right-0 lg:static">
      <UserProfile onNavigate={onNavigate} />
    </header>
  );
};