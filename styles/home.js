import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  roomHeading: {
    marginBottom: "20px",
  },
  arrowLeftButton: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateX(-50%)",
    borderRadius: "50%",
    height: "47px",
    width: "47px",
    boxShadow: "0 0 0 10px #262839",
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box",
    color: "#fff",
    "&:hover": {
      background: theme.custom.black100,
      border: "3px solid #ff8300",
    },
  },
  arrowRightButton: {
    position: "absolute",
    right: "-48px",
    transform: "translateX(-50%)",
    top: "50%",
    borderRadius: "50%",
    height: "47px",
    width: "47px",
    boxShadow: "0 0 0 10px #262839",
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box",
    color: "#fff",
    "&:hover": {
      background: theme.custom.black100,
      border: "3px solid #ff8300",
    },
  },
  arrowIcon: {
    fontSize: "32px",
    color: "#fff",
  },
  roomCardsMedia: {
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
  roomDesc: {
    fontSize: "11px",
    fontWeight: 400,
  },
  leftDivider: {
    width: "34%",
    marginBottom: "-14px",
    background: "#4e5165",
    height: "2px",
    [theme.breakpoints.between("xs", "md")]: {
      width: "30%",
    },
  },
  rightDivider: {
    width: "34%",
    float: "right",
    marginTop: "-14px",
    background: "#4e5165",
    height: "2px",
    [theme.breakpoints.between("xs", "md")]: {
      width: "30%",
    },
  },
  subHeading:{
    margin:"40px 0px",
  },
  mediaIcons: {
    position: "absolute",
    top: "272px",
    left: 0,
    padding: "0px 7px",
    zIndex: 11,
  },
  promotedMediaIcons: {
    position: "absolute",
    top: "200px",
    left: 0,
    padding: "0px 7px",
    zIndex: 11,
  },
  videoIcons: {
    color: "#fff",
  },
  hoverSection: {
    position: "absolute",
    bottom: "81px",
    left: 0,
    right: 0,
    top: "300px",
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
    minWidth:"130px",
    "&:hover": {
      background: theme.custom.black100,
      borderColor: theme.custom.black100,
      color:"#fff"
    },
  },
  promotionImg: {
    boxShadow: "0px 0px 10px rgb(0 0 0 / 20%)",
    borderRadius: "26px",
    margin: "10px",
  },
  ownCard: {
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "31px",
    overflow: "visible",
    textAlign: "center",
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box",
    position: "relative",
  },
  promoteButton: {
    position: "absolute",
    bottom: "-23px",
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: "0 0 0 10px #262839",
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box",
    color: "#fff",
    borderRadius: "50px",
    padding: "13px 18px",
    "&:hover": {
      padding: "10px 15px",
      background: theme.custom.black100,
      border: "3px solid #ff8300",
      boxShadow: "0 0 0 10px #262839",
    },
  },
  cardsListing: {
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "31px",
    overflow: "hidden",
    margin: "70px 10px 10px 10px",
    backgroundColor: theme.palette.secondary.main,
  },
  cardHeader: {
    textAlign: "center",
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box;",
  },
  cardHeaderTitle: {
    color: "#fff",
    fontWeight: 400,
  },
  trendingRoomSmCards: {
    backgroundColor: theme.custom.black100,
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "17px",
    display: "flex",
    alignItems: "center",
    border: "3px solid transparent",
    "&:hover": {
      border: "3px solid gray",
      cursor: "pointer",
    },
  },
  trendingRoomImg: {
    height: "40px",
    width: "40px",
    borderRadius: "13px",
    marginRight: "15px",
  },
  roomName: {
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  trendingRoomName: {
    color: theme.palette.primary.main,
    textTransform: "uppercase",
  },
  promotedCards: {
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
      "& $promotedCardContent": {
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
            "& $roomCardsMedia":{
              transform: "scale(1.5)",
              "-webkit-transition": "all 1s ease",
              "-moz-transition": "all 1s ease",
              "-o-transition": "all 1s ease",
              "-ms-transition": "all 1s ease",
              transition: "all 1s ease",
            }
    },
  },
  mediaOverlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    background: "-moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.45) 81%, rgba(0,0,0,0.65) 100%)",
    background: "-webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,0.45) 81%,rgba(0,0,0,0.65) 100%)",
    background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,0.45) 81%,rgba(0,0,0,0.65) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 )"
    
  },
  promotedCardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 11,
    background:
      "transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box;",
  },
}));

export default useStyles;
