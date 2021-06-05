import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import { createGenerateClassName, jssPreset, StylesProvider } from "@material-ui/core/styles";
import customTheme from "./theme";



const AppTheme = ({ direction, language, children }) => {
  // Configure JSS
  const plugins = [...jssPreset().plugins];
  const languageStyles = {};
  if (language !== "en") {
    // languageStyles = import('@material-ui/core/locale')
    
  }
  const jss = create({ plugins: [...plugins] });
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme(
    {
      ...customTheme,
      direction,
    },
    languageStyles
  );

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default AppTheme;
