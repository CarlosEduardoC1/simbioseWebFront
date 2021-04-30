import { Button, TextField } from '@material-ui/core';
import { Pane } from 'evergreen-ui';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { paneprops } from '../cadastro/props';
import Logo from '../../assets/logo.png';
import { buttonProps, buttonStyle, divDateImage, divStyle, fieldMailProps, fieldPassProps, fieldStyle, imageStyle } from './props';
import { _login } from './services';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Login() {

    const [hoje, setHoje] = useState();
    const [mail, setMail] = useState('');
    const [senha, setSenha] = useState('');
    const [backDrop, setBackDrop] = useState(false);
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();

    let history = useHistory();

    useEffect(() => { setHoje(moment().format("DD/MM/YYYY HH:mm")) });

    async function _logar() {
        setBackDrop(true);
        if (mail == '' || senha == '') {
            setBackDrop(false);
            setSnack(true);
            setMessage("Todos os campos precisam ser preenchidos!");
            setType('error');
        }
        else {
            const response = await _login(mail, senha);
            if (response) {
                setBackDrop(false);
                sessionStorage.setItem('token', process.env.TOKEN);
                history.push('/cadastro');
            }
            else {
                setBackDrop(false);
                setSnack(true);
                setMessage("Usuário e/ou senha incorretos");
                setType('error');
            }
        }
    }

    return (
        <div style={divStyle}>
            <Pane {...paneprops}>
                <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
                <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={300}><Alert severity={type}>{message}</Alert></Snackbar>
                <div style={divDateImage}><h1>{hoje}</h1></div>
                <div style={divDateImage}>
                    <figure><img src={Logo} alt="logo" style={imageStyle} /></figure>
                </div>
                <TextField style={fieldStyle} {...fieldMailProps} value={mail} onChange={event => setMail(event.target.value)} onKeyDown={e => { if (e.key == "Enter") { _logar() } }} />
                <TextField style={fieldStyle} {...fieldPassProps} value={senha} onChange={event => setSenha(event.target.value)} onKeyDown={e => { if (e.key == "Enter") { _logar() } }} />
                <Button style={buttonStyle} {...buttonProps} onClick={() => _logar()}>LOGIN</Button>
            </Pane>
        </div>
    )
}