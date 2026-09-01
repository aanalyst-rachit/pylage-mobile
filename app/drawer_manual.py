import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Drawer, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    drawer_open = ps.State(False)
    status_msg = ps.State("Drawer is currently closed.")

    def open_drawer(e=None):
        drawer_open.set(True)
        status_msg.set("Drawer is OPEN.")

    def close_drawer(e=None):
        drawer_open.set(False)
        status_msg.set("Drawer is CLOSED.")

    drawer_content = Column(
        Row(
            Heading("Navigation Drawer", level=3),
            Button("✕ Close", on_click=close_drawer, variant="secondary"),
            style=Style(display="flex", justify_content="space-between", align_items="center")
        ),
        Text("Navigation Links:"),
        Button("📊 Dashboard Overview", on_click=close_drawer),
        Button("👥 User Management", on_click=close_drawer),
        Button("⚙️ System Settings", on_click=close_drawer),
        Button("🔒 Security Audit", on_click=close_drawer),
        style=Style(padding="1.5rem", gap="1rem", width="280px", background="#ffffff", height="100%")
    )

    drawer_component = Drawer(
        drawer_content,
        open=drawer_open,
        title="Side Navigation Drawer",
        class_name="pylage-side-drawer"
    )

    app = Column(
        Heading("Drawer Component — Live Manual Test Suite", level=1),
        Text("Test side overlay drawer rendering, open state toggling, and close handlers."),
        Card(
            Row(
                Text("Current State: ", style=Style(font_weight="bold")),
                Text(status_msg, style=Style(color="#2563eb", font_weight="bold")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        Button("Open Side Drawer", on_click=open_drawer, variant="primary"),
        drawer_component,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Drawer Manual Test", serve=True, host="0.0.0.0", port=3000)
