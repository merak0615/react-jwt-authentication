import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../assets/components/ResetPasswordStyle";

import {
    Avatar,
    Button,
    Grid,
    Icon,
    Paper,
    TextField,
    Typography,
    SnackbarContent,
    Collapse,
    IconButton
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { passwordReset } from "../actions/email";
import CloseIcon from "@material-ui/icons/Close";

const UpdatePassword = (props) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState( {
        password: '',
        password_confirm: '',
    });
    const [successful, setSuccessful] = useState(false);
    const [open, setOpen] = useState(true);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ('password' in fieldValues) {
            if (!fieldValues.password) {
                temp.password = "This field is required.";
            } else {
                temp.password = fieldValues.password.length < 6 || fieldValues.password.length > 40 ? "The password must be between 6 and 40 characters." : "";
            }
            if (values.password_confirm)
                temp.password_confirm = fieldValues.password !== values.password_confirm ? "The password do not match.Try again." : "";
        }
        if ('password_confirm' in fieldValues) {
            temp.password_confirm = fieldValues.password_confirm !== values.password ? "The password do not match.Try again." : "";

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
        setOpen(true);
        if (validate()) {
            dispatch(passwordReset(props.match.params.token, values.password))
                .then(() => {
                    setSuccessful(true);
                    setValues({
                        password: '',
                        password_confirm: '',
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
                        Reset Password
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={resetPassword}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="password"
                            value={values.password}
                            onChange={onChangeInput}
                            autoFocus
                            {...(errors.password && {error:true,helperText:errors.password})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password_confirm"
                            label="Password Confirm"
                            name="password_confirm"
                            value={values.password_confirm}
                            onChange={onChangeInput}
                            {...(errors.password_confirm && {error:true,helperText:errors.password_confirm})}
                        />

                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Reset
                            </Button>
                        </div>
                        {message && (
                            <Collapse in={open}>
                                <SnackbarContent
                                    className={`${classes.snackbar} ${successful ? `${classes.success}` : `${classes.danger}`}`}
                                    message={
                                        <div className={classes.message}>
                                            <Icon className={classes.icon}>{successful ? "task_alt" : "error_outline"}</Icon>
                                            <span>
                                            <b>{successful ? "CONGRATULATIONS:" : "ERROR:"}</b> {message}
                                         </span>
                                        </div>
                                    }
                                    action={
                                        <IconButton
                                            className={classes.iconButton}
                                            key="close"
                                            aria-label="Close"
                                            color="inherit"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon className={classes.close}/>
                                        </IconButton>
                                    }
                                />
                            </Collapse>
                        )}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default UpdatePassword;