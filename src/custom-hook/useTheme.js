import React from "react";

export default function useTheme(defaultThemeName) {
  const [themeName, setTheme] = React.useState(defaultThemeName);

  function switchTheme(name) {
    setTheme(themeName === "darkTheme" ? "lightTheme" : "darkTheme");
  }

  return [themeName, switchTheme];
}
