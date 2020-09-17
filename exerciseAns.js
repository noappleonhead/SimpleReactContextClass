import React, { useReducer, useContext, useState } from "react";
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
    case "CHANGE_THEME":
      return { ...state, ...themes.light };
    case "CHANGE_TOGGLE":
      const { color } = action;
      return { ...state, ...themes[color] };
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

  
  const colors = ["dark", "light"];
  const [color, setColor] = React.useState(colors[0]);

  return (
    <button
      onClick={() => {
        const newColor = color === colors[0] ? colors[1] : colors[0];
        dispatch({
          type: "CHANGE_TOGGLE",
          color: newColor
        });
        setColor(newColor);
      }}
      style={{ background: theme.background, color: theme.foreground }}
    >
      I am styled by theme context!
    </button>
  );
}
