import React from 'react';
import { UserProfile } from './UserProfile';

interface TopHeaderProps {
  onNavigate: (view: 'home' | 'history' | 'leaderboard' | 'registration' | 'test') => void;
}

export const TopHeader = ({ onNavigate }: TopHeaderProps) => {
  return (
    <header className="hidden lg:flex w-full h-20 bg-white items-center justify-end px-10 z-[80] sticky top-0">
      <UserProfile onNavigate={onNavigate} />
    </header>
  );
};