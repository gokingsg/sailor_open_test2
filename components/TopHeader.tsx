import React from 'react';
import { UserProfile } from './UserProfile';
import { AppView } from '../types';

interface TopHeaderProps {
  onNavigate: (view: AppView) => void;
}

export const TopHeader = ({ onNavigate }: TopHeaderProps) => {
  return (
    <header className="hidden lg:flex w-full h-20 bg-white items-center justify-end px-10 z-[80] sticky top-0">
      <UserProfile onNavigate={onNavigate} />
    </header>
  );
};
