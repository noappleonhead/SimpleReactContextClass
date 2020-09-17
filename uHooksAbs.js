import React, { useContext } from "react";
import "./styles.css";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

export default function App() {
  return <Toolbar />;
}

const ThemeContext = React.createContext(themes.light);

function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={themes.dark}>
      {children}
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
