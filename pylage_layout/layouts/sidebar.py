"""Sidebar layout primitive and navigation helpers for PyLage Layout."""

from typing import Any, Callable

from pylage.components import Button, Column, Heading, Icon, Navigation, Row, Text


def SidebarNav(
    items: list[Any],
    *,
    active: Any = None,
    on_change: Callable[[Any], Any] | None = None,
    title: Any = None,
    footer: Any = None,
    class_name: str = "sidebar-nav",
    **props: Any,
):
    """Create a structured sidebar navigation menu (Streamlit/Reflex style).

    Supports reactive active state selection and custom icons/buttons.
    """
    children = []

    if title is not None:
        if isinstance(title, str) or hasattr(title, "value") or hasattr(title, "subscribe"):
            children.append(Heading(title, class_name="sidebar-nav-title"))
        else:
            children.append(title)

    nav_items = []
    for item in items:
        if hasattr(item, "type"):
            nav_items.append(item)
        elif isinstance(item, str):
            val = item

            def _make_handler(v=val):
                def _handler():
                    if hasattr(active, "set"):
                        active.set(v)
                    if on_change:
                        on_change(v)
                return _handler

            nav_items.append(
                Button(
                    item,
                    on_click=_make_handler(),
                    class_name="sidebar-nav-item",
                )
            )
        elif isinstance(item, dict):
            label = item.get("label", item.get("title", ""))
            val = item.get("value", label)
            icon_name = item.get("icon")

            def _make_dict_handler(v=val):
                def _handler():
                    if hasattr(active, "set"):
                        active.set(v)
                    if on_change:
                        on_change(v)
                return _handler

            btn_children = []
            if icon_name:
                btn_children.append(Icon(icon_name))
            btn_children.append(Text(label))

            nav_items.append(
                Button(
                    Row(*btn_children, class_name="sidebar-nav-btn-content") if icon_name else label,
                    on_click=_make_dict_handler(),
                    class_name="sidebar-nav-item",
                )
            )

    children.append(
        Navigation(
            Column(*nav_items, class_name="sidebar-nav-list"),
            class_name="sidebar-nav-container",
        )
    )

    if footer is not None:
        children.append(footer)

    return Column(
        *children,
        class_name=class_name,
        **props,
    )


def SidebarLayout(
    sidebar: Any,
    content: Any,
    *,
    class_name: str = "sidebar-layout",
    sidebar_width: str = "260px",
    gap: str = "1rem",
    **props: Any,
):
    sidebar_style = {
        "width": sidebar_width,
        "flex_shrink": "0",
    }

    content_style = {
        "width": "100%",
        "min_width": "0",
        "flex": "1",
    }

    sidebar_component = Column(
        sidebar,
        style=sidebar_style,
    )

    content_component = Column(
        content,
        style=content_style,
    )

    return Row(
        sidebar_component,
        content_component,
        class_name=class_name,
        style={
            "width": "100%",
            "display": "flex",
            "flex_direction": "row",
            "gap": gap,
        },
        **props,
    )

