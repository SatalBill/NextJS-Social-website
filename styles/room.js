import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  roomHeading: {
    marginTop: "5px",
    marginBottom: "20px",
  },
  myRoomCard: {
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "31px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
    margin: "10px",
    "-webkit-transition": "all 1s ease",
    "-moz-transition": "all 1s ease",
    "-o-transition": "all 1s ease",
    "-ms-transition": "all 1s ease",
    transition: "all 1s ease",
    "&:hover": {
      cursor: "pointer",
      "& $myRoomCardContent": {
        background: "transparent",
      },
      "& $hoverSection": {
        opacity: 1,
        top: "-100px",
        bottom: 0,
        "-webkit-transition": "all 1s ease",
        "-moz-transition": "all 1s ease",
        "-o-transition": "all 1s ease",
        "-ms-transition": "all 1s ease",
        transition: "all 1s ease",
      },
      "& $myRoomCardMedia": {
        transform: "scale(1.5)",
        "-webkit-transition": "all 1s ease",
        "-moz-transition": "all 1s ease",
        "-o-transition": "all 1s ease",
        "-ms-transition": "all 1s ease",
        transition: "all 1s ease",
      },
    },
  },
  myRoomCardMedia: {
    height: "300px",
    position: "relative",
    borderTopLeftRadius: "31px",
    borderTopRightRadius: "31px",
    "-webkit-transition": "all 1s ease",
    "-moz-transition": "all 1s ease",
    "-o-transition": "all 1s ease",
    "-ms-transition": "all 1s ease",
    transition: "all 1s ease",
  },
  myRoomMediaIcons: {
    position: "absolute",
    top: "200px",
    left: 0,
    padding: "0px 7px",
    zIndex: 11,
  },
  videoIcons: {
    color: "#fff",
  },
  myRoomCardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 11,
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box;",
  },
  roomName: {
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  roomDesc: {
    fontSize: "11px",
    fontWeight: 400,
  },
  hoverSection: {
    position: "absolute",
    bottom: "81px",
    left: 0,
    right: 0,
    top: "100px",
    background: "rgb(248,137,1,0.8)",
    background:
      "-moz-linear-gradient(left,  rgba(248,137,1,0.8) 0%, rgba(247,57,1,0.8) 100%)",
    background:
      "-webkit-linear-gradient(left,  rgba(248,137,1,0.8) 0%,rgba(247,57,1,0.8) 100%)",
    background:
      "linear-gradient(to right,  rgba(248,137,1,0.8) 0%,rgba(247,57,1,0.8) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f88901', endColorstr='#f73901',GradientType=1 )",

    zIndex: 10,
    opacity: 0,
    "-webkit-transition": "all 1s ease",
    "-moz-transition": "all 1s ease",
    "-o-transition": "all 1s ease",
    "-ms-transition": "all 1s ease",
    transition: "all 1s ease",
  },
  visitRoomButton: {
    position: "absolute",
    top: "62%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    fontSize: "12px",
    color: "#fff",
    borderRadius: "50px",
    background: "transparent",
    border: "1px solid #fff",
    minWidth: "130px",
    "&:hover": {
      background: theme.custom.black100,
      borderColor: theme.custom.black100,
      color: "#fff",
    },
  },
  createRoomCard: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 3px 6px #00000029",
    minHeight: "300px",
    borderRadius: "31px",
    margin: "10px",
    cursor: "pointer",
    "&:hover": {
      border: "5px solid #ff8300",
      "& $addCircle": {
        backgroundColor: theme.palette.primary.main,
        transform: "scale(1.02)",
      },
    },
  },
  addCircle: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    backgroundColor: "#393E5D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 3px 6px #00000029",
  },
  mediaOverlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    background:
      "-moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.45) 81%, rgba(0,0,0,0.65) 100%)",
    background:
      "-webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,0.45) 81%,rgba(0,0,0,0.65) 100%)",
    background:
      "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,0.45) 81%,rgba(0,0,0,0.65) 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 )",
  },
  createModal: {
    background: theme.palette.secondary.main,
    borderRadius: "31px",
  },
  createModalHeader: {
    textAlign: "center",
  },
  inputFields: {
    borderRadius: "28px",
    backgroundColor: theme.custom.black100,
    color: theme.custom.black86,
    width: "100%",
    padding: "9px 12px"
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
  },
  divider: {
    width: "90%",
    height: "2px",
    margin: "0 auto",
  },
  actionButtons: {
    justifyContent: "space-around",
    padding: "18px 40px",
  },
  selectedFriend: {
    color:theme.custom.black86
  },
  uploadDragableUpload: {
    width: "100%",
    height: "200px",
  },
  uploadPlaceholderCt: {
    width: "100%",
    height: "200px",
    borderRadius: "31px",
    backgroundColor: theme.custom.black100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    marginTop: "16px",
    cursor: "pointer",
    overflow:"hidden",
    "&:focus": {
      outline: "none",
    },
  },
  moreIcon: {
    position: "absolute",
    top: "1px",
    right: "2px",
    zIndex: 11,
  },
  moreOption: {
    padding: "11px 40px",
    justifyContent: "center",
    border: "2px solid #262839",
    borderRadius: "10px",
    margin: "7px",
    color: "#656983",
    "&:nth-child(3)": {
      borderBottom: "2px solid #262839 !important",
    },
  },

  menuList: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "25px",
    padding: "10px",
    position: "relative",
    // transform: "translate3d(152px, -246px, 0px) !important",                                                    
    "&::after": {
      left: "50%",
      border: "solid transparent",
      content: '""',
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderColor: "rgba(44, 47, 68, 0)",
      borderBottomColor: "#2C2F44",
      borderWidth: "30px",
      marginLeft: "-30px",
      top: "-44px",
    },
  },
  uploadImg:{
    width: "100%",
    objectFit: "cover",
    height: "100%"
  },
  selectInput:{
    borderRadius: "28px",
    backgroundColor: theme.custom.black100,
    color: theme.custom.black86,
    width: "100%",
    paddingLeft: "15px",
  },
  errorText:{
    fontSize:"10px",
    color:theme.palette.primary.main
    },
}));

export default useStyles;
