/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "var(--td-primary)",
      },
      background: {
        DEFAULT: "var(--td-background)",
      },
      info: {
        DEFAULT: "var(--td-info)",
      },
      border: {
        DEFAULT: "var(--td-border)",
      },
      placeholder: {
        DEFAULT: "var(--td-placeholder)",
      },
      hover: {
        DEFAULT: "var(--td-hover)",
      },
      secondary: {
        DEFAULT: "var(--td-secondary)",
      },
      text: {
        primary: "var(--td-text-primary)", // Dark gray
        secondary: "var(--td-text-secondary)", // Medium gray
        muted: "var(--td-text-muted)", // Light gray
      },
      success: {
        DEFAULT: "var(--td-success)",
      },
      warning: {
        DEFAULT: "var(--td-warning)",
      },
      danger: {
        DEFAULT: "var(--td-danger)",
      },
      light: {
        DEFAULT: "var(--td-light)",
      },
      dark: {
        DEFAULT: "var(--td-dark)",
      },
      muted: {
        DEFAULT: "var(--td-muted)",
      },
      transparent: "transparent",
    },
    fontFamily: {
      title: "var(--title-font)",
      body: "var(--body-font)",
    },
  },
  plugins: [],
};
