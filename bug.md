# PyLage UI Engine — Bug Tracking & Fix Log (`bug.md`)

This file tracks all bugs identified in the PyLage transpiler, reactive runtime, component registry, and layout engine.
Every bug follows the strict verification cycle:
1. **Bug Identification & Root Cause Analysis**
2. **Automated Unit & Regression Tests** in `test/`
3. **Engine Fix** (preserving all existing public API and performance contracts)
4. **Live Manual Testing Script** in `app/`
5. **Verification**: 100% test suite pass

---

## 📋 Bug Resolution Index

| Bug ID | Component / Module | Severity | Title | Test File | Manual Script | Status |
|--------|-------------------|----------|-------|-----------|---------------|--------|
| **BUG-01** | `pylage/components/basic.py` (`Accordion`) | Medium | Accordion value binding and reactive section contract | `test/test_accordion_component.py` | `app/accordion_manual.py` | **FIXED** |
| **BUG-02** | `pylage/components/basic.py` (`Carousel`) | Medium | Carousel value / slide index reactive binding | `test/test_carousel_component.py` | `app/carousel_manual.py` | **FIXED** |
| **BUG-03** | `pylage/core/registry.py` (`Dialog`) | Medium | Dialog boolean `open` attribute rendering without `open="False"` string artifact | `test/test_dialog_component.py` | `app/dialog_manual.py` | **FIXED** |
| **BUG-04** | `pylage/core/registry.py` (`Drawer`) | Medium | Drawer boolean `open` attribute rendering and reactive state binding | `test/test_drawer_component.py` | `app/drawer_manual.py` | **FIXED** |
| **BUG-05** | `pylage/core/registry.py` (`Tabs`) | Low | Tabs active value synchronization and reactive state binding | `test/test_tabs_component.py` | `app/tabs_manual.py` | **FIXED** |
| **BUG-06** | `pylage/components/basic.py` (`DatePicker`) | Low | DatePicker value ISO binding and min/max attribute support | `test/test_datepicker_component.py` | `app/datepicker_manual.py` | **FIXED** |
| **BUG-07** | `pylage/core/registry.py` (`Popover`, `Tooltip`, `Menu`) | Low | Popover and Tooltip prop definitions and children rendering | `test/test_popover_component.py`, `test/test_tooltip_component.py` | `app/popover_tooltip_manual.py` | **FIXED** |
| **BUG-08** | `pylage/core/registry.py` (`Pagination`) | Low | Pagination navigation container and action buttons | `test/test_pagination_component.py` | `app/pagination_manual.py` | **FIXED** |
| **BUG-09** | `pylage/core/events.py`, `pylage/core/binding.py`, `pylage/runtime/websocket.py` | High | Dynamic Subtree Indexing & JSON-safe State unwrapping after WebSocketServer start | `test/test_tree_dynamic_binding.py` | `app/accordion_manual.py`, `app/nav_interaction_manual.py` | **FIXED** |

---

## 🛠️ Detailed Bug Fix Summaries

### BUG-09: Dynamic Subtree Indexing & Reactive Binding in WebSocket Runtime
- **Issue**: Components added dynamically to the tree via `root.add(...)` or `root.replace(...)` after `WebSocketServer` initialization were not indexed by `EventDispatcher` and not bound by `StateBinding`. Additionally, serializing components containing `State` objects in `TreeAddMessage` raised `TypeError: Object of type State is not JSON serializable`.
- **Root Cause**: `EventDispatcher` and `StateBinding` only indexed nodes during their `__init__`.
- **Fix**:
  1. Added `index(node)` and `deindex(node)` to `EventDispatcher` (`pylage/core/events.py`).
  2. Added `bind(node)` to `StateBinding` (`pylage/core/binding.py`).
  3. Integrated automatic dynamic indexing, binding, and `_json_safe` prop resolution into `WebSocketServer._on_tree_mutation` for `add`, `replace`, `set_children`, `remove`, and `clear` mutations.
- **Tests Added**: `test/test_tree_dynamic_binding.py` (`test_dynamic_component_added_after_server_init_has_event_dispatch`, `test_dynamic_component_added_after_server_init_receives_state_binding`).

### BUG-03 & BUG-04: Dialog & Drawer Boolean `open` Prop Registry Contract
- **Issue**: Setting `open=False` on `Dialog` or `Drawer` rendered `<dialog open="False">` because `open` was registered as a standard attribute instead of a boolean attribute.
- **Root Cause**: `Dialog` and `Drawer` entries in `pylage/core/registry.py` were missing `"open": PropDefinition("open", kind="boolean", html_name="open")`.
- **Fix**: Added `open` boolean prop definitions to `Dialog` and `Drawer` in `pylage/core/registry.py`.
- **Tests Added**: `test/test_dialog_component.py` and `test/test_drawer_component.py`.

### BUG-01, BUG-02 & BUG-05: Accordion, Carousel & Tabs Reactive Value Prop Contract
- **Issue**: `Accordion`, `Carousel`, and `Tabs` lacked registered `value` props for binding active sections/slides/tabs dynamically.
- **Fix**: Added `"value": PropDefinition("value", kind="attribute", html_name="value")` in `pylage/components/basic.py` and `pylage/core/registry.py`.
- **Tests Added**: `test_accordion_supports_value_and_reactivity`, `test_carousel_supports_value_and_reactivity`, `test_tabs_supports_value_and_reactivity`.

