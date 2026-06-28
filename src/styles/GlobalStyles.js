import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Светлая тема (по умолчанию) */
  :root {
    --white: #ffffff;
    --bg: #f0f4f9;
    --header-bg: #ffffff;
    --card-bg: #ffffff;
    --border: #d0dbe8;
    --text-primary: black;
    --text-secondary: #94a6be;
    --text-muted: #94a6be;
    --accent: #565eef;
    --accent-hover: #3a5ce6;
    --orange: #f0603a;
    --orange-bg: #fff4f2;
    --green: #05a081;
    --green-bg: #f0fbf8;
    --purple: #7b61ff;
    --purple-bg: #f3f0ff;
    --shadow: 0 2px 16px rgba(74, 108, 247, 0.08);
    --shadow-card: 0 1px 6px rgba(30, 42, 59, 0.07);
    --radius: 10px;
    --radius-sm: 4px;
  }

  /* 🔥 Тёмная тема */
  body.dark-theme {
    --bg: #1a1a2e;
    --header-bg: #16213e;
    --card-bg: #1e2a4a;
    --border: #2d3a5e;
    --text-primary: #ffffff;
    --text-secondary: #ffffff;
    --text-muted: #7a8aae;
    --shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    --shadow-card: 0 1px 6px rgba(0, 0, 0, 0.3);
    --white: #1a1a2e;
    --orange-bg: #2d1a1a;
    --green-bg: #1a2d2a;
    --purple-bg: #1a1a3d;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Roboto", sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
  }
`;