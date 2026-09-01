import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, DatePicker, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    selected_date = ps.State("2026-09-01")
    date_display = ps.State("2026-09-01")

    def handle_date_change(val=None):
        if isinstance(val, dict):
            val = val.get("value", selected_date.value)
        selected_date.set(str(val))
        date_display.set(str(val))

    def set_today(e=None):
        selected_date.set("2026-09-01")
        date_display.set("2026-09-01")

    def set_next_week(e=None):
        selected_date.set("2026-09-08")
        date_display.set("2026-09-08")

    picker = DatePicker(
        value=selected_date,
        on_change=handle_date_change,
        style=Style(padding="0.5rem 0.75rem", border="1px solid #cbd5e1", border_radius="6px", font_size="1rem")
    )

    quick_actions = Row(
        Button("Today", on_click=set_today, variant="secondary"),
        Button("+1 Week", on_click=set_next_week, variant="secondary"),
        style=Style(display="flex", gap="0.5rem", margin_top="0.75rem")
    )

    app = Column(
        Heading("DatePicker Component — Live Manual Test Suite", level=1),
        Text("Test bidirectional date binding, HTML5 date picker rendering, and programmatic state overrides."),
        Card(
            Row(
                Text("Selected Date Value: ", style=Style(font_weight="bold")),
                Heading(date_display, level=3, style=Style(color="#2563eb", margin="0")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        picker,
        quick_actions,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage DatePicker Manual Test", serve=True, host="0.0.0.0", port=3000)
