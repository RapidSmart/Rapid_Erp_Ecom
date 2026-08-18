# AGENTS.md — Engineering Standards for AI Coding Agents

> **This file is binding.** Any AI agent (Claude Code, Copilot, Cursor, etc.) working in this repository must read and follow these rules before writing, editing, or reviewing code. If a request conflicts with this document, follow this document and flag the conflict to the user instead of silently deviating.

Stack: **React (Vite) + React Router / TanStack Router + TypeScript**, **pnpm** as package manager, SPA, modular domain architecture. No `constants/` folders anywhere — static/config data lives in `config/`, `styles/`, module `i18n/`, or colocated with the file that uses it (see Section 4).

---

## 0. How an agent should use this file

- Before generating code: identify which `modules/<name>/` the work belongs to, or whether it's genuinely cross-module (`shared/`).
- Before finishing any task: run the **Section 10 checklist** against your own diff before presenting it as done.
- Never invent an exception to a "Never / Forbidden / Strictly prohibited" rule below just because it's convenient for the current task. If a rule truly cannot be followed, stop and say so explicitly rather than quietly violating it.

---

## 1. Core Principles (apply to every file, every module)

- **DRY** — abstract duplicate logic/UI into shared hooks, primitives, or utils. But DRY is about _knowledge_, not text: two things that look identical today but represent business rules that can evolve independently must **stay separate**, even if currently identical. Two modules having similar-looking code (e.g. a review form and a comment form) are **not** automatically duplicates.
- **KISS** — no generic `<DataTable>` engine for one table, no state machine for a 2-state toggle. Deleting complexity is as valuable as adding features.
- **YAGNI** — do not build for hypothetical features or hypothetical future modules. This applies to scaffolding new `modules/<name>/` too: don't create one without a committed requirement.
- **Separation of Concerns** — inside every module:

  | Layer         | Responsibility                | Must NOT do                                        |
  | ------------- | ------------------------------ | --------------------------------------------------- |
  | `view/`       | Route-level page components    | Complex UI components (delegate to components/)      |
  | `components/` | Render UI from props/state     | Fetch data, own business rules, contain mock data    |
  | `hooks/`      | Stateful logic & side effects  | Render JSX                                           |
  | `services/`   | Talk to external APIs          | Contain UI logic                                     |
  | `utils/`      | Pure transformations           | Cause side effects, know about React                 |

- **SOLID**:
  - SRP — a component that fetches data, validates business rules, _and_ renders has 3 reasons to change. Split it.
  - OCP — extend via props/composition/slots, not by editing a shared primitive for one caller's special case.
  - LSP — interchangeable implementations (Input variants, auth strategies) must be swappable without breaking callers.
  - ISP — small, specific prop contracts; no "god prop" objects.
  - DIP — every module's `*.service.ts` depends on `shared/services/http.service.ts`, never on `axios`/`fetch` directly, and never on another module's service.

---

## 2. Directory Structure — Modular, Domain-First

```
src/
├── router/                       # routes.tsx, guards/, index.ts — routing config only
├── modules/
│   ├── auth/
│   │   ├── view/ components/ hooks/ services/ types/ validation/ store/ i18n/ __tests__/
│   │   └── index.ts               # the ONLY public import surface for this module
│   ├── account/ product/ blogs/ support/ ...
├── shared/                        # promoted, cross-module code ONLY
│   ├── components/ui|forms|layout|feedback/
│   ├── hooks/  services/http.service.ts
│   ├── types/  utils/  validation/
├── providers/ i18n/ config/ styles/ store/
```

**Hard rules:**

- A module **never** imports another module's internals — only its `index.ts` barrel.
- Nothing is promoted to `shared/` until a **second module genuinely needs it**. Premature promotion recreates a god-folder.
- `router/routes.tsx` stays thin: lazy-loaded route definitions only, no business logic, no fetching. `router/guards/` holds auth/permission guards only.
- Cross-module state lives in `providers/` or `store/` — never duplicated inside one module and read by another.
- New module checklist (required in the first PR of any new module):
  - [ ] `index.ts` barrel exists; nothing outside imports the module except through it
  - [ ] `services/*.service.ts` only calls `shared/services/http.service.ts` — no raw fetch/axios
  - [ ] `validation/*.schema.ts` covers every API response the module consumes
  - [ ] `i18n/en.json` created, namespaced, registered in `src/i18n/`
  - [ ] `module/<name>` branch + CODEOWNERS entry created
  - [ ] Route added in `router/routes.tsx` via `React.lazy()`, imports only the module's page component

