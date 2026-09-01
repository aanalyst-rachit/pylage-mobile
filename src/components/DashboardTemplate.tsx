import React from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Zap,
} from 'lucide-react';

export const DashboardTemplate: React.FC = () => {
  const stats = [
    { label: 'Total Active Users', value: '48,294', change: '+14.2%', isPositive: true, icon: Users },
    { label: 'Monthly Recurring Revenue', value: '$124,500', change: '+23.8%', isPositive: true, icon: DollarSign },
    { label: 'WebSocket Event Throughput', value: '1.4M / hr', change: '+8.1%', isPositive: true, icon: Activity },
    { label: 'Server Memory Overhead', value: '124 MB', change: '-4.3%', isPositive: true, icon: Server },
  ];

  const recentTransactions = [
    { id: 'TX-9401', user: 'TechCorp LLC', amount: '$2,400', date: 'Oct 14, 2026', status: 'Completed' },
    { id: 'TX-9402', user: 'Apex Solutions', amount: '$4,800', date: 'Oct 14, 2026', status: 'Completed' },
    { id: 'TX-9403', user: 'Vanguard Systems', amount: '$1,200', date: 'Oct 13, 2026', status: 'Pending' },
    { id: 'TX-9404', user: 'Starlight Media', amount: '$3,600', date: 'Oct 13, 2026', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            PyLage Dashboard Template
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rendered from <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">pylage_layout.templates.dashboard</code> using <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">AppShell</code> & <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">StatsSection</code>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset dark:bg-emerald-950/50 dark:text-emerald-300">
            <Zap className="h-3 w-3 fill-current" /> Live Sync Active
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </span>
                <span
                  className={`flex items-center text-xs font-bold ${
                    stat.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts / Metrics Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Real-time WebSocket Events & Patch Volume
            </h3>
            <span className="text-xs text-slate-400">Past 24 Hours</span>
          </div>

          <div className="mt-6 flex h-48 items-end gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40">
            {[45, 60, 75, 50, 85, 95, 70, 80, 65, 90, 100, 85].map((val, idx) => (
              <div key={idx} className="group relative flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t-md bg-blue-500 transition-all duration-300 group-hover:bg-blue-600 dark:bg-blue-600 dark:group-hover:bg-blue-500"
                  style={{ height: `${val}%` }}
                />
                <span className="mt-2 text-[10px] font-mono text-slate-400">
                  {idx * 2}h
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick System Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Reactive Engine Health
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Diff Engine Latency</span>
                <span className="text-emerald-600 font-mono">0.42 ms</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[15%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Scheduler Coalescing Ratio</span>
                <span className="text-blue-600 font-mono">98.4%</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[98%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Component Registry Cache</span>
                <span className="text-indigo-600 font-mono">35 items loaded</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[100%] rounded-full bg-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Layout Subscriptions
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-2.5">Invoice ID</th>
                <th className="px-4 py-2.5">Organization</th>
                <th className="px-4 py-2.5">Plan Amount</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{tx.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{tx.user}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{tx.amount}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{tx.date}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
