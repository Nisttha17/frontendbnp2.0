import React from 'react';
import {
  Home,
  FileText,
  LayoutGrid,
  History,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'requests', label: 'Change Requests', icon: FileText },
    { id: 'matrix', label: 'Impact Matrix', icon: LayoutGrid },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <aside className="w-64 min-h-screen h-full bg-[#0B1739] text-white flex flex-col justify-between shrink-0 relative overflow-hidden select-none border-r border-[#15234E]">
      {/* Top Header & Navigation */}
      <div className="p-6 relative z-10">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-2">
          {/* Shield with Checkmark Icon matching img1 UI */}
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-blue-400"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider text-white">IMPART</span>
        </div>

        <p className="text-[12px] leading-tight text-[#8FA6CE] mb-8 font-normal">
          Regulatory Intelligence<br />Platform
        </p>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#183B7E] text-white shadow-sm font-semibold'
                    : 'text-[#8FA6CE] hover:text-white hover:bg-white/5 font-normal'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#8FA6CE]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Decorative Wave Lines in Background (Lower section matching img1 UI) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-40 h-72 overflow-hidden">
        <svg
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover text-blue-500"
        >
          <path
            d="M-40,160 C30,110 110,220 200,150 C260,110 290,180 340,140"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <path
            d="M-30,175 C40,125 120,235 210,165 C270,125 300,195 350,155"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <path
            d="M-20,190 C50,140 130,250 220,180 C280,140 310,210 360,170"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <path
            d="M-10,205 C60,155 140,265 230,195 C290,155 320,225 370,185"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <path
            d="M0,220 C70,170 150,280 240,210 C300,170 330,240 380,200"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <path
            d="M10,235 C80,185 160,295 250,225 C310,185 340,255 390,215"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        </svg>
      </div>
    </aside>
  );
};
