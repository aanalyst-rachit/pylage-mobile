import React from 'react';
import { Terminal, Layers, Sparkles, BookOpen, Code2, Zap } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  showCodePanel: boolean;
  onToggleCodePanel: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  showCodePanel,
  onToggleCodePanel,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            id="pylage-logo-badge"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20"
          >
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                PyLage UI
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reactive Python UI & Layout Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nav-quick-architecture"
            onClick={() => onSelectView('architecture')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'architecture'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span className="hidden md:inline">Reactive Pipeline</span>
          </button>

          <button
            id="nav-toggle-code"
            onClick={onToggleCodePanel}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-xs transition-colors ${
              showCodePanel
                ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
            title="Toggle Python Code Inspector"
          >
            <Code2 className="h-4 w-4" />
            <span className="hidden sm:inline">Python Source</span>
          </button>

          <button
            id="nav-toggle-theme"
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title="Toggle Theme"
          >
            {darkMode ? (
              <Sparkles className="h-4 w-4 text-amber-400" />
            ) : (
              <Sparkles className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
