import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Tabs, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    active_tab = ps.State("tab_analytics")
    tab_title = ps.State("Analytics & Metrics")

    def switch_to_analytics(e=None):
        active_tab.set("tab_analytics")
        tab_title.set("Analytics & Metrics")

    def switch_to_security(e=None):
        active_tab.set("tab_security")
        tab_title.set("Security & Permissions")

    def switch_to_billing(e=None):
        active_tab.set("tab_billing")
        tab_title.set("Billing & Plans")

    # Tab switcher navigation bar
    nav_tabs = Row(
        Button("Analytics", on_click=switch_to_analytics, variant="primary"),
        Button("Security", on_click=switch_to_security, variant="secondary"),
        Button("Billing", on_click=switch_to_billing, variant="secondary"),
        style=Style(display="flex", gap="0.5rem", border_bottom="1px solid #e2e8f0", padding_bottom="0.5rem")
    )

    tab_container = Tabs(
        nav_tabs,
        class_name="pylage-tabs-container",
        title="PyLage Reactive Tabs",
        style=Style(width="100%", max_width="700px")
    )

    app = Column(
        Heading("Tabs Component — Live Manual Test Suite", level=1),
        Text("Test active tab state synchronization, tab switching callbacks, and panel displays."),
        Card(
            Row(
                Text("Currently Active View: ", style=Style(font_weight="bold")),
                Heading(tab_title, level=3, style=Style(color="#2563eb", margin="0")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        tab_container,
        Card(
            Heading(tab_title, level=4),
            Text("Content dynamically synchronized with the selected active tab state."),
            style=Style(padding="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="8px", margin_top="1rem")
        ),
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Tabs Manual Test", serve=True, host="0.0.0.0", port=3000)
