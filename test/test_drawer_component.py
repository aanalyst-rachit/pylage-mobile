from pylage import Drawer, Text, Button
from pylage.core.renderer import render


def test_drawer_renders_as_aside():
    drawer = Drawer(
        Text("Navigation"),
        Button(text="Home"),
    )

    html = render(drawer)

    assert "<aside" in html


def test_drawer_supports_props():
    drawer = Drawer(
        class_name="sidebar",
        title="Navigation drawer",
    )

    html = render(drawer)

    assert 'class="sidebar"' in html
    assert 'title="Navigation drawer"' in html


def test_drawer_renders_children():
    drawer = Drawer(
        Text("Dashboard"),
        Button(text="Settings"),
    )

    html = render(drawer)

    assert "Dashboard" in html
    assert "Settings" in html


def test_drawer_supports_open_boolean():
    closed_drawer = Drawer(open=False)
    open_drawer = Drawer(open=True)

    closed_html = render(closed_drawer)
    open_html = render(open_drawer)

    assert " open" not in closed_html
    assert " open" in open_html


def test_drawer_supports_reactive_open_state():
    import pylage as ps
    open_state = ps.State(False)
    drawer = Drawer(open=open_state)

    assert " open" not in render(drawer)

    open_state.set(True)
    assert " open" in render(drawer)

