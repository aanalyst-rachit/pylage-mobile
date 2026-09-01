import React from 'react';
import {
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Globe,
  GitBranch,
  Terminal,
  Activity,
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Python State.set(new_value)',
      desc: 'User triggers an event or python function mutates a State. Only fires subscribers if new_value != old_value.',
      badge: 'State Mutation',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      step: '2',
      title: 'Dependency Graph Lookup',
      desc: 'StateBinding queries the DependencyGraph to identify every (Component, prop_name) bound to this state.',
      badge: 'Graph Engine',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      step: '3',
      title: 'Scheduler & DirtyQueue Coalescing',
      desc: 'Multiple mutations within the same tick are coalesced into ONE microtask batch. Prevents DOM thrashing.',
      badge: 'Batching',
      color: 'from-purple-600 to-pink-600',
    },
    {
      step: '4',
      title: 'WebSocket UpdateMessage Broadcast',
      desc: 'Generates JSON wire payload with registry metadata (kind=attribute/text, html_name) and broadcasts to tabs.',
      badge: 'Wire Protocol',
      color: 'from-pink-600 to-rose-600',
    },
    {
      step: '5',
      title: 'Client Runtime DOM Patch',
      desc: 'Embedded client script locates DOM node by data-pylage-id and surgically patches only the changed attribute.',
      badge: 'Sub-ms DOM Patch',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          PyLage Reactive Engine & Diff/Patch Pipeline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          How PyLage achieves sub-millisecond DOM synchronization without re-rendering ancestor components.
        </p>
      </div>

      {/* Step by Step Flow */}
      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div
            key={s.step}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-lg font-bold text-white shadow-sm`}
            >
              {s.step}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {s.badge}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Structural Tree Operations */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Structural Tree Operations vs Full Re-renders
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          PyLage supports targeted DOM node additions, replacements, moves, and deletions without full-page reloads.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">tree_add</span>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Appends or inserts child component trees directly into parent DOM container.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">tree_replace</span>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Swaps out an existing subtree in place with zero ancestor invalidation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">tree_move</span>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Transfers DOM nodes between parents while preserving internal input focus and state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
