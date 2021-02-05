import { makeStyles } from "@material-ui/core/styles";

const AppStyle = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    toolbarNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarLink: {
        margin: theme.spacing(1, 1.5),
        "&:hover,&:focus": {
            color: '#fff',
        },
    },
    outlineLink: {
        margin: theme.spacing(1, 1.5),
        "&:hover,&:focus": {
            color: '#90caf9',
        },
    },
}));

export default AppStyle;