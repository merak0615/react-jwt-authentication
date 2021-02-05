import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmail } from "validator";
import useStyles from "../assets/components/RegisterStyle";

import { TextField, FormControlLabel, Checkbox, Paper, Grid, Typography, Avatar, Button, Icon ,SnackbarContent } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { register } from "../actions/auth";

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const initialFValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
    }
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialFValues);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('firstName' in fieldValues) {
            if (!fieldValues.firstName) {
                temp.firstName = "This field is required.";
            } else {
                temp.firstName = fieldValues.firstName.length < 3 || fieldValues.firstName.length > 20 ? "The firstName must be between 3 and 20 characters." : "";
            }
        }
        if ('lastName' in fieldValues) {
            if (!fieldValues.lastName) {
                temp.lastName = "This field is required.";
            } else {
                temp.lastName = fieldValues.lastName.length < 3 || fieldValues.lastName.length > 20 ? "The lastName must be between 3 and 20 characters." : "";
            }
        }
        if ('email' in fieldValues) {
            if (!fieldValues.email) {
                temp.email = "This field is required.";
            } else {
                temp.email = !isEmail(fieldValues.email) ? "This is not a valid email." : "";
            }
        }
        if ('password' in fieldValues) {
            if (!fieldValues.password) {
                temp.password = "This field is required.";
            } else {
                temp.password = fieldValues.password.length < 6 || fieldValues.password.length > 40 ? "The password must be between 6 and 40 characters." : "";
            }
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values)
             return Object.values(temp).every(x => x === "");

    };

    const onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };



    const handleRegister = (e) => {
       e.preventDefault();

       setSuccessful(false);

       if (validate()) {
            dispatch(register(values.firstName, values.lastName, values.email, values.password, values.allowExtraEmails))
                .then(() => {
                    setSuccessful(true);
                    setValues({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        allowExtraEmails: false,
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
                        <PersonOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleRegister} >
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={onChangeInput}
                                        autoComplete="fname"
                                        autoFocus
                                        {...(errors.firstName && {error:true,helperText:errors.firstName})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={onChangeInput}
                                        autoComplete="lname"
                                        {...(errors.lastName && {error:true,helperText:errors.lastName})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={values.email}
                                        onChange={onChangeInput}
                                        autoComplete="email"
                                        {...(errors.email && {error:true,helperText:errors.email})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={onChangeInput}
                                        type="password"
                                        autoComplete="current-password"
                                        {...(errors.password && {error:true,helperText:errors.password})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value={values.allowExtraEmails} name="allowExtraEmails" color="primary" onChange={onChangeInput}/>}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
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
                        {!successful && (
                            <div>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to={"/login"} variant="body2" className={classes.link}>
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Register;
