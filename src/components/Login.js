import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../assets/components/LoginStyle";
import { Redirect, Link } from 'react-router-dom';

import {
    TextField,
    Paper,
    CircularProgress,
    Grid,
    Typography,
    Avatar,
    Button,
    Icon,
    SnackbarContent,
    Collapse,
    IconButton
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { login } from "../actions/auth";
import CloseIcon from "@material-ui/icons/Close";
import {clearMessage} from "../actions/message";

const Login = (props) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState( {
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
    const classes = useStyles();


    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required.";
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required.";

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

    const  handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        setOpen(true);

        if (validate()) {
            dispatch(login(values.email, values.password))
                .then(() => {
                    props.history.push("/profile");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={6} md={8} className={classes.image} />
            <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={values.password}
                            onChange={onChangeInput}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...(errors.password && {error:true,helperText:errors.password})}
                        />
                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            {loading && (
                                <CircularProgress size={24} className={classes.buttonProgress} />
                            )}
                        </div>

                        {message && (
                            <Collapse in={open}>
                                <SnackbarContent
                                    //className={`${classes.snackbar} ${classes.danger}`}
                                    message={
                                        <div>
                                            <Icon className={classes.icon}>{"error_outline"}</Icon>
                                            <span>
                                                <b>ERROR:</b> {message}
                                            </span>
                                            <IconButton
                                                className={classes.iconButton}
                                                key="close"
                                                aria-label="Close"
                                                color="inherit"
                                                onClick={() => {setOpen(false);
                                                                dispatch(clearMessage());}}
                                            >
                                                <CloseIcon className={classes.close}/>
                                            </IconButton>
                                        </div>
                                    }
                                    classes={{
                                        root: classes.snackbar + " " + classes.danger,
                                        message: classes.message
                                    }}
                                />
                            </Collapse>
                        )}
                        <Grid container>
                            <Grid item xs>
                                <Link to={"/forgot"} variant="body2" className={classes.link}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={"/register"} variant="body2" className={classes.link}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;