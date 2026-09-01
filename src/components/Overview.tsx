import React from 'react';
import {
  Zap,
  Layers,
  Code2,
  Terminal,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  Sliders,
  BarChart3,
  Compass,
} from 'lucide-react';
import { ViewMode } from '../types';

interface OverviewProps {
  onSelectView: (view: ViewMode) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onSelectView }) => {
  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-8 text-white shadow-md sm:p-10 dark:border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
            <Zap className="h-3.5 w-3.5 fill-current" /> Pure Python UI & Reactive State
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            PyLage UI Framework
          </h1>
          <p className="mt-3 text-sm text-blue-100 sm:text-base leading-relaxed">
            Build reactive, WebSocket-synced web dashboards in pure Python. No JavaScript, no build step, no bundler needed.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectView('forms')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-blue-50"
            >
              <Sliders className="h-4 w-4 text-blue-600" />
              Try Form Controls Demo
            </button>
            <button
              onClick={() => onSelectView('dashboard')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
            >
              <LayoutDashboard className="h-4 w-4" />
              View Dashboard Template
            </button>
          </div>
        </div>
      </div>

      {/* 10-Line Reactive Counter Showcase */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Canonical 10-Line Reactive Python Counter
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">app.py</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-slate-950 p-4 font-mono text-xs text-blue-200">
            <pre className="overflow-x-auto leading-relaxed">
{`import pylage as pl

count = pl.State(0)

def increment():
    count.set(count.value + 1)  # triggers automatic WebSocket patch

app = pl.Column(
    pl.Heading(count),          # bound to State — re-renders on change
    pl.Button("Increment", on_click=increment),
)

pl.run(app, title="Reactive Counter", serve=True)`}
            </pre>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-6 text-center dark:border-slate-800 dark:bg-slate-800/40">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rendered Browser Result
            </h4>
            <div className="my-4">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                0
              </span>
            </div>
            <div>
              <button
                onClick={() => onSelectView('forms')}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
              >
                Increment Counter
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Only the Heading element is updated over the wire — never the entire DOM tree.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          onClick={() => onSelectView('forms')}
          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition dark:bg-blue-950 dark:text-blue-400">
            <Sliders className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Form Controls & Inputs
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Checkbox, Slider, DatePicker, Select, and full form submissions with live Python State tracking.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Open Test Suite <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div
          onClick={() => onSelectView('data-feedback')}
          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition dark:bg-emerald-950 dark:text-emerald-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Data Table & Feedback
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Searchable data tables, alerts, toasts, animated progress bars, spinners, and accordions.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Open Test Suite <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div
          onClick={() => onSelectView('navigation')}
          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition dark:bg-purple-950 dark:text-purple-400">
            <Compass className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Navigation & Modals
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Reactive tabs, pagination steppers, slide-out drawer panels, popovers, and dialogs.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
            Open Test Suite <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
