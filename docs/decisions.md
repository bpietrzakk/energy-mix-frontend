# Architecture Decision Records

## ADR-1: Vite proxy instead of direct backend URL in development

**Decision:** Configure Vite's `server.proxy` to forward `/api/*` to `http://localhost:8080` in development, and leave `VITE_API_BASE_URL` empty by default.

**Reasoning:** Calling the backend directly from the browser triggers CORS preflight. Using Vite proxy makes all requests same-origin from the browser's perspective, eliminating CORS entirely in dev without requiring backend changes. For production, setting `VITE_API_BASE_URL` restores full URL routing.

---

## ADR-2: Plain fetch over React Query or axios

**Decision:** Use native `fetch` with `async/await` in dedicated functions under `src/api/`.

**Reasoning:** The app has two endpoints and no caching, polling, or mutation requirements. Adding React Query or axios would be unnecessary complexity for this scope. The API layer is thin enough that plain fetch keeps the bundle smaller and the code easier to follow.

---

## ADR-3: Inline styles over CSS modules or Tailwind

**Decision:** All component styling uses inline `style={{}}` objects; a single `index.css` handles only the global reset.

**Reasoning:** The component set is small and self-contained. Inline styles avoid class-name collisions without needing a build-time CSS solution, and keep each component fully portable. Tailwind was not included in the initial setup and adding it mid-project for a handful of components would be over-engineering.

---

## ADR-4: useState + useEffect for data fetching

**Decision:** Fetch energy mix data in `App.tsx` using `useState` + `useEffect`; `ChargingWindow` manages its own fetch on form submit.

**Reasoning:** The energy mix is fetched once on mount and shared by two child components, so it belongs at the `App` level. The charging window result is user-triggered and local to that section, so co-locating state there avoids unnecessary prop drilling. No global store is needed.

---

## ADR-5: Source colors defined as a single constant

**Decision:** Energy source colors are defined once in `EnergyMixChart.tsx` as `SOURCE_COLORS` and reused for both chart bars and the Recharts legend.

**Reasoning:** A single source of truth prevents the chart and legend from drifting out of sync if a color changes. Recharts derives legend colors automatically from the `fill` prop on each `<Bar>`, so no separate legend color mapping is needed.
