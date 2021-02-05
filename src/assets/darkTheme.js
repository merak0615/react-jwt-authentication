import {createMuiTheme} from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#00acc1',
        },
        secondary: {
            main: '#e91e63',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontWeightMedium: '600',
    },
});

export default darkTheme;