import { withThemeByClassName } from '@storybook/addon-themes'
import { css } from '../styled-system/css'
import type { Preview } from '@storybook/react-vite'
import InputManager from "../src/components/InputManager/InputManager"
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: 'fullscreen',

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <div className={css({ bg: 'gray.1', p: 4, position: "absolute", inset: 0, })}>
        <Story />
        <InputManager />
      </div>
    ),
  ],
};

export default preview;