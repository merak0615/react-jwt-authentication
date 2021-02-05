import { makeStyles } from "@material-ui/core/styles";
import image_night from "../img/night.jpg";
import image from "../img/night.jpg";

const ProfileStyle = makeStyles((theme) => ({
    pageHeader: {
        height: "100vh",
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        "&:before": {
            background: "rgba(0, 0, 0, 0.2)"
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
        height:"100vh",
        width:"100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding:theme.spacing(4, 4),
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
    },
    info: {
        fontSize:"large",
    },

}));

export default ProfileStyle;