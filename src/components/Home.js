import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useStyles from "../assets/components/HomeStyle";

import { Grid, Typography } from "@material-ui/core";

import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);

    const classes = useStyles();

    useEffect(() => {
        UserService.getPublicContent().then(
            (response)=> {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    },[]);

    return (
        <div className={`${classes.pageHeader} ${currentUser ? `${classes.image_night}`: `${classes.image_lake}` }`}>
            <Grid container justify="flex-end" >
                <Grid item xs={12} sm={6} md={5} elevation={6} square="true" className={classes.paper}>
                    <Typography variant="h3">
                        Welcome to our site
                    </Typography>
                    <Typography component="h1" variant="h4" gutterBottom className={classes.subtitle}>
                        Spring Boot and React JS with Spring Security using JWT authentication
                    </Typography>
                    <Typography className={classes.body}>
                        setting up Spring Security with Basic and JWT authentication with a full-stack application using React Js as Frontend framework and Spring Boot as the backend REST API.
                    </Typography>
                </Grid>
            </Grid>
        </div>


    );
};

export default Home;