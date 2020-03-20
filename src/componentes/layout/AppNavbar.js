import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import BarSession from './bar/BarSession';
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { StateContext } from '../../sesion/store';

const styles = theme => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
})

class AppNavbar extends Component {
    static contextType = StateContext;

    state = {
        firebase: null
    }

    componentDidMount() {
        const { firebase } = this.state; // local state
        const [{sesion}, dispatch] = this.context; // global state

        if(firebase.auth.currentUser !== null && !sesion) {
            firebase.db
            .collection('Users')
            .doc(firebase.auth.currentUser.uid)
            .get()
            .then(doc => {
                const usuarioDB = doc.data();
                console.log(usuarioDB)
                dispatch({
                    type: "INICIAR_SESION",
                    sesion: usuarioDB,
                    autenticado: true
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        let nuevosObjetos = {};
        if(nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase;
        }

        return nuevosObjetos;
    }

    render() {
        const [{sesion}, dispatch] = this.context;

        return sesion ? (sesion.autenticado ? (
            <React.Fragment>
                <AppBar postion="static">
                    <BarSession />
                </AppBar>
            </React.Fragment>
        )
        :null
        ) : null;
    }
}

export default compose(withStyles(styles), consumerFirebase)(AppNavbar);
