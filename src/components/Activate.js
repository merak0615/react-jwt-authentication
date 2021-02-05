import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../assets/components/ActivateStyle";

import { Icon, Typography, Grid } from "@material-ui/core";

import { activation } from "../actions/email";

const Activate = (props) => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(activation(props.match.params.token))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }, []);

    return (
        <div className={classes.pageHeader}>
            <Grid container justify="center">
                <Grid item xs={12} sm={6} md={4} elevation={6} square="true" className={classes.paper}>
                    {successful && (
                        <div>
                            <Icon className={`${classes.icon} ${classes.success}`}>{"check_circle_outline"}</Icon>
                            <Typography variant="h4">Email Verified</Typography>
                        </div>
                    )}
                    {!successful && (
                        <div>
                            <Icon className={`${classes.icon} ${classes.danger}`}>{"error_outline"}</Icon>
                            <Typography variant="h4">Error</Typography>
                        </div>
                    )}
                    <Typography variant="h5">{message}</Typography>
                </Grid>
            </Grid>
        </div>

    );
};

export default Activate;
