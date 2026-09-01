"""Public application shell layout for PyLage Layout."""

from typing import Any

from pylage.components import Column, Row


def AppShell(
    *,
    header: Any = None,
    sidebar: Any = None,
    content: Any = None,
    footer: Any = None,
    class_name: str | None = None,
    **props: Any,
):
    """Compose an application shell from header, sidebar, content, and optional footer.

    Public Phase 8 API:

        AppShell(
            header=...,
            sidebar=...,
            content=...,
            footer=...,
        )
    """
    body_children = []

    if sidebar is not None:
        body_children.append(sidebar)

    if content is not None:
        body_children.append(content)

    body = Row(
        *body_children,
        class_name="app-shell-body",
    )

    children = []

    if header is not None:
        children.append(header)

    children.append(body)

    if footer is not None:
        children.append(footer)

    if class_name is not None:
        props["class_name"] = class_name
    elif "class_name" not in props:
        props["class_name"] = "app-shell"

    return Column(*children, **props)


__all__ = ["AppShell"]
