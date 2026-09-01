import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Accordion, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    active_section = ps.State("Section 1")
    expand_count = ps.State(0)

    def select_sec1(e=None):
        active_section.set("Section 1: Engine Architecture")
        expand_count.set(expand_count.value + 1)

    def select_sec2(e=None):
        active_section.set("Section 2: Reactive State Binding")
        expand_count.set(expand_count.value + 1)

    def select_sec3(e=None):
        active_section.set("Section 3: WebSocket Wire Protocol")
        expand_count.set(expand_count.value + 1)

    # Component Composition
    accordion_item_1 = Card(
        Row(
            Heading("1. Engine Architecture", level=4),
            Button("Toggle / View", on_click=select_sec1, variant="secondary"),
            style=Style(display="flex", justify_content="space-between", align_items="center")
        ),
        Text("PyLage compiles pure Python component trees into optimized HTML and client-side reactive bindings."),
        style=Style(padding="1rem", margin_bottom="0.5rem", border="1px solid #e2e8f0", border_radius="8px")
    )

    accordion_item_2 = Card(
        Row(
            Heading("2. Reactive State Binding", level=4),
            Button("Toggle / View", on_click=select_sec2, variant="secondary"),
            style=Style(display="flex", justify_content="space-between", align_items="center")
        ),
        Text("State(val) tracks all bound components and triggers minimal microtask-coalesced diff patches."),
        style=Style(padding="1rem", margin_bottom="0.5rem", border="1px solid #e2e8f0", border_radius="8px")
    )

    accordion_item_3 = Card(
        Row(
            Heading("3. WebSocket Wire Protocol", level=4),
            Button("Toggle / View", on_click=select_sec3, variant="secondary"),
            style=Style(display="flex", justify_content="space-between", align_items="center")
        ),
        Text("Sub-millisecond binary & JSON UpdateMessages over full-duplex persistent WebSocket connections."),
        style=Style(padding="1rem", margin_bottom="0.5rem", border="1px solid #e2e8f0", border_radius="8px")
    )

    accordion_container = Accordion(
        accordion_item_1,
        accordion_item_2,
        accordion_item_3,
        class_name="pylage-accordion-group",
        title="PyLage Interactive Accordion Manual Test",
        style=Style(width="100%", max_width="700px")
    )

    # Main App Layout
    app = Column(
        Heading("Accordion Component — Live Manual Test Suite", level=1),
        Text("Test collapsible sections, live selection events, and state-bound title rendering."),
        Card(
            Row(
                Text("Currently Active Section: ", style=Style(font_weight="bold")),
                Heading(active_section, level=3, style=Style(color="#2563eb", margin="0")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            Row(
                Text("Total Toggle Interactions: ", style=Style(font_weight="bold")),
                Text(expand_count, style=Style(color="#10b981", font_weight="bold")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        accordion_container,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Accordion Manual Test", serve=True, host="0.0.0.0", port=3000)
