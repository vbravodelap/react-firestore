import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class ListaInmuebles extends Component {
    render() {
        return (
            <React.Fragment>
                <Button 
                    variant="contained" 
                    color="primary" 
                >
                    Color primario
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary" 
                >
                    Color secundario
                </Button>
            </React.Fragment>
        )
    }
}
