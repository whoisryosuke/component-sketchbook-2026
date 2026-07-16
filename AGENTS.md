# AGENTS.md

React + TypeScript + Vite component sketchbook. Components live in `src/` and are exercised through Storybook stories in `src/stories/`.

## Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint` (oxlint — fast, no type info by default)
- Typecheck + build: `pnpm build` (runs `tsc -b && vite build`)
- Storybook: `pnpm storybook` (port 6006)
- Storybook build: `pnpm build-storybook`

There is no `test` script. Tests run through Storybook + Vitest (see below).

## Compiler

- When importing types in TypeScript files, preface them with `type`, for example: `import { type Post } from 'library'`.


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

## Styling

When styling UI components, always use Panda CSS, and use the `panda` MCP tool to access the data like available design tokens or recipes.

Use the styling utilities available: 
- `css()` for one-off or inline styles.
- `cva()` for components that require variants.
- `sva()` for components that have several sub-components that need styling and coordinated with the same variants.

Import these relatively from the local `styled-system` folder (e.g. `import { sva } from '../styled-system/css'`).

## Available Tools

The `panda` MCP server exposes these tools to AI assistants:

| Tool                   | Description                                                         | Input                                     |
| ---------------------- | ------------------------------------------------------------------- | ----------------------------------------- |
| `get_tokens`           | Get design tokens with values, CSS variables, and usage examples    | `category?` - filter by token category    |
| `get_semantic_tokens`  | Get semantic tokens with conditional values (dark mode, responsive) | `category?` - filter by token category    |
| `get_color_palette`    | Get the complete color palette                                      | -                                         |
| `get_recipes`          | Get component recipes with variants and default values              | `name?` - filter by recipe name           |
| `get_patterns`         | Get layout patterns with properties and usage examples              | `name?` - filter by pattern name          |
| `get_conditions`       | Get all conditions (breakpoints, pseudo-classes, color modes)       | -                                         |
| `get_keyframes`        | Get keyframe animations defined in the theme                        | -                                         |
| `get_text_styles`      | Get text style compositions for typography                          | -                                         |
| `get_layer_styles`     | Get layer style compositions for visual styling                     | -                                         |
| `get_animation_styles` | Get animation style compositions                                    | -                                         |
| `get_config`           | Get the resolved Panda CSS configuration                            | -                                         |
| `get_usage_report`     | Analyze token/recipe usage across the codebase                      | `scope?` - `'all'`, `'token'`, `'recipe'` |

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