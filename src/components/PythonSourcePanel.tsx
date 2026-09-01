import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode, X } from 'lucide-react';
import { ViewMode } from '../types';

interface PythonSourcePanelProps {
  currentView: ViewMode;
  onClose: () => void;
}

const VIEW_PYTHON_FILES: Record<ViewMode, { filename: string; code: string }> = {
  overview: {
    filename: 'app/counter_reactive.py',
    code: `import pylage as pl

count = pl.State(0)

def increment():
    count.set(count.value + 1)   # Triggers automatic WebSocket diff & patch

app = pl.Column(
    pl.Heading("PyLage Reactive Counter", level=1),
    pl.Text("Count value is synchronized via State binding:"),
    pl.Heading(count, level=2),
    pl.Button("Increment Counter", on_click=increment),
    style=pl.Style(padding="2rem", gap="1rem", align_items="center")
)

pl.run(app, title="PyLage Counter", serve=True, host="0.0.0.0", port=3000)`,
  },
  forms: {
    filename: 'app/form_manual.py',
    code: `import pylage as pl
from pylage import Style

# 1. State Management
is_subscribed = pl.State(True)
volume_level = pl.State(50)
selected_date = pl.State("2026-09-01")

def handle_check(val=None):
    is_subscribed.set(not is_subscribed.value)

def handle_slider(val=None):
    volume_level.set(int(val.get("value", 50)))

# 2. Form Assembly
app = pl.Column(
    pl.Heading("Form Controls Suite", level=2),
    pl.Checkbox(checked=is_subscribed, on_change=handle_check),
    pl.Slider(value=volume_level, min=0, max=100, on_change=handle_slider),
    pl.DatePicker(value=selected_date),
    pl.Button("Submit Form", on_click=lambda e: print("Dispatched to Python backend")),
    style=Style(padding="2rem", gap="1.5rem")
)

pl.run(app, serve=True)`,
  },
  'data-feedback': {
    filename: 'app/data_feedback_manual.py',
    code: `import pylage as pl
from pylage import Style, Table, Alert, Badge, Toast, ProgressBar

progress = pl.State(45)
toast_visible = pl.State(True)

app = pl.Column(
    pl.Heading("Data & Feedback Components", level=1),
    pl.Row(
        Badge("Active Status", variant="success"),
        Badge("Warning", variant="warning"),
        Badge("Error", variant="danger"),
    ),
    Alert("System update complete.", type="success"),
    Table(
        headers=["ID", "Name", "Role", "Status"],
        data=[
            ["1", "Rachit Kanaujia", "Software Engineer", "Active"],
            ["2", "Amit Sharma", "Data Analyst", "Pending"],
            ["3", "Priya Verma", "UI/UX Designer", "Active"],
        ]
    ),
    ProgressBar(value=progress, max=100),
    Toast("WebSocket patch broadcasted.", visible=toast_visible),
    style=Style(padding="20px", gap="20px")
)

pl.run(app, serve=True)`,
  },
  navigation: {
    filename: 'app/nav_interaction_manual.py',
    code: `import pylage as pl

active_tab = pl.State("tab1")
drawer_open = pl.State(False)
dialog_open = pl.State(False)

def toggle_drawer():
    drawer_open.set(not drawer_open.value)

app = pl.Column(
    pl.Heading("Navigation & Modals", level=2),
    pl.Tabs(items=["Analytics", "Security", "Logs"], active=active_tab),
    pl.Button("Toggle Drawer", on_click=toggle_drawer),
    pl.Drawer(pl.Text("Sidebar Drawer Content"), open=drawer_open),
    pl.Dialog(pl.Text("Confirmation Dialog Modal"), open=dialog_open)
)

pl.run(app, serve=True)`,
  },
  dashboard: {
    filename: 'pylage_layout/templates/dashboard.py',
    code: `from pylage_layout.layouts import AppShell, TwoColumn, Container
from pylage_layout.patterns import Hero, StatsSection
import pylage as pl

sidebar = pl.Column(pl.Text("Dashboard"), pl.Text("Settings"))

content = Container(
    Hero(title="Executive Overview", description="Real-time KPI metrics"),
    StatsSection(
        stats=[
            {"value": "48.2K", "label": "Active Users", "description": "+14.2%"},
            {"value": "$124.5K", "label": "MRR", "description": "+23.8%"},
        ]
    )
)

app = AppShell(
    header=pl.Text("PyLage Dashboard"),
    sidebar=sidebar,
    content=content
)

pl.run(app, serve=True)`,
  },
  admin: {
    filename: 'pylage_layout/templates/admin_panel.py',
    code: `from pylage_layout.templates import AdminPanel
import pylage as pl

app = AdminPanel(
    title="Workspace Administration",
    roles=["SuperAdmin", "Admin", "Developer", "Viewer"],
    enforce_2fa=True
)

pl.run(app, serve=True)`,
  },
  landing: {
    filename: 'pylage_layout/templates/landing.py',
    code: `from pylage_layout.templates import LandingPage
from pylage_layout.patterns import Hero, FeatureSection, PricingSection

app = LandingPage(
    hero=Hero(title="Pure Python Web Dashboards"),
    features=FeatureSection(items=["Zero JS", "Reactive State", "Sub-ms Patches"]),
    pricing=PricingSection(plans=["Community (AGPL)", "Enterprise Commercial"])
)

pl.run(app, serve=True)`,
  },
  explorer: {
    filename: 'pylage/core/registry.py',
    code: `# Component Registry Definition for PyLage UI
from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class PropDefinition:
    kind: str  # "attribute", "boolean", or "text"
    html_name: str
    reactive: bool = True

class ComponentRegistry:
    def __init__(self):
        self._registry = {}

    def register(self, tag: str, props: Dict[str, PropDefinition]):
        self._registry[tag] = props`,
  },
  architecture: {
    filename: 'pylage/runtime/websocket.py',
    code: `# WebSocket Dispatcher & Coalesced Update Pipeline
import json
import asyncio

class WebSocketServer:
    def __init__(self, scheduler):
        self.scheduler = scheduler
        self.clients = set()

    async def broadcast_patch(self, patch_payload):
        # Transmits minimal JSON diff to all connected browser tabs
        message = json.dumps(patch_payload)
        for client in self.clients:
            await client.send(message)`,
  },
};

export const PythonSourcePanel: React.FC<PythonSourcePanelProps> = ({
  currentView,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const info = VIEW_PYTHON_FILES[currentView] || VIEW_PYTHON_FILES.overview;

  const handleCopy = () => {
    navigator.clipboard.writeText(info.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-blue-400" />
          <span className="font-mono text-xs font-bold text-slate-200">{info.filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 max-h-72 overflow-y-auto">
        <pre className="font-mono text-xs text-blue-200 leading-relaxed overflow-x-auto">
          {info.code}
        </pre>
      </div>
    </div>
  );
};