---

## 3. HTTP Layer

- All API endpoint paths live in `config/api-routes.ts` as a typed `as const` object (`API_ROUTES.auth.login`). This is the one exception to "no constants folders" — it's app config, not domain data.
- `shared/services/http.service.ts` is the **only file in the codebase** allowed to know about Axios/fetch directly. It owns the base URL, interceptors (auth tokens, correlation IDs, 401 refresh-and-retry), and generic typed `get/post/put/patch/delete`.
- Each module's own `*.service.ts` is the only thing allowed to call `http.service.ts`. **No `fetch()` or `axios.get()` inside any `.tsx` file, ever, in any module.**
- Use React Query/SWR (pick one, app-wide, never mix) for all server-state fetching — caching, revalidation, optimistic updates, and user-triggered fetches all go through it. There's no server-rendering layer in an SPA, so this is the default, not just the caching-needs case.
- Namespace query keys by module: `['product', 'listing', filters]`.
- **Every API response must be validated with a Zod schema at the service boundary** — never trust the network just because TypeScript says so.

---

## 4. Zero Dummy Data Policy (and where static data actually lives)

- No static mock arrays, hardcoded nav lists, or fallback datasets inside `.tsx` files — ever, in any module.
- There is no `constants/` folder anywhere in this codebase. Static/config data is homed by scope, not dumped in a catch-all:
  - **App-wide config** (feature flags, env-derived values, API route map) → `config/`.
  - **Design tokens** (colors, spacing, typography) → `styles/` (Tailwind theme layer or CSS variables) — never inline hex codes or literal pixel values in components.
  - **UI copy** → module `i18n/{locale}.json` — never a `strings.ts` file.
  - **Route paths** → `router/routes.tsx` (or a co-located `router/paths.ts` if the list grows past what's readable inline).
  - **Module-specific static data used by only that module** (dropdown options, status enums, etc.) → a single colocated file inside that module, e.g. `modules/product/product.data.ts`, next to what consumes it. Do not create a `constants/` subfolder for it — that's the pattern this repo deliberately avoids.
  - **Data genuinely shared by 2+ modules** → promote to `shared/utils/` or `shared/types/` (for enums/unions) once the second consumer exists, not before.
- Test fixtures belong in `__mocks__/`/test files, never in production bundles — do not conflate them with UI fallback data.

---

## 5. Internationalization

- Every module ships its own `modules/<name>/i18n/{locale}.json`, keys namespaced by module (`auth.login.title`, `product.detail.addToCart`). `src/i18n/` is a loader/merger only — it contains no copy.
- No hardcoded UI copy anywhere — resolve through `useTranslation()`.
- Dates/numbers/currency go through `Intl.NumberFormat` / `Intl.DateTimeFormat`, never manual string concatenation.
- RTL languages handled via logical CSS properties (`margin-inline-start`, not `margin-left`).
- A module is not "done" without at least a base `en.json` and a missing-key fallback strategy.

---

## 6. Type Safety

- `strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true`.
- **No `any`, ever.** Use explicit types or `unknown` + Zod validation at external boundaries.
- Named exports for all components — no default exports (nothing here needs framework-mandated default exports, unlike Next.js route files).
- Debounce/throttle high-frequency events (resize, scroll, search input) via `shared/hooks/` utilities — never inline `setTimeout` scattered across components.
- Prefer discriminated unions over boolean/optional flag soup for state.
- Use branded/nominal types for IDs (`type UserId = string & { __brand: 'UserId' }`), especially across module boundaries.
- A module's `types/<module>.types.ts` is that module's source of truth; `shared/types/` is the source of truth for cross-module DTOs.

---

## 7. Components, State, Styling

**Components**

- Container/presentational split: logic in a hook/thin container, view stays a pure function of props.
- Composition over configuration — compound components, not 20 boolean props.
- Don't mix controlled/uncontrolled patterns in the same form.
- Every route element gets a real `<ErrorBoundary>` fallback (route-level, wired in `router/routes.tsx`) — never a blank screen. Each module's route group gets its own boundary.
- Every async boundary gets a deliberate `<Suspense fallback={<Skeleton />}>` — never a layout-shifting spinner-then-pop-in.
- No `[key: string]: any` catch-all props.

**State** — put state at the lowest common ancestor that needs it. Concrete test: _does a second module actually need this?_ If not, keep it local/module-scoped.

| State type                          | Tool                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------- |
| Server/cache state                   | React Query / SWR — never duplicated into global state                     |
| Local UI state                       | `useState`/`useReducer`, as local as possible                              |
| Module-local cross-component state   | module's own `store/` slice or Context                                     |
| Cross-module state                   | top-level `store/`/`providers/` — only when 2+ unrelated modules need it   |
| URL-derived state                    | `useSearchParams` (React Router) / route loader params                     |
| Form state                           | React Hook Form + Zod resolver                                             |

**Styling**

- Tokens only from `styles/` — no magic hex values or arbitrary pixel values in components.
- One styling paradigm app-wide (Tailwind or CSS Modules) — never mixed within a feature.
- Mobile-first, centralized breakpoints.
- Dark mode via root CSS variables, not per-component conditional classes.
- Always use the shared `cn()` utility (`clsx` + `twMerge`) for conditional classNames — never manual string interpolation (`` `${base} ${custom}` ``) or raw `clsx` without `twMerge`.

---

## 8. Performance, Testing, Accessibility, Security, Error Handling

**Performance**

- `React.lazy()` + `<Suspense>` for heavy/below-the-fold/conditional components and for every route in `router/routes.tsx`.
- Use a modern `<img>` with explicit `width`/`height`, `loading="lazy"`, and a responsive `srcSet`/CDN transform — there's no framework image component here, so this discipline is manual and non-negotiable.
- Self-host fonts via `@font-face` in `styles/` (or a Fontsource-style package) — never a render-blocking external Google Fonts `<link>` in `index.html`.
- Memoize deliberately (`useMemo`/`useCallback`/`React.memo`), not reflexively.
- Flag any component pulling in a >50kb dependency without justification.
- Route-based code splitting is mandatory — no single giant bundle for the whole app.

**Testing** — behavior, not implementation. Every bug fix ships a regression test in the module where it occurred. Critical paths (auth, payments, data-loss actions) require E2E coverage. Mock at the network boundary (MSW), not by mocking your own service functions.

**Accessibility** — semantic HTML first; keyboard-navigable with visible focus states; meaningful `alt` text; every input has a `<label>`; errors announced via `aria-live`; color is never the sole signal. `axe-core`/`eslint-plugin-jsx-a11y` in CI.

**Security**

- Nothing sensitive in `VITE_*` (or equivalent) env vars — anything prefixed for client bundling is public.
- Sanitize any `dangerouslySetInnerHTML` (DOMPurify) — relevant especially to Blogs/Support modules.
- Runtime-validate all external input (Zod), regardless of TS types.
- Prefer httpOnly cookies over `localStorage` for session tokens.
- Automated dependency scanning (`pnpm audit`, Dependabot/Renovate) in CI.

**Error Handling**

- Every async boundary has a designed empty/error state — never a raw stack trace or blank page.
- HTTP interceptor layer normalizes all API errors to `{ code, message, details }` before they reach feature code.
- Production errors go to a monitoring service (Sentry) with route/module/session/request context.
- **A silent `catch {}` block that swallows an error is treated as a bug in review.**

---

## 9. Git Workflow

```
main (protected, deploy-on-merge)
 └── dev (protected, integration)
      └── module/<name> (long-lived, one per domain)
           └── feature/<module>/<kebab-case-description>
```

- No direct commits to `main`, `dev`, or any `module/*` branch — everything through a PR, including hotfixes (`feature/<module>/hotfix-xyz`).
- `feature → module`: PR + review by a module owner. `module → dev`: PR, batched, full CI. `dev → main`: release PR, full CI + E2E + manual sign-off.
- If a feature branch starts touching `shared/`, that's a signal the change needs its own PR reviewed by a wider group.
- Sync module branches with `dev` regularly (start of sprint / before new feature branch) to avoid conflict-fests.
- Conventional Commits scoped to the module: `feat(auth): add OTP resend cooldown timer`. Valid scopes: `auth · account · product · blogs · support · shared · router · infra · config · i18n · store`.
- Husky + lint-staged run lint/format/typecheck on every commit — never run manually as a substitute.

---

## 10. Anti-Patterns — Auto-Reject in Review

Treat any of the following, found in a diff, as a blocking issue — fix it before presenting the work as complete:

- [ ] Raw `fetch`/`axios` call inside a `.tsx` component, in any module
- [ ] Hardcoded copy, hex colors, or mock arrays inside a component file
- [ ] A new `constants/` folder created anywhere in the tree (see Section 4 for where data actually goes)
- [ ] `any` (or `as any`) used to silence a type error instead of fixing the type
- [ ] One component doing data-fetching + business logic + rendering (SRP violation)
- [ ] Global state used for something only one module needs
- [ ] Untyped or unvalidated API responses trusted at face value
- [ ] Unthrottled scroll/resize/input handlers
- [ ] Raw `<img>` with no `loading="lazy"`, no dimensions, and no responsive sizing for content images
- [ ] Missing loading/error states on an async boundary
- [ ] Silent `catch {}` blocks
- [ ] A new abstraction/wrapper built for a single use case with no second consumer in sight
- [ ] One module importing another module's internals instead of its `index.ts` barrel
- [ ] Code promoted to `shared/` before a second module actually needs it
- [ ] Commented-out code left in a file instead of relying on Git history (dead code)
- [ ] Duplicated carousel/resize/UI-control logic across components instead of a shared primitive
- [ ] Heavy inline `style={{ ... }}` usage where a Tailwind arbitrary-value class would do
- [ ] A module shipped without `i18n/en.json` or without namespaced translation keys
- [ ] Direct commits to `main`, `dev`, or a `module/*` branch, or a feature branch opened off the wrong base

---

## 11. Pre-Submit Checklist (run this on every diff)

**Code & Architecture**

- [ ] No raw HTTP calls outside `shared/services/http.service.ts` and module `*.service.ts` files
- [ ] No mock/static data inside components, and no new `constants/` folder introduced
- [ ] No hardcoded UI copy — resolved via i18n, namespaced by module
- [ ] No `any` types
- [ ] Named exports used everywhere
- [ ] Loading + error states present on async boundaries (`Suspense` + `ErrorBoundary`)
- [ ] High-frequency events debounced/throttled
- [ ] State placed at the lowest necessary scope
- [ ] No cross-module imports outside a module's `index.ts` barrel
- [ ] Nothing promoted to `shared/` without a genuine second consumer

**Quality & Compliance**

- [ ] Tests cover new behavior, especially critical paths
- [ ] Accessibility basics respected (labels, alt text, keyboard nav)
- [ ] No secrets or internal URLs in client-exposed env vars

**Git & Process**

- [ ] Feature branch named `feature/<module>/<description>`, opened off the correct `module/<name>` branch
- [ ] Commit messages scoped with Conventional Commits
- [ ] PR targets the correct branch in the flow (`feature → module → dev → main`)

---

## 12. Adding a New Module (Quick Reference)

1. Confirm the domain genuinely needs its own module (YAGNI check).
2. Copy the module skeleton into `src/modules/<new-module>/`.
3. Create `module/<new-module>` branch off `dev`; add branch protection + CODEOWNERS entry.
4. Add `i18n/en.json` with namespaced keys; register in the `src/i18n/` loader.
5. Wire the module's service to `shared/services/http.service.ts`; add its routes to `config/api-routes.ts`.
6. Add a lazy-loaded route in `router/routes.tsx` that only imports the module's page component.
7. Write the module's `README.md`.
8. Open `feature/<new-module>/bootstrap`, get it reviewed against the module-bootstrap checklist (Section 2).
