import React, { useReducer, useContext } from "react";
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

function reducer(state, action) {
  console.log("reducer", state, action);
  switch (action.type) {
    case "CHANGE_LIGHT":
      return { ...state, ...themes.light };
    default:
      return state;
  }
}

function ThemeProvider({ children }) {
  const contextValue = useReducer(reducer, themes.dark);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
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
  const [theme, dispatch] = useTheme();
  return (
    <button
      onClick={() => dispatch({ type: "CHANGE_LIGHT" })}
      style={{ background: theme.background, color: theme.foreground }}
    >
      I am styled by theme context!
    </button>
  );
}
