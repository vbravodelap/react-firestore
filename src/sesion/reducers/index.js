import sessionReducer from './sessionReducer';
import openSnackbarReducer from './openSnackbarReducer';

export const mainReducer = ({ sesion, openSnackbar }, action) => {
    return {
        sesion: sessionReducer(sesion, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action)
    };
};