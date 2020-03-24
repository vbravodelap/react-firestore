import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MenuIzquierda = ({ classes }) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Perfil"/>
            </ListItem>
        </List>

        <Divider />

        <List>
            <ListItem component={Link} button to="">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Nuevo Inmueble" />
            </ListItem>

            <ListItem component={Link} button to="">
                <i className="material-icons"></i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Inmuebles" />
            </ListItem>

            <ListItem component={Link} button to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Mensajes" />
            </ListItem>
        </List>
    </div>
);