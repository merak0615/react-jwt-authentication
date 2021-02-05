import React, { useState, useEffect } from "react";
import useStyles from "../assets/components/BoardStyle";

import { Typography, Grid } from "@material-ui/core";

import UserService from "../services/user.service";

const BoardUser = () => {
    const [content, setContent] = useState("");
    const classes = useStyles();

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className={classes.pageHeader}>
            <Grid container justify="flex-end" >
                <Grid item xs={12} sm={6} md={5} elevation={6} square="true" style={{position:"relative"}}>
                    <div className={classes.paper}>
                        <Typography variant="h4">{content}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default BoardUser;
