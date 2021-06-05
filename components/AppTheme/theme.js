const primaryColor = "#FF8300";
const secondaryColor = "#2c2f44";
const infoColor = "#FFBC00";
const successColor = "#54B948";
const dangerColor = "#FF0000";
const warningColor = "##FF8367";
const yellowColor = "#ffa000";
const black100 = "#262839";
const black86 = "#4e5165";
const black60 = "#858585";
const black36 = "#B5B5B5";
const black16 = "#DEDEDE";
const black4 = "#F7F7F7";
const inheritColor = "#FFFFFF";

const theme = {
  palette: {
    background: {
      default: secondaryColor,
    },
    primary: {
      // light: primaryColor[300],
      main: primaryColor,
      // dark: primaryColor[700],
    },
    secondary: {
      main: secondaryColor,
    },
    inherit: {
      main: inheritColor,
    },
    // error: will use the default color
    action: {
      // hover: "#f44336",
    },
  },
  typography: {
    h1: {
      color: black86,
      textAlign: "center",
    },
    h2: {
      color: primaryColor,
      textAlign: "center",
      fontSize: "32px",
      fontWeight: 700,
      letterSpacing: "0px",
    },
    h3: {
      color: primaryColor,
      textAlign: "center",
      fontSize: "23px",
      fontWeight: 400,
    },
    h4: {
      color: black86,
      textAlign: "center",
    },
    h5: {
      color: black86,
      textAlign: "center",
      fontWeight: 700,
    },
    h6: {
      color: primaryColor,
      fontSize: "16px",
      fontWeight: 700,
    },
    body1: {
      color: black86,
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: 600,
    },
  },
  overrides: {
    link: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: 15,
      color: black60,
      margin: "0 15px",
      textDecoration: "none",
      "&:hover": {
        color: primaryColor,
        fontWeight: 500,
      },
    },
    linkActive: {
      fontWeight: 500,
      color: primaryColor,
    },
  },
  MuiPaper: {
    rounded: {
      borderRadius: 16,
    },
  },
  MuiButton: {
    root: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 14,
      padding: "2px 8px",
    },
    textSizeLarge: {
      fontSize: 16,
      fontWeight: 500,
    },
    textSizeSmall: {
      fontWeight: 500,
    },
    contained: {
      boxShadow: "none",
      borderRadius: 30,
      padding: "10px 16px",
    },
    outlined: {
      boxShadow: "none",
      borderRadius: 30,
      padding: "10px 16px",
    },
    containedSecondary: {
      borderRadius: 4,
      padding: "10px 16px",
    },
    outlinedSizeLarge: {
      fontSize: 18,
      fontWeight: 500,
      padding: "13px 22px",
    },
    outlinedSizeSmall: {
      fontSize: 14,
    },
    containedSizeLarge: {
      fontSize: 18,
      fontWeight: 500,
      padding: "13px 22px",
    },
    containedSizeSmall: {
      fontSize: 14,
    },
  },
  MuiContainer: {
    maxWidthLg: {
      padding: 0,
    },
  },
  MuiPaper: {
    root: {
      backgroundColor: "transparent",
    },
  },
  MuiListItemIcon: {
    root: {
      minWidth: "30px",
    },
  },
  custom: {
    primaryColor,
    infoColor,
    successColor,
    dangerColor,
    warningColor,
    black100,
    black86,
    black60,
    black36,
    black16,
    black4,
    yellowColor,
  },
};

export default theme;
