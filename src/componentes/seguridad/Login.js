import React, { Component } from 'react'
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { consumerFirebase } from '../../server';
import { compose } from 'recompose';
import { iniciarSesion } from '../../sesion/actions/sessionAction';
import { StateContext } from '../../sesion/store';
import { openMensajePantalla } from '../../sesion/actions/snackbarAction';

const style = {
    paper: {
        marginTop: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "red"
    },
    form: {
        width: "100%",
        marginTop: 10,
    }
}

class Login extends Component {
    static contextType = StateContext;

    state = {
        firebase: null,
        usuario: {
            email: '',
            password: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.firebase === prevState.firebase) {
            return null;
        }

        return {
            firebase: nextProps.firebase
        }
    }

    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario: usuario
        })
    }

    login = async e => {
        e.preventDefault();
        
        const [{sesion}, dispatch] = this.context;
        const { firebase, usuario } = this.state;
        const {email, password} = usuario;
        
        let callback = await iniciarSesion(dispatch, firebase, email, password);
        if(callback.status === true) {
            this.props.history.push('/');
        }else{
            openMensajePantalla(dispatch, {
                open: true,
                mensaje: callback.mensaje.message
            })
        }
    }

    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese sus datos
                    </Typography>

                    <form style={style.form}>
                        <TextField 
                            name="email" 
                            label="Correo electronico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.email}
                        />

                        <TextField 
                            name="password" 
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.password}
                        />

                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            type="submit"
                            onClick={this.login}
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(Login);
