import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Dialog, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    dialog_open = ps.State(False)
    action_log = ps.State("No dialog action taken yet.")

    def open_dialog(e=None):
        dialog_open.set(True)
        action_log.set("Dialog opened by user.")

    def confirm_action(e=None):
        dialog_open.set(False)
        action_log.set("Dialog confirmed & closed.")

    def cancel_action(e=None):
        dialog_open.set(False)
        action_log.set("Dialog cancelled & closed.")

    dialog_modal = Dialog(
        Card(
            Heading("Confirm System Deployment", level=3),
            Text("Are you sure you want to deploy the updated PyLage components to production?"),
            Row(
                Button("Cancel", on_click=cancel_action, variant="secondary"),
                Button("Confirm & Deploy", on_click=confirm_action, variant="primary"),
                style=Style(display="flex", justify_content="flex-end", gap="0.75rem", margin_top="1.5rem")
            ),
            style=Style(padding="1.5rem", background="#ffffff", border_radius="12px", max_width="450px")
        ),
        open=dialog_open,
        title="Deployment Modal Dialog",
        class_name="pylage-dialog-overlay"
    )

    app = Column(
        Heading("Dialog / Modal Component — Live Manual Test Suite", level=1),
        Text("Test dialog backdrop rendering, open/close boolean state toggling, and nested actions."),
        Card(
            Row(
                Text("Dialog Status: ", style=Style(font_weight="bold")),
                Text(action_log, style=Style(color="#2563eb", font_weight="bold")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        Button("Open Modal Dialog", on_click=open_dialog, variant="primary"),
        dialog_modal,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Dialog Manual Test", serve=True, host="0.0.0.0", port=3000)
