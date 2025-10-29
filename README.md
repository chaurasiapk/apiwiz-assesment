## JSON Tree Visualizer (apiwiz-assesment)

[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vite.dev) [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/) [![React Flow](https://img.shields.io/badge/React%20Flow-11.11-0A66C2)](https://reactflow.dev/) [![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint)](https://eslint.org/)

An interactive web app to visualize any JSON as a navigable graph. Paste JSON, generate a color‑coded node graph using React Flow, search by property path, and toggle light/dark theme. Fully responsive with an editor sidebar on small screens.

### Demo
- Run locally with the steps below. A hosted demo is not included.

---

### Features
- **JSON input with validation**: Paste raw JSON; invalid input is detected.
- **Graph visualization**: Auto‑generated nodes/edges with type‑based colors.
- **Search by path**: Filter/highlight nodes by dot or bracket notation (e.g., `user.address.city`, `items[0].name`).
- **Interactive canvas**: Zoom, pan, fit view; React Flow controls enabled.
- **Theme toggle**: Light/Dark with persistence via `localStorage`.
- **Responsive UI**: Collapsible editor panel on small devices.

---

### Getting Started

#### Prerequisites
- Node.js >= 18
- npm >= 9

#### Install
```bash
npm install
```

#### Development
```bash
npm run dev
```
Starts Vite dev server with HMR.

#### Build
```bash
npm run build
```
Type‑checks and builds for production.

#### Preview (after build)
```bash
npm run preview
```
Serves the production build locally.

#### Lint
```bash
npm run lint
```

---

### Usage
1. Start the dev server: `npm run dev` and open the shown URL.
2. Paste your JSON into the left panel and click "Generate Tree".
3. Use the search bar to find nodes by path:
   - Dot notation: `user.address.city`
   - Bracket notation: `items[0].name` or `user['first-name']`
4. Click the theme toggle to switch light/dark.
5. Pan/zoom and use the on‑canvas controls to navigate.

Notes:
- Bracket notation is normalized internally (e.g., `user['name']` -> `user.name`).
- When no match is found, you’ll see a quick notice.

---

### Project Structure
```text
src/
  components/
    JsonInput.tsx          # JSON editor + validation + submit
    JsonTreeVisualizer.tsx # Page layout: header, editor, search, graph
    SearchInput.tsx        # Path search with reset
    ThymeToggle.tsx        # Theme toggle (light/dark)
    TreeVisualizer.tsx     # React Flow canvas and controls
  contexts/
    JsonContext.tsx        # Raw JSON state provider
    ThemeContext.tsx       # Theme ("thyme") provider with persistence
    TreeContext.tsx        # Nodes/edges state + JSON traversal and layout
  hooks/
    useJson.ts             # Access JSON context
    useThyme.ts            # Access theme context
    useTree.ts             # Access tree context (nodes/edges/handlers)
    useRecursiveMenu.ts    # Small-device responsive helper
  utils/
    JsonParser.ts          # isValidJson helper
    common.ts              # normalizePath for bracket -> dot notation
  App.tsx                  # Root layout wrapper
  main.tsx                 # Providers and entry point
  index.css                # Tailwind + React Flow overrides
```

---

### How It Works
- **Data flow**
  - `JsonContext` stores the raw JSON string.
  - `TreeContext` parses JSON and computes a graph: nodes include a `data.path` (e.g., `user.address.city`) used by search. Nodes are styled by value type (string/number/boolean/null/object/array) and laid out with configurable spacing.
  - `ThemeContext` stores the theme flag and persists it in `localStorage`.

- **Visualization**
  - `TreeVisualizer` renders using React Flow with zoom/pan/controls and a subtle grid background. Edges use smooth steps with arrow markers.

- **Search**
  - `SearchInput` normalizes the user query via `normalizePath` and fades non‑matching nodes for quick visual focus. `Reset` clears filtering.

---

### Configuration & Tooling
- **Vite**: See `vite.config.ts` (React + TailwindCSS plugin).
- **TypeScript**: Strict settings configured in `tsconfig.app.json`.
- **ESLint**: Modern config with React Hooks/Refresh plugins (`eslint.config.js`).
- **Styling**: Tailwind CSS v4 imported in `src/index.css`. React Flow watermark is hidden via a small override.

---

### Accessibility
- Theme toggle has an `aria-label`.
- Buttons and interactions have visible focus styles.

---

### Limitations
- Large or deeply nested JSON may impact performance on lower‑end devices.
- Search matches full paths; partial segment matching is limited to `includes` on the node path.

---

### Acknowledgements
- [React Flow](https://reactflow.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

### Contributing
1. Fork the repo and create a feature branch.
2. Install dependencies with `npm install`.
3. Run `npm run dev` to develop.
4. Submit a PR describing your changes.

---

### License
No license specified. Add one if you plan to distribute.
