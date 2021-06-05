import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  LandingSiginBtn: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "3px solid #FF8300",
    color: "#FF8300",
    borderRadius: "27px",
    opacity: 1,
    paddingLeft: "20px",
    paddingRight: "20px",
    marginRight: theme.spacing(2),
  },
  getStartedButton: {
    background:
      "transparent linear-gradient(180deg, #FF8300 0%, #FF3100 100%) 0% 0% no-repeat padding-box",
    color: "#FFF",
    fontSize: "24px",
    borderRadius: "27px",
    opacity: 1,
    paddingLeft: "30px",
    paddingRight: "30px",
    marginRight: theme.spacing(2),
    marginBottom:"40px"
  },
}));

export default useStyles;
