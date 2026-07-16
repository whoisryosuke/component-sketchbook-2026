import { defineConfig } from "@pandacss/dev";
import preset from "@whoisryosuke/oat-milk-styled-system/preset";

export default defineConfig({
  presets: [preset],
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
    "./pages/**/*.{ts,tsx,js,jsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // importMap: "@whoisryosuke/oat-milk-styled-system",

  // The output directory for your css system
  outdir: "styled-system",
  // Generates JSX utilities for React
  jsxFramework: "react",

  staticCss: {
    css: [
      {
        properties: {
          colorPalette: [
            "tomato",
            "red",
            "crimson",
            "pink",
            "plum",
            "purple",
            "violet",
            "indigo",
            "blue",
            "cyan",
            "teal",
            "green",
            "grass",
            "orange",
            "brown",
            "sky",
            "mint",
            "lime",
            "yellow",
            "amber",
            "gray",
            "mauve",
            "slate",
            "sage",
            "olive",
            "sand",
            "bronze",
            "gold",
            "ruby",
            "iris",
            "jade",
          ],
        },
      },
    ],
  },
});
