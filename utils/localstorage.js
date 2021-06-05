import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
export const localstorage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }
  return null;
};

export const getLocalStorage = item => {
  if (localstorage()) {
    return localStorage.getItem(item);
  }
  return null;
};

export const setLocalStorage = (item, value) => {
  if (localstorage()) {
    localStorage.setItem(item, value);
  }
};

export const clearLocalStorage = item => {
  if (localstorage()) {
    localStorage.removeItem(item);
  }
};

export const getIsMobile = () => {
  let result = false;
  const theme = useTheme();
  const matchScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  if (matchScreen) {
    result = true;
  }
  return result;
};