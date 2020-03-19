import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import { FirebaseContext } from './server';
import { useStateValue } from './sesion/store';

// Material React
import Grid from '@material-ui/core/Grid';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

// Components
import AppNavbar from "./componentes/layout/AppNavbar";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import { Snackbar } from "@material-ui/core";


function App(){
  let firebase = React.useContext(FirebaseContext);
  const [autenticacion, setAutenticacion] = React.useState(false);

  const [{openSnackbar}, dispatch] = useStateValue();
  
  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setAutenticacion(val);
    });
  }, []);

  return autenticacion !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        open={ openSnackbar ? openSnackbar.open : false }
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ''}
          </span>
        }
        onClose={() => {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })
        }}
      >

      </Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar />
            <Grid container>
              <Switch>
                <Route path="/" exact component={ListaInmuebles} /> 
                <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario} />
                <Route path="/auth/login" exact component={Login} />
              </Switch>
            </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
      
  ) : null;
}

export default App;
