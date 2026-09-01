import sys
from pathlib import Path

# Project root setup
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pylage as ps
from pylage import Style, Pagination, Breadcrumbs, Card, Column, Heading, Row, Text, Button


def get_app():
    # State Management
    current_page = ps.State(1)
    total_pages = 5
    page_data_msg = ps.State("Showing Records 1 - 10 of 50")

    def go_prev(e=None):
        if current_page.value > 1:
            p = current_page.value - 1
            current_page.set(p)
            page_data_msg.set(f"Showing Records {(p-1)*10 + 1} - {p*10} of 50")

    def go_next(e=None):
        if current_page.value < total_pages:
            p = current_page.value + 1
            current_page.set(p)
            page_data_msg.set(f"Showing Records {(p-1)*10 + 1} - {p*10} of 50")

    def jump_page(p_val):
        def handler(e=None):
            current_page.set(p_val)
            page_data_msg.set(f"Showing Records {(p_val-1)*10 + 1} - {p_val*10} of 50")
        return handler

    # Breadcrumbs
    crumbs = Breadcrumbs(
        Text("Home / "),
        Text("Admin / "),
        Text("Users / "),
        Text("Paginated View"),
        style=Style(font_size="0.875rem", color="#64748b", margin_bottom="1rem")
    )

    # Pagination controls
    page_buttons = [
        Button("◀ Prev", on_click=go_prev, variant="secondary"),
    ]
    for i in range(1, total_pages + 1):
        page_buttons.append(Button(str(i), on_click=jump_page(i)))
    page_buttons.append(Button("Next ▶", on_click=go_next, variant="secondary"))

    pag_row = Row(*page_buttons, style=Style(display="flex", gap="0.5rem", align_items="center", justify_content="center"))

    pagination_node = Pagination(
        pag_row,
        class_name="pylage-pagination-bar",
        title="Table Pagination",
        style=Style(width="100%", margin_top="1rem")
    )

    app = Column(
        crumbs,
        Heading("Pagination & Breadcrumbs — Live Manual Test Suite", level=1),
        Text("Test page navigation, stepper bounds clamping, and breadcrumbs trail rendering."),
        Card(
            Row(
                Text("Current Page: ", style=Style(font_weight="bold")),
                Heading(current_page, level=3, style=Style(color="#2563eb", margin="0")),
                Text(f" of {total_pages}", style=Style(color="#64748b")),
                style=Style(display="flex", align_items="center", gap="0.5rem")
            ),
            Row(
                Text("Record Subset: ", style=Style(font_weight="bold")),
                Text(page_data_msg, style=Style(color="#10b981", font_weight="bold")),
                style=Style(display="flex", align_items="center", gap="0.5rem", margin_top="0.5rem")
            ),
            style=Style(padding="1rem", background="#f8fafc", border_radius="8px", margin_bottom="1.5rem")
        ),
        pagination_node,
        style=Style(padding="2rem", gap="1.5rem", font_family="system-ui, sans-serif")
    )

    return app


if __name__ == "__main__":
    app = get_app()
    ps.run(app, title="PyLage Pagination Manual Test", serve=True, host="0.0.0.0", port=3000)
