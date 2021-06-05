import React from "react";
import { connect } from "react-redux";
import { AppBar, Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { LandingWrapper } from "../components/landing/wrapper";
import useStyles from "../styles/landingPage";

const LandingPage = props => {
  const classes = useStyles();
  const history = useRouter();

  return (
  <Grid container style={{height: '100vh'}}>
        <AppBar
          position="fixed"
          elevation={1}
          style={{
            background: "white",
          }}
        >
          <Toolbar>
            <div className={classes.menuButton}>
              <img src="./assets/others/phizLogo.svg" alt="" height="50px" />
            </div>
            <div className={classes.title}></div>

            <Button
              className={classes.LandingSiginBtn}
              onClick={() => history.push("/login")}
              color="inherit"
            >
              Sign In
            </Button>
            <Button
              className={classes.LandingSiginBtn}
              onClick={() => history.push("/register")}
              color="inherit"
            >
              Sign up
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container justify="center" alignItems="flex-end"
        >
          <Button
            className={classes.getStartedButton}
            onClick={() => history.push("/login")}
            color="inherit"
          >
            GET STARTED
          </Button>
        </Grid>
      </Grid>
  );
};

export default LandingPage;
