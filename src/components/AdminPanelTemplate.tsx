import React, { useState } from 'react';
import {
  Users,
  Shield,
  Key,
  Filter,
  MoreVertical,
  Plus,
  CheckCircle,
  Clock,
  Ban,
  Download,
} from 'lucide-react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'Admin' | 'Developer' | 'Viewer';
  status: 'Active' | 'Invited' | 'Suspended';
  twoFactor: boolean;
}

export const AdminPanelTemplate: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'usr-1', name: 'Rachit Kanaujia', email: 'rachit@pylage.dev', role: 'SuperAdmin', status: 'Active', twoFactor: true },
    { id: 'usr-2', name: 'Sarah Jenkins', email: 'sarah@pylage.dev', role: 'Admin', status: 'Active', twoFactor: true },
    { id: 'usr-3', name: 'Michael Chen', email: 'chen@corp.com', role: 'Developer', status: 'Invited', twoFactor: false },
    { id: 'usr-4', name: 'Elena Rostova', email: 'elena@enterprise.io', role: 'Viewer', status: 'Suspended', twoFactor: false },
  ]);

  const [filterRole, setFilterRole] = useState('ALL');

  const filteredUsers = users.filter((u) => {
    if (filterRole === 'ALL') return true;
    return u.role === filterRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Admin Panel Template
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rendered from <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">pylage_layout.templates.admin_panel</code> with Role-Based Access Control (RBAC).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Download className="h-3.5 w-3.5" /> Export Audit Log
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700">
            <Plus className="h-3.5 w-3.5" /> Invite Member
          </button>
        </div>
      </div>

      {/* RBAC Overview Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500">Total SuperAdmins</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">2 Assigned</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500">2FA Enforcement</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">100% Mandated</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500">Active Workspaces</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">8 Clusters</div>
            </div>
          </div>
        </div>
      </div>

      {/* User Table with Filtering */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Workspace Members & Role Permissions
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-xs focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Roles</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Assigned Role</th>
                <th className="px-4 py-3">Account Status</th>
                <th className="px-4 py-3">2FA Protected</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        u.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : u.status === 'Invited'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {u.status === 'Active' && <CheckCircle className="h-3 w-3" />}
                      {u.status === 'Invited' && <Clock className="h-3 w-3" />}
                      {u.status === 'Suspended' && <Ban className="h-3 w-3" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {u.twoFactor ? (
                      <span className="text-emerald-600 font-medium">Enabled (TOTP)</span>
                    ) : (
                      <span className="text-slate-400">Disabled</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
                      <MoreVertical className="h-4 w-4" />
                    </button>
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
