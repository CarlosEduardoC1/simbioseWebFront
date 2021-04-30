import React, { useEffect, useState } from 'react';
import { Text } from 'evergreen-ui';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { paneprops, textprops, fieldprops, divprops, divcontainer, divbuttons, buttonCancel, buttonSave, divColumn, divCat, divPrice, divHour } from '../components/cadastro/props';
import { Button, Checkbox, TextField, FormHelperText, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';

export default function ModalEditar(row, title, close, salva, proced, setProced) {
    console.log(proced);
    return (
        <Dialog maxWidth="xl" open={true} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">Editar {title}</DialogTitle>
            <DialogContent>
                <div style={divcontainer}>
                    <div style={divColumn}>
                        <div>
                            <Text style={textprops}>Cadastro</Text>
                            <div style={divprops}>
                                <TextField label="Exame ou procedimento" {...fieldprops} fullWidth value={proced} onChange={event => setProced(event.target.value)} />
                                <FormHelperText error ></FormHelperText>
                            </div>
                        </div>
                        <div>
                            <Text style={textprops}>Responsável</Text>
                            <div style={divprops}>
                                <TextField label="Médico ou especialista" {...fieldprops} fullWidth />
                                <FormHelperText error ></FormHelperText>
                            </div>
                        </div>
                        <div>
                            <Text style={textprops}>Preços</Text>
                            <div style={divprops}>
                                <TextField label="Particular" style={divPrice} {...fieldprops} fullWidth />
                                <TextField label="Bom Pastor" style={divPrice} {...fieldprops} fullWidth />
                                <TextField label="Simbiose" style={divPrice} {...fieldprops} fullWidth />
                                <TextField label="Atestado" style={divPrice} {...fieldprops} fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="secondary">Desistir</Button>
                <Button onClick={() => salva(row)} color="primary" autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog >
    )
}