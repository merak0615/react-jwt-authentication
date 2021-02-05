import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";
import useStyles from "../assets/components/ResetPasswordStyle";

import { Avatar, Button, Grid, Icon, Paper, TextField, Typography, SnackbarContent } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Check from "@material-ui/icons/Check";

import { emailSending } from "../actions/email";

const ForgotPassword = () => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState( {
        email: '',
    });
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ('email' in fieldValues) {
            if (!fieldValues.email) {
                temp.email = "This field is required.";
            } else {
                temp.email = !isEmail(fieldValues.email) ? "This is not a valid email." : "";
            }
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");

    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });

        validate({ [name]: value });
    };

    const  resetPassword = (e) => {
        e.preventDefault();

        setSuccessful(false);

        if (validate()) {
            dispatch(emailSending(values.email))
                .then(() => {
                    setSuccessful(true);
                    setValues({
                        email: ''
                    });
                })
                .catch(() => {
                    setSuccessful(false);

                });
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={6} md={8} className={classes.image} />
            <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Your Password ?
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={resetPassword}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={onChangeInput}
                            autoComplete="email"
                            autoFocus
                            {...(errors.email && {error:true,helperText:errors.email})}

                        />

                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Send
                            </Button>
                        </div>

                        {message && (
                            <div>
                                <SnackbarContent className={`${classes.snackbar} ${successful ? `${classes.success}` : `${classes.danger}`}`}
                                                 message={
                                                     <div className={classes.message}>
                                                         {successful ? <Check className={classes.icon}/> :
                                                             <Icon className={classes.icon}>{"info_outline"}</Icon>}
                                                         <span>
                                                <b>{successful ? "CONGRATULATIONS:" : "ERROR:"}</b> {message}
                                            </span>
                                                     </div>
                                                 }
                                />
                            </div>
                        )}

                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;