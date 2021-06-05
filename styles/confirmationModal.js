import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: "center",
    padding: "40px 60px !important"
  },
  actionButtons: {
    justifyContent: "space-around",
    padding: "18px 40px",
  },
  okButton: {
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box",
    color: "#fff",
    borderRadius: "30px",
    minWidth: "130px",
  },
  cancelButton: {
    color: "#fff",
    borderRadius: "30px",
    minWidth: "130px",
    border: "2px solid #FF8300",
    "&:hover": {
    border: "2px solid #FF8300",
    }
  },
  divider: {
    width: "90%",
    height: "2px",
    margin: "0 auto",
  },
}));
export default useStyles;
