import React, { useState } from 'react';
import {
  FolderTree,
  Sliders,
  PanelLeftClose,
  HelpCircle,
  Maximize2,
  X,
  ExternalLink,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const NavigationDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Navigation & Interactive Overlays Suite
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Interactive demonstration of Tabs, Breadcrumbs, Pagination, Drawer, Popover & Dialog from <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">app/nav_interaction_manual.py</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Breadcrumbs & Tabs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1. Breadcrumbs & Reactive Tabs
          </h3>

          {/* Breadcrumbs */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-medium text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
            <span className="hover:text-blue-600 cursor-pointer">PyLage Home</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-blue-600 dark:text-blue-400">Settings & Security</span>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              {(['tab1', 'tab2', 'tab3'] as const).map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tab === 'tab1' ? 'Analytics Tab' : tab === 'tab2' ? 'Security & RBAC' : 'Logs & Telemetry'}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
              {activeTab === 'tab1' && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Active Tab Payload: tab1</span>
                  <p className="mt-1">Real-time throughput: 1,420 events/sec. Average diff batch size: 0.8KB.</p>
                </div>
              )}
              {activeTab === 'tab2' && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Active Tab Payload: tab2</span>
                  <p className="mt-1">Role-based access rules: Admin, Operator, and Auditor roles verified.</p>
                </div>
              )}
              {activeTab === 'tab3' && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Active Tab Payload: tab3</span>
                  <p className="mt-1">WebSocket connection telemetry: Latency &lt; 15ms. Zero packet drops.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Pagination & Menu */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            2. Pagination & Navigation Menu
          </h3>

          {/* Menu */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['Overview', 'Deployments', 'Security', 'Webhooks', 'API Keys'].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedMenuItem(item)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedMenuItem === item
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Selected Menu Item: <strong className="text-blue-600 dark:text-blue-400">{selectedMenuItem}</strong>
          </p>

          {/* Pagination */}
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of 12
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-7 w-7 rounded-lg text-xs font-semibold ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage >= 12}
                  onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Drawer & Popover Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            3. Drawer & Tooltip / Popover
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <PanelLeftClose className="h-4 w-4" />
              Open Drawer Overlay
            </button>

            <div className="relative">
              <button
                onClick={() => setPopoverOpen(!popoverOpen)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <HelpCircle className="h-4 w-4 text-blue-600" />
                Toggle Popover
              </button>

              {popoverOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white text-xs">
                    <span>Popover Details</span>
                    <button onClick={() => setPopoverOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    PyLage Popover components render detached portaled content with click-outside handlers.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Dialog / Modal Component */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            4. Modal / Dialog Component
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Native dialog modal lifecycle manager with backdrop blur and escape key listeners.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
            >
              <Maximize2 className="h-4 w-4" />
              Launch Modal Dialog
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                PyLage Drawer Component
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex-1 space-y-4 text-xs text-slate-600 dark:text-slate-400">
              <p>This drawer was mounted dynamically with synchronized Python state.</p>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Drawer Props:</span>
                <pre className="mt-1 font-mono text-[11px] text-blue-600">drawer_open.set(True)</pre>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}

      {/* Dialog Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setDialogOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                PyLage Interactive Dialog Modal
              </h3>
              <button
                onClick={() => setDialogOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Dialog state is bound to <code className="text-blue-600 font-mono">dialog_open</code>. Triggering <code className="text-blue-600 font-mono">dialog_open.set(False)</code> will close the modal cleanly.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setDialogOpen(false)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
