# AGENTS.md

React + TypeScript + Vite component sketchbook. Components live in `src/` and are exercised through Storybook stories in `src/stories/`.

## Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint` (oxlint — fast, no type info by default)
- Typecheck + build: `pnpm build` (runs `tsc -b && vite build`)
- Storybook: `pnpm storybook` (port 6006)
- Storybook build: `pnpm build-storybook`

There is no `test` script. Tests run through Storybook + Vitest (see below).

## Testing

- Component tests are Storybook stories (`*.stories.ts/tsx`) run via the `@storybook/addon-vitest` plugin.
- Tests run in a headless Chromium browser via Playwright (`@vitest/browser-playwright`). No Node-only test runner is configured.
- The Storybook dev server must be running for the `storybook` MCP server (`opencode.json` → `http://localhost:6006/mcp`) to answer component-docs questions.

## Toolchain quirks

- React Compiler is enabled: `@vitejs/plugin-react` + `babel-plugin-react-compiler` (see `vite.config.ts`). Respect rules-of-hooks and component-only export rules — lint enforces `react/rules-of-hooks` as error and `react/only-export-components` as warn.
- Linting uses oxlint, not ESLint. Config is `.oxlintrc.json` (plugins: react, typescript, oxc). It is NOT type-aware by default; enable `oxlint-tsgolint` + `typeAware` for type-aware rules.
- TypeScript built via project references: `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`. `tsc -b` builds both.
- Package manager is pnpm (lockfile `pnpm-lock.yaml`).

## Conventions

- Storybook addons include a11y (`test: 'todo'`, non-failing) and the MCP addon. Keep a11y check as `todo`/`off` unless intended to fail CI.
- New components typically get a `.stories.ts` file under `src/stories/` so they are covered by the Vitest/Storybook test run.

## UI Components

When working on UI components, always use the `storybook` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from a design system (including common-sounding ones like `shadow`, etc.), you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all components
- Query `get-documentation` for that component to see all available properties and examples
- Only use properties that are explicitly documented or shown in example stories
- If a property isn't documented, do not assume properties based on naming conventions or common patterns from other libraries. Check back with the user in these cases.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories. This will ensure you follow current conventions and recommendations.
- Check your work by running `run-story-tests`.

Remember: A story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.