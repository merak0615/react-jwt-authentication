import { makeStyles } from "@material-ui/core/styles";
import image_night from "../img/night.jpg";
import image_lake from "../img/lake.jpg";


const HomeStyle = makeStyles((theme) => ({
    pageHeader: {
        height: "100vh",
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
    image_lake: {
        backgroundImage: 'url(' + image_lake + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    image_night: {
        backgroundImage: 'url(' + image_night + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        position: "absolute",
        height:"100vh",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding:theme.spacing(4,4),
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
    },
    subtitle: {
        lineHeight: "48px",
        marginTop:theme.spacing(4),
    },
    body: {
        fontSize: "large",
    },
}));

export default HomeStyle;