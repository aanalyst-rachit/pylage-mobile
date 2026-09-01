import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Loader2,
  Layers,
} from 'lucide-react';
import { TableRowData } from '../types';

const INITIAL_TABLE_DATA: TableRowData[] = [
  { id: '1', name: 'Rachit Kanaujia', role: 'Software Engineer', department: 'Core Engine', status: 'Active', lastActive: 'Just now' },
  { id: '2', name: 'Amit Sharma', role: 'Data Analyst', department: 'Analytics', status: 'Pending', lastActive: '2h ago' },
  { id: '3', name: 'Priya Verma', role: 'UI/UX Designer', department: 'Product Design', status: 'Active', lastActive: '5m ago' },
  { id: '4', name: 'Rahul Gupta', role: 'DevOps Engineer', department: 'Infrastructure', status: 'Inactive', lastActive: '3d ago' },
  { id: '5', name: 'Sneha Patel', role: 'Frontend Lead', department: 'Web App', status: 'Active', lastActive: '12m ago' },
  { id: '6', name: 'Vikram Mehta', role: 'Backend Engineer', department: 'Core Engine', status: 'Active', lastActive: '1h ago' },
];

export const DataFeedbackDemo: React.FC = () => {
  // Table State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof TableRowData>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Progress Bar & Toast State
  const [progress, setProgress] = useState(45);
  const [toastVisible, setToastVisible] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('sec1');
  const [carouselIdx, setCarouselIdx] = useState(0);

  const carouselSlides = [
    { title: 'Slide 1: Welcome to PyLage Showcase', desc: 'Real-time WebSocket synchronized component tree with zero template files.' },
    { title: 'Slide 2: Granular Diff & Patch Protocol', desc: 'Only modified attributes or textContent strings are shipped over the wire.' },
    { title: 'Slide 3: Dual Community & Enterprise Architecture', desc: 'Built for high performance analytics dashboards and reactive interfaces.' },
  ];

  // Table filtering and sorting
  const filteredData = INITIAL_TABLE_DATA.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.name.toLowerCase().includes(q) ||
      row.role.toLowerCase().includes(q) ||
      row.department.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof TableRowData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Data & Feedback Components Suite
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Replicating Table, Alert, Toast, Progress, Skeleton, Accordion & Carousel from <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">app/data_feedback_manual.py</code>.
        </p>
      </div>

      {/* 1. Badge & Alert Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          1. Badges & Alert System
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset dark:bg-emerald-950/50 dark:text-emerald-300">
            Active Status (Success)
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20 ring-inset dark:bg-amber-950/50 dark:text-amber-300">
            Warning Pending
          </span>
          <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20 ring-inset dark:bg-rose-950/50 dark:text-rose-300">
            Error (Danger)
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20 ring-inset dark:bg-blue-950/50 dark:text-blue-300">
            Informational Badge
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
            <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="text-sm">
              <span className="font-semibold">Info Alert:</span> System maintenance scheduled for tonight at 02:00 UTC.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="text-sm">
              <span className="font-semibold">Success Alert:</span> Operation completed successfully! All 35 components mounted.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Data Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              2. Reactive Table Component
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive search query filtering and sorting with live state binding.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-sm text-slate-900 shadow-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">ID <ArrowUpDown className="h-3.5 w-3.5" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3.5 w-3.5" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('role')}>
                  <div className="flex items-center gap-1">Role <ArrowUpDown className="h-3.5 w-3.5" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('department')}>
                  <div className="flex items-center gap-1">Department <ArrowUpDown className="h-3.5 w-3.5" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Status <ArrowUpDown className="h-3.5 w-3.5" /></div>
                </th>
                <th className="px-4 py-3">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.role}</td>
                    <td className="px-4 py-3">{row.department}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          row.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : row.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">{row.lastActive}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Toast, Progress & Loading States */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              3. Toast Notification Component
            </h3>
            <button
              onClick={() => setToastVisible(!toastVisible)}
              className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
            >
              Toggle Toast ({toastVisible ? 'Visible' : 'Hidden'})
            </button>
          </div>

          {toastVisible && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/80 p-4 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/40">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                <div>
                  <div className="text-sm font-semibold text-indigo-950 dark:text-indigo-200">
                    PyLage Live Notification
                  </div>
                  <div className="text-xs text-indigo-700 dark:text-indigo-300">
                    WebSocket diff dispatched: 4 nodes patched in 1.2ms.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setToastVisible(false)}
                className="text-xs font-bold text-indigo-700 hover:underline dark:text-indigo-300"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                4. Progress Bar & Spinner
              </h4>
              <span className="text-xs font-mono font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setProgress((prev) => Math.min(100, prev + 15))}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                +15% Progress
              </button>
              <button
                onClick={() => setProgress(0)}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Reset
              </button>
              <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Active Spinner</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Skeleton, Accordion & Carousel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            5. Accordion & Carousel Components
          </h3>

          {/* Accordion */}
          <div className="mt-4 space-y-2">
            {[
              { id: 'sec1', title: 'Section 1: Architecture & Diff Engine', content: 'PyLage uses per-prop dependency graphs rather than full tree re-renders.' },
              { id: 'sec2', title: 'Section 2: Layout System (pylage_layout)', content: 'Ships with AppShell, Container, Stack, Split, TwoColumn, and ready-to-use page templates.' },
              { id: 'sec3', title: 'Section 3: Typed Immutable Styling', content: 'Frozen dataclass Style objects with explicit compile-time CSS field contracts.' },
            ].map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between p-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                      activeAccordion === item.id ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>
                {activeAccordion === item.id && (
                  <div className="border-t border-slate-100 p-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Carousel */}
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Carousel Slide {carouselIdx + 1} of {carouselSlides.length}
              </div>
              <h4 className="mt-1 text-sm font-bold">{carouselSlides[carouselIdx].title}</h4>
              <p className="mt-1 text-xs text-slate-300">{carouselSlides[carouselIdx].desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {carouselSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === carouselIdx ? 'w-5 bg-blue-500' : 'w-1.5 bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCarouselIdx((prev) => (prev > 0 ? prev - 1 : carouselSlides.length - 1))}
                    className="rounded-lg bg-slate-700/80 p-1.5 text-white hover:bg-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCarouselIdx((prev) => (prev < carouselSlides.length - 1 ? prev + 1 : 0))}
                    className="rounded-lg bg-slate-700/80 p-1.5 text-white hover:bg-slate-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
