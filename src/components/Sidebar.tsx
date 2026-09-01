import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Globe,
  Sliders,
  BarChart3,
  Compass,
  Component as ComponentIcon,
  Cpu,
  Home,
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const sections = [
    {
      title: 'Overview',
      items: [
        { id: 'overview', label: 'Framework Overview', icon: Home },
        { id: 'architecture', label: 'Reactive Engine & Protocol', icon: Cpu },
        { id: 'explorer', label: '35+ Component Catalog', icon: ComponentIcon },
      ],
    },
    {
      title: 'Interactive Test Suites',
      items: [
        { id: 'forms', label: 'Form Controls & Inputs', icon: Sliders },
        { id: 'data-feedback', label: 'Data & Feedback (Table, Toast...)', icon: BarChart3 },
        { id: 'navigation', label: 'Navigation & Modals', icon: Compass },
      ],
    },
    {
      title: 'Layout Templates',
      items: [
        { id: 'dashboard', label: 'Dashboard AppShell', icon: LayoutDashboard },
        { id: 'admin', label: 'Admin Panel Template', icon: ShieldAlert },
        { id: 'landing', label: 'Landing Page Template', icon: Globe },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </h3>
              <nav className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-item-${item.id}`}
                      onClick={() => onSelectView(item.id as ViewMode)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 shadow-xs dark:bg-blue-950/60 dark:text-blue-300'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              WebSocket Protocol Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Bidirectional State synchronization via JSON diff patches.
          </p>
        </div>
      </div>
    </aside>
  );
};
