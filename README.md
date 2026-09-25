# $bog_flow

Runtime inspector of the $mol_wire reactive graph: every `@$mol_mem` is already a node, so no decorators are needed.

- `$bog_flow` walks the graph from a root fiber by `pub_list` and returns nodes (top to bottom), edges and a recompute counter per node.
- `$bog_flow_panel` shows who reads whom, with search and highlight of recently changed nodes. Add `bog/flow/panel` to any app bundle and open it with `?flow` in the URL: the panel mounts itself over the page.
- Demo: `bog/flow/demo/`.

```ts
const flow = $bog_flow.make({ root: ()=> $bog_flow.fiber( app, 'dom_tree' ) })
flow.snapshot().nodes
```
