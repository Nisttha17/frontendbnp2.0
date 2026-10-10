import React from 'react';
import { Plus, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onRunAssessment: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Welcome back, Analyst!',
  subtitle = 'Track and analyse regulatory impact for proposed changes.',
  onRunAssessment,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 pt-1">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1739] tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-normal">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Run Assessment Button (Rounded pill matching img1 UI) */}
        <button
          onClick={onRunAssessment}
          className="bg-[#0B1E4A] hover:bg-[#14285E] text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Run Assessment</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* User Avatar Initials matching img1 UI */}
        <div
          title="Analyst: N. Mishra"
          className="w-8 h-8 rounded-full bg-[#9DB4E8] text-[#0B1E4A] font-bold text-xs flex items-center justify-center border border-blue-200 shadow-2xs cursor-pointer select-none"
        >
          NM
        </div>
      </div>
    </header>
  );
};
