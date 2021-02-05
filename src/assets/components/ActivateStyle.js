import { makeStyles } from "@material-ui/core/styles";
import image from "../img/lake.jpg";

const ActivateStyle = makeStyles((theme) => ({
    pageHeader: {
        height: "100vh",
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        "&:before": {
            background: "rgba(0, 0, 0, 0.5)"
        },
        "&:before,&:after": {
            position: "absolute",
            width: "100%",
            height: "100%",
            content: '""'
        },
    },
    paper: {
        position: "absolute",
        height:"30vh",
        width:"100%",
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding:theme.spacing(4, 4),
        margin:theme.spacing(8),
        color: "#000000",
        background: 'rgba(255, 255, 255, 0.9)',
    },
    icon: {
        fontSize: "80px",
    },

    success: {
        color: "#5cb860",
    },
    danger: {
        color: "#f55a4e",
    },
}));

export default ActivateStyle;