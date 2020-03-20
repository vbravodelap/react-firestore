import React from 'react';
import { List, ListItem, Link, Avatar, ListItemText } from '@material-ui/core';

export const MenuDerecha = ({classes, usuario, textUsuario, fotoUsuario, salirSesion}) => (
    <div className="classes.list">
        <List>
            <ListItem button component={Link} to="/auth/RegistrarUsuario">
                    <Avatar 
                        classes={{primary: classes.avatarSize}}
                        src={fotoUsuario}
                    />
                <ListItemText classes={{primary: classes.ListItemText}}  />
            </ListItem>

            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary: classes.ListItemText}} primary="Salir" />
            </ListItem>
        </List>
    </div>
);