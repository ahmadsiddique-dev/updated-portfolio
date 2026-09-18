// tailwind.config.js
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        Default: {
          css: {
            ul: {
              listStyleType: "none",
            },
            code: {
              "&::before": {
                content: '""',
              },
              "&::after": {
                content: '""',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};
