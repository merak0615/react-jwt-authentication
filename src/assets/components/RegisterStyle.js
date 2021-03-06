import { makeStyles } from "@material-ui/core/styles";
import image from "../img/lake.jpg";

const RegisterStyle = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + image + ')',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#ffffff",
    },
    link: {
        "&": {
            color: '#00acc1',
            textDecoration: "none",
        },
        "&:hover,&:focus": {
            color: '#00acc1',
            textDecoration: "underline",
        },
    },
    wrapper: {
        position: 'relative',
    },
    message: {
        padding: "0",
        display: "block",
        maxWidth: "89%",
        "&,& *": {
            letterSpacing: "normal"
        },
        position: "relative",
        margin: "auto",
        width: "100%"
    },
    close: {
        width: "14px",
        height: "14px"
    },
    iconButton: {
        width: "24px",
        height: "24px",
        float: "right",
        fontSize: "1.5rem",
        fontWeight: "500",
        lineHeight: "1",
        position: "absolute",
        right: "-16px",
        top: "0",
        padding: "0"
    },
    icon: {
        display: "block",
        float: "left",
        marginRight: "1.071rem"
    },
    snackbar: {
        position: "relative",
        padding: "20px 10px",
        lineHeight: "20px",
        marginBottom: "20px",
        fontSize: "16px",
        backgroundColor: "white",
        color: "#555555",
        borderRadius: "0px",
        maxWidth: "100%",
        minWidth: "auto",
        boxShadow:
            "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)"
    },
    success: {
        backgroundColor: "#5cb860",
        color: "#ffffff"
    },
    danger: {
        backgroundColor: "#f55a4e",
        color: "#ffffff"
    },

}));

export default RegisterStyle;