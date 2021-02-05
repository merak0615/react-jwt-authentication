import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import useStyles from "../assets/components/ProfileStyle";

import { Grid, Typography } from "@material-ui/core";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const classes = useStyles();

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className={classes.pageHeader} >
            <Grid container justify="flex-end" >
                <Grid item xs={12} sm={6} md={5} elevation={6} square="true" style={{position:"relative"}}>
                    <div className={classes.paper}>
                        <div className={classes.info}>
                            <Typography variant="h4">Profile</Typography>
                            <p>
                                <strong>Firstname:</strong> {currentUser.firstName}
                            </p>
                            <p>
                                <strong>LastName:</strong> {currentUser.lastName}
                            </p>
                            <p>
                                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </p>
                            <p>
                                <strong>Id:</strong> {currentUser.id}
                            </p>
                            <p>
                                <strong>Email:</strong> {currentUser.email}
                            </p>
                            <strong>Authorities:</strong>
                            <ul>
                                {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                            </ul>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;