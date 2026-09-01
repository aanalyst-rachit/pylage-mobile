import React, { useState } from 'react';
import { ComponentDemo } from '../types';
import {
  Layers,
  Sliders,
  Type,
  Compass,
  BarChart3,
  Video,
  Copy,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';

const COMPONENT_CATALOG: ComponentDemo[] = [
  // Layout
  {
    id: 'column',
    name: 'Column',
    category: 'Layout',
    description: 'Vertical flexbox layout container that arranges child components in a column.',
    pythonSnippet: `import pylage as pl\n\napp = pl.Column(\n    pl.Heading("Profile"),\n    pl.Text("User Information"),\n    style=pl.Style(gap="1rem", padding="1.5rem")\n)`,
  },
  {
    id: 'row',
    name: 'Row',
    category: 'Layout',
    description: 'Horizontal flexbox layout container for placing components side by side.',
    pythonSnippet: `import pylage as pl\n\napp = pl.Row(\n    pl.Button("Save"),\n    pl.Button("Cancel"),\n    style=pl.Style(gap="0.5rem", align_items="center")\n)`,
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'Elevated surface container with rounded corners and border styling.',
    pythonSnippet: `import pylage as pl\n\napp = pl.Card(\n    pl.Heading("Analytics Card", level=3),\n    pl.Text("Monthly revenue increased by 24%."),\n    class_name="analytics-card"\n)`,
  },
  {
    id: 'grid',
    name: 'Grid',
    category: 'Layout',
    description: 'CSS Grid container for multi-column responsive dashboard widget layouts.',
    pythonSnippet: `import pylage as pl\n\napp = pl.Grid(\n    pl.Card(pl.Text("Widget 1")),\n    pl.Card(pl.Text("Widget 2")),\n    columns=2,\n    gap="1.5rem"\n)`,
  },
  {
    id: 'app_shell',
    name: 'AppShell',
    category: 'Layout',
    description: 'Standard application skeleton with header, sidebar navigation, and content canvas.',
    pythonSnippet: `from pylage_layout.layouts import AppShell, TwoColumn\nimport pylage as pl\n\napp = AppShell(\n    header=pl.Text("PyLage System"),\n    sidebar=pl.Column(pl.Text("Home"), pl.Text("Settings")),\n    content=pl.Card(pl.Heading("Main View"))\n)`,
  },

  // Forms
  {
    id: 'button',
    name: 'Button',
    category: 'Forms',
    description: 'Interactive button with click event handlers, disabled states, and variant styling.',
    pythonSnippet: `import pylage as pl\n\ndef on_click():\n    print("Clicked!")\n\nbtn = pl.Button("Submit Data", on_click=on_click, variant="primary")`,
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Text input with automatic two-way Python State binding on keystrokes.',
    pythonSnippet: `import pylage as pl\n\nusername = pl.State("")\ninput_box = pl.Input(value=username, placeholder="Enter username...")`,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description: 'Boolean checkbox input directly synchronized to a State(bool).',
    pythonSnippet: `import pylage as pl\n\nis_active = pl.State(True)\nchk = pl.Checkbox(checked=is_active, on_change=lambda e: is_active.set(not is_active.value))`,
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'Modern iOS-style toggle switch for boolean preferences and settings.',
    pythonSnippet: `import pylage as pl\n\ndark_mode = pl.State(False)\nsw = pl.Switch(checked=dark_mode, on_change=lambda e: dark_mode.set(not dark_mode.value))`,
  },
  {
    id: 'select',
    name: 'Select & Option',
    category: 'Forms',
    description: 'Dropdown selector with child options that dispatch selection changes.',
    pythonSnippet: `import pylage as pl\n\nrole = pl.State("Admin")\nsel = pl.Select(\n    options=["Admin", "Developer", "Guest"],\n    value=role,\n    on_change=lambda payload: role.set(payload["value"])\n)`,
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Forms',
    description: 'Range slider input with numeric bounds for volume, brightness, or percentage.',
    pythonSnippet: `import pylage as pl\n\nvolume = pl.State(50)\nslider = pl.Slider(value=volume, min=0, max=100)`,
  },
  {
    id: 'datepicker',
    name: 'DatePicker',
    category: 'Forms',
    description: 'Date selection input with ISO string state synchronization.',
    pythonSnippet: `import pylage as pl\n\nstart_date = pl.State("2026-09-01")\npicker = pl.DatePicker(value=start_date)`,
  },

  // Feedback & Data
  {
    id: 'table',
    name: 'Table',
    category: 'Feedback',
    description: 'Data table supporting headers, rows, sorting, and live filtering.',
    pythonSnippet: `import pylage as pl\n\ntable = pl.Table(\n    headers=["ID", "Name", "Role"],\n    data=[["1", "Rachit", "Admin"], ["2", "Amit", "Dev"]]\n)`,
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    description: 'Contextual notification message banner with info, success, warning, or danger variants.',
    pythonSnippet: `import pylage as pl\n\nalert = pl.Alert("Deployment completed successfully!", type="success")`,
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Floating notification message attached to a reactive visibility State.',
    pythonSnippet: `import pylage as pl\n\ntoast_open = pl.State(True)\ntoast = pl.Toast("New email received", visible=toast_open)`,
  },
  {
    id: 'progress_bar',
    name: 'ProgressBar',
    category: 'Feedback',
    description: 'Clamped percentage progress bar with animated transitions.',
    pythonSnippet: `import pylage as pl\n\npct = pl.State(75)\nbar = pl.ProgressBar(value=pct, max=100)`,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Feedback',
    description: 'Lightweight CSS animated loading spinner indicator.',
    pythonSnippet: `import pylage as pl\n\nloader = pl.Spinner(size="medium", color="primary")`,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    description: 'Placeholder loading state preview preventing Cumulative Layout Shift.',
    pythonSnippet: `import pylage as pl\n\nskel = pl.Skeleton(width="100%", height="24px")`,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Feedback',
    description: 'Collapsible accordion component with single or multiple active sections.',
    pythonSnippet: `import pylage as pl\n\nactive_id = pl.State("sec1")\nacc = pl.Accordion(items=[{"id": "sec1", "title": "Overview", "content": "Details"}], active_id=active_id)`,
  },

  // Navigation
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed switcher switching visible views without reloading the page.',
    pythonSnippet: `import pylage as pl\n\ntab = pl.State("profile")\ntabs = pl.Tabs(items=["profile", "billing", "audit"], active=tab)`,
  },
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Navigation',
    description: 'Slide-out side overlay panel with backdrop overlay.',
    pythonSnippet: `import pylage as pl\n\nis_open = pl.State(False)\ndrawer = pl.Drawer(pl.Text("Sidebar Content"), open=is_open)`,
  },
  {
    id: 'dialog',
    name: 'Dialog / Modal',
    category: 'Navigation',
    description: 'Centered modal dialog window with backdrop overlay and action buttons.',
    pythonSnippet: `import pylage as pl\n\nshow_modal = pl.State(False)\nmodal = pl.Dialog(pl.Heading("Confirm Delete"), open=show_modal)`,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Page index stepper with previous, next, and numeric page jump controls.',
    pythonSnippet: `import pylage as pl\n\npage = pl.State(1)\npag = pl.Pagination(current=page, total=10, on_change=lambda p: page.set(p))`,
  },
];

export const ComponentExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['ALL', 'Layout', 'Forms', 'Feedback', 'Navigation'];

  const filtered = COMPONENT_CATALOG.filter((c) => {
    const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            PyLage Component Catalog & API Reference
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Interactive registry of 35+ components with copyable Python signatures and reactive props.
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'ALL' ? 'All Components' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search 35+ components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 shadow-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {item.name}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {item.category}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between rounded-t-xl bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                <span className="font-mono text-[11px]">Python Definition</span>
                <button
                  onClick={() => handleCopy(item.id, item.pythonSnippet)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-b-xl bg-slate-950 p-3 font-mono text-xs text-blue-300">
                {item.pythonSnippet}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
