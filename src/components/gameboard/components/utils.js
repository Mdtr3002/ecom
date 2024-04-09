import { path } from "ramda";

export function getFromTheme(themePath = "") {
  return function getFromThemeProps(props = {}) {
    return path(themePath.split("."), props.theme);
  };
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
