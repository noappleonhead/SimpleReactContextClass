import React from "react";
import "./styles.css";

export default function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
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

const ThemeContext = React.createContext(themes.light);

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          style={{ background: theme.background, color: theme.foreground }}
        >
          I am styled by theme context!
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
