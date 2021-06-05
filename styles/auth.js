import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainSection: {
    minHeight: "100vh",
  },
  signUpCard: {
    borderRadius: "21px"
  },
  root: {
    "& > *": {
      width: "100%",
      margin: "20px 0px",
    },
  },
  signUpBtn: {
    background:
      "transparent linear-gradient(112deg, #FF8300 0%, #FF3100 100%) 0% 0% no-repeat padding-box",
    borderRadius: "40px",
    width: "100%",
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  signUpText: {
    font: "normal normal bold 31px/40px Roboto",
    letterSpacing: "0px",
    color: "#262839 !important",
    opacity: 1,
  },
  signInBtnIcon: {
    background: "linear-gradient(210.1deg, #F11010 13.46%, #F15151 76.64%);",
    boxShadow: "0px 3px 6px rgba(255, 0, 0, 0.161)",
    width: "initial",
    height: "initial",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.09em",
    transform: "rotate(75deg)",
    padding: "1rem",
    color: "#FFFFFF",
    textTransform: "none",
  },
  forwardIcon: {
    transform: "rotate(-75deg)",
  },
  signupGrid: {
    maxHeight: "355px",
    overflowY: "scroll",
  },
  signInText: {
    color: "#707070",
  },
  signInText: {
    color: "#707070",
    textDecoration: "none",
    "&:hover": {
      color: "#707070",
    },
  },
  signUpTextWelcome: {
    font: "normal normal bold 31px/40px Roboto",
    letterSpacing: "0px",
    color: "#FF8300 !important",
    opacity: 1,
  },
}));

export default useStyles;
