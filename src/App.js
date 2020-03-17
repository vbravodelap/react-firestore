import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";

// Material React
import Grid from '@material-ui/core/Grid';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

// Components
import AppNavbar from "./componentes/layout/AppNavbar";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";

class App extends Component {
  render() {
    return (
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
      
    );
  }
}

export default App;
