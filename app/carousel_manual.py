import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Carousel, Card, Column, Heading, Row, Text, Button, Image


def get_app():
    # State Management
    current_slide = ps.State(0)
    slide_title = ps.State("Slide 1: Lightning Fast Diff")

    slides_info = [
        "Slide 1: Lightning Fast Diff Engine",
        "Slide 2: Pure Python Component Tree",
        "Slide 3: Reactive State Binding & Batching",
    ]

    def next_slide(e=None):
        new_idx = (current_slide.value + 1) % len(slides_info)
        current_slide.set(new_idx)
        slide_title.set(slides_info[new_idx])

    def prev_slide(e=None):
        new_idx = (current_slide.value - 1) % len(slides_info)
        current_slide.set(new_idx)
        slide_title.set(slides_info[new_idx])

    # Slide Cards
    slide_1 = Card(
        Heading("Slide 1", level=3),
        Text("PyLage diff engine operates with sub-millisecond overhead per state change."),
        style=Style(padding="2rem", background="#eff6ff", border="1px solid #bfdbfe", border_radius="12px")
    )

    slide_2 = Card(
        Heading("Slide 2", level=3),
        Text("No JSX or client-side JavaScript authored — 100% Pythonic syntax."),
        style=Style(padding="2rem", background="#f0fdf4", border="1px solid #bbf7d0", border_radius="12px")
    )

    slide_3 = Card(
        Heading("Slide 3", level=3),
        Text("Coalesced scheduler queues prevent DOM thrashing on rapid mutations."),
        style=Style(padding="2rem", background="#faf5ff", border="1px solid #e9d5ff", border_radius="12px")
    )

    carousel_node = Carousel(
        slide_1,
        slide_2,
        slide_3,
        class_name="pylage-carousel",
        title="PyLage Feature Carousel",
        style=Style(width="100%", max_width="600px")
    )

    # Controls
    controls = Row(
        Button("◀ Previous Slide", on_click=prev_slide, variant="secondary"),
        Button("Next Slide ▶", on_click=next_slide, variant="primary"),
        style=Style(display="flex", gap="1rem", justify_content="center", margin_top="1rem")
    )

    app = Column(
        Heading("Carousel Component — Live Manual Test Suite", level=1),
        Text("Test slide index cycling, previous/next triggers, and state synchronization."),
        Card(
            Row(
                Text("Active Slide Index: ", style=Style(font_weight="bold")),
                Heading(current_slide, level=3, style=Style(color="#2563eb", margin="0")),
                Text(" | ", style=Style(margin="0 0.5rem", color="#94a3b8")),
                Text(slide_title, style=Style(font_weight="bold", color="#1e293b")),
                style=Style(display="flex", align_items="center")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        carousel_node,
        controls,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Carousel Manual Test", serve=True, host="0.0.0.0", port=3000)
