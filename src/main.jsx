import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

const getTheme = () => {
  const isDark = localStorage.getItem("darkTheme") === "true";
  return isDark ? darkTheme : lightTheme;
};

createRoot(document.getElementById("root")).render(
  
  <ThemeProvider theme={getTheme()}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
);
