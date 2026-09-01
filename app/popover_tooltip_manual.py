import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Popover, Tooltip, Menu, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    menu_selection = ps.State("None")
    tooltip_hits = ps.State(0)

    def select_item(name):
        def handler(e=None):
            menu_selection.set(name)
        return handler

    def increment_tooltip(e=None):
        tooltip_hits.set(tooltip_hits.value + 1)

    # Tooltip Demo
    tip_button = Button(
        "Hover or Click Tooltip Trigger",
        on_click=increment_tooltip,
        variant="primary"
    )
    tooltip_component = Tooltip(
        tip_button,
        Text("🚀 PyLage High-Performance Tooltip: Zero Client Bundles!"),
        title="Quick Info Tooltip"
    )

    # Menu Demo
    menu_items = Column(
        Button("Profile Settings", on_click=select_item("Profile Settings")),
        Button("API Tokens", on_click=select_item("API Tokens")),
        Button("Logout Session", on_click=select_item("Logout Session")),
        style=Style(display="flex", gap="0.5rem", padding="0.75rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="8px")
    )
    menu_component = Menu(
        menu_items,
        title="User Action Menu",
        class_name="pylage-action-menu"
    )

    # Popover Demo
    popover_content = Card(
        Heading("Quick Stats Popover", level=4),
        Text("Memory: 18.2 MB | Active Sockets: 1"),
        style=Style(padding="1rem", background="#f1f5f9", border_radius="6px")
    )
    popover_component = Popover(
        popover_content,
        title="Server Diagnostics",
        class_name="pylage-popover-panel"
    )

    app = Column(
        Heading("Popover, Tooltip & Menu — Live Manual Test Suite", level=1),
        Text("Test floating utility components, tooltips, interactive contextual menus and popovers."),
        Card(
            Row(
                Text("Selected Menu Option: ", style=Style(font_weight="bold")),
                Heading(menu_selection, level=3, style=Style(color="#2563eb", margin="0")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            Row(
                Text("Tooltip Trigger Interactions: ", style=Style(font_weight="bold")),
                Text(tooltip_hits, style=Style(color="#10b981", font_weight="bold")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        Heading("1. Tooltip Component", level=3),
        tooltip_component,
        Heading("2. Context Menu Component", level=3, style=Style(margin_top="1.5rem")),
        menu_component,
        Heading("3. Popover Component", level=3, style=Style(margin_top="1.5rem")),
        popover_component,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Popover/Tooltip/Menu Manual Test", serve=True, host="0.0.0.0", port=3000)
