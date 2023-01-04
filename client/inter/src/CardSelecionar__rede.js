import React from 'react';
import "./CardSelecionar__rede.css";
import { Button } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function CardSelecionar() {
    
        return (
            <div className="card__rede">
                <div className="frase__rede">
                    <h1>Seleciona Tipo de Redes</h1>
                </div>
                <div className="searchBar__dropdown__rede">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => ( 
                            <React.Fragment>
                            <Button variant="contained" color="blue" {...bindTrigger(popupState)}>
                                Seleciona 
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>Nenhum</MenuItem>
                                <MenuItem onClick={popupState.close}>Rede 1</MenuItem>
                                <MenuItem onClick={popupState.close}>Rede 2</MenuItem>
                                <MenuItem onClick={popupState.close}>Rede 3</MenuItem>
                                <MenuItem onClick={popupState.close}>Rede 4</MenuItem>
                                <MenuItem onClick={popupState.close}>Rede 5</MenuItem>
                            </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>
            </div>
        );
}


export default CardSelecionar
