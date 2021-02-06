import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link as RouterLink} from "react-router-dom";

import { CssBaseline, AppBar, Toolbar, Link, Button } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';

import darkTheme from "./assets/darkTheme";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Activate from "./components/Activate";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import useStyles from "./assets/components/AppStyle";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  },[dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  },[currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router history={history}>
          <div>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarNav}>
                  <Link variant="button" to={"/"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                    JWT Authentication
                  </Link>
                  <Link variant="button" to={"/home"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                    Home
                  </Link>

                  {showModeratorBoard && (
                    <Link variant="button" to={"/mod"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                      Moderator Board
                    </Link>
                  )}

                  {showAdminBoard && (
                    <Link variant="button" to={"/admin"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                      Admin Board
                    </Link>
                  )}

                  {currentUser && (
                    <Link variant="button" to={"/user"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                      User
                    </Link>
                  )}
                </div>

                {currentUser ? (
                  <div className={classes.toolbarNav}>
                    <Link variant="button" to={"/profile"} component={RouterLink} color="textPrimary" className={classes.toolbarLink}>
                      {currentUser.firstName}
                    </Link>
                    <Button
                        variant="outlined"
                        href="/login"
                        color="primary"
                        className={classes.outlineLink}
                        onClick={logOut}>
                      LogOut
                    </Button>
                  </div>
                ) : (
                  <div className={classes.toolbarNav}>
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={"/login"}
                        color="primary"
                        className={classes.outlineLink}>
                      Login
                    </Button>

                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={"/register"}
                        color="primary"
                        className={classes.outlineLink}>
                      Sign Up
                    </Button>

                  </div>
                )}
              </Toolbar>
            </AppBar>
            <div>
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route path="/activation/:token" component={Activate} />
                <Route path="/reset" component={ForgotPassword} />
                <Route path="/update/:token" component={UpdatePassword} />
              </Switch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
  );
};

export default App;
