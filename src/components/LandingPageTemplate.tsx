import React from 'react';
import {
  Zap,
  Cpu,
  Layers,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Code2,
} from 'lucide-react';

export const LandingPageTemplate: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 sm:p-12 text-center shadow-xs dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
          <Sparkles className="h-3.5 w-3.5" /> PyLage UI v1.0 Released
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Build Reactive, WebSocket-Synced Dashboards in Pure Python.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
          No JavaScript, no build step, no bundler. Real component trees, reactive state, and sub-millisecond diff/patch over WebSockets.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700">
            Get Started with PyLage
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-xs text-slate-800 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Terminal className="h-4 w-4 text-slate-400" />
            <span>pip install pylage-ui</span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Reactive State Engine
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Wrap any Python variable in <code className="text-blue-600 font-mono">State(value)</code>. Calling <code className="text-blue-600 font-mono">.set()</code> automatically diffs and patches only the changed DOM attributes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Batteries-Included Layouts
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Full layout primitives from <code className="text-emerald-600 font-mono">pylage_layout</code>: AppShell, Container, Stack, Split, TwoColumn, SidebarLayout, and complete page templates.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Zero Client JavaScript Authored
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Embedded microscopic runtime handles the binary/JSON wire protocol. You write 100% clean, idiomatic Python code.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dual Community & Enterprise Licensing
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            AGPL v3 for community open-source, Commercial License for enterprise deployments.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Community */}
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Community Edition
            </span>
            <div className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">$0</div>
            <p className="text-xs text-slate-500">Free forever under GNU AGPL v3</p>
            <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Full 35+ Component Registry</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Reactive State & Diff Engine</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Static HTML Export (<code className="font-mono">pl.run(serve=False)</code>)</li>
            </ul>
          </div>

          {/* Commercial */}
          <div className="relative rounded-2xl border-2 border-blue-600 bg-blue-50/20 p-6 dark:border-blue-500 dark:bg-blue-950/20">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              Enterprise Commercial
            </span>
            <div className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">Custom / SaaS</div>
            <p className="text-xs text-slate-500">Closed-source & commercial distribution</p>
            <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Proprietary SaaS exemption from AGPL</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Dedicated 24/7 SLA & Core Engineer Support</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Enterprise Clustering & WebSocket scaling</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
