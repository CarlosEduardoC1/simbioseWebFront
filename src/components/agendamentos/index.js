import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, divprops, divcontainer } from '../cadastro/props';
import { cardprops, divbox, divcards, divlabel, colors, propsbuttons, divbuttons, divMaps, divFiltro, divFormControl, selectCat } from './props';
import { CardContent, Typography, CardActions, Button, Backdrop, CircularProgress, Snackbar, Select, MenuItem, InputLabel, FormControl, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { _arquivaAgendamento, _deletaAgendamento, _filtroPorCategoria, _getAgendamentos, _getArquivo, _deletaArquivo } from './services';
import { Alert } from '@material-ui/lab';
import { categoria } from './recursos';

export default function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();
    const [name, setName] = useState('Agendados');

    const theme = createMuiTheme({ palette: { primary: green } });

    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { }
        else { history.push('/'); }
        _getAgenda();
    }, []);


    const _getAgenda = async () => {
        setBackDrop(true);
        const response = await _getAgendamentos().then(response => {
            setName('Agendados');
            setAgendamentos(response.data);
            setBackDrop(false);
        }).catch(error => {
            setSnack(true);
            setMessage(error.data.msg);
            setType('error');
        })

    }

    const _getArquivados = async () => {
        setBackDrop(true);
        const response = await _getArquivo().then(response => {
            setName('Arquivados');
            setAgendamentos(response.data);
            setBackDrop(false);
        }).catch(error => {
            setName('Agendados');
            setSnack(true);
            setMessage("Erro ao buscar agendamentos");
            setType('error');
        });
    }

    const _cancelaAtendimento = async (id) => {
        const response = await _deletaAgendamento(id).then(response => {
            setSnack(true);
            setMessage(response.data.msg);
            setType('success');
            _getAgenda();
        }).catch(error => {
            setSnack(true);
            setMessage("Erro ao cancelar agendamento!");
            setType('error');
            _getAgenda();
        });

    }

    const _excluiArquivo = async (id) => {
        const response = await _deletaArquivo(id)
            .then(response => {
                setSnack(true);
                setMessage(response.data.msg);
                setType('success');
                _getAgenda();
            }).catch(error => {
                setSnack(true);
                setMessage("Erro ao cancelar agendamento!");
                setType('error');
                _getAgenda();
            });
    }

    const buttons = (agenda) => {
        if (name == 'Arquivados') {
            return (
                <div style={divbuttons}>
                    <Button {...propsbuttons} onClick={() => _excluiArquivo(agenda.id)} >Excluir</Button>
                    {/* <Button {...propsbuttons} onClick={() => _arquiva(agenda)}>Arquivar</Button> */}
                </div>)
        }
        else {
            return (
                <div style={divbuttons}>
                    <Button {...propsbuttons} onClick={() => _cancelaAtendimento(agenda.id)} >Cancelar</Button>
                    <Button {...propsbuttons} onClick={() => _arquiva(agenda)}>Arquivar</Button>
                </div>
            )
        }
    }

    const labelButton = () => {
        if (name == 'Agendados') {
            return (
                <div style={{ display: "flex", width: '100%', paddingLeft: 10, justifyContent: "flex-end" }}>
                    <Button {...propsbuttons} onClick={() => _getArquivados()}>Arquivados</Button>
                </div>
            )
        }
        else {
            return (
                <div style={{ display: "flex", width: '100%', paddingLeft: 10, justifyContent: "flex-end" }}>
                    <Button {...propsbuttons} onClick={() => _getAgenda()}>Agendamentos</Button>
                </div>
            )
        }
    }

    const _arquiva = async json => {
        const response = await _arquivaAgendamento(json);
        const deleta = await _deletaAgendamento(json.id);
        setMessage("Agendamento arquivado com sucesso"); setSnack(true); setType("success");
        _getAgenda();
    }

    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
            <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={300}><Alert severity={type}>{message}</Alert></Snackbar>
            <Container value={1} />
            <div style={divcontainer}>
                <Pane {...paneprops} >
                    <div tyle={divprops}>
                        <Text style={textprops}>Agendamentos</Text>
                    </div>
                    <div style={divcontainer}>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.exames}></Pane>Exames</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.ultras}></Pane>Ultrassonografia</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.testAl}></Pane>Testes Alérgicos</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.procEs}></Pane>Procedimentos Estéticos</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.proced}></Pane>Procedimentos</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.cirurg}></Pane>Cirurgias</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.fisiot}></Pane>Fisioterapia</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.academ}></Pane>Academia</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.especi}></Pane>Especialidades</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.medcTr}></Pane>Medicina do trabalho</div>
                        <div style={divlabel}><Pane {...divbox} backgroundColor={colors.deplic}></Pane>Depilação à laser</div>
                        <div style={divFiltro}>
                            {labelButton()}

                        </div>
                    </div>
                </Pane>
                <div style={divMaps}>
                    {agendamentos.map((agenda) => {
                        let cores = '';
                        if (agenda.categoria == 'Exames') { cores = colors.exames }
                        if (agenda.categoria == 'Ultrassom') { cores = colors.ultras }
                        if (agenda.categoria == 'Procedimentos') { cores = colors.proced }
                        if (agenda.categoria == 'Cirurgia') { cores = colors.cirurg }
                        if (agenda.categoria == 'Academia') { cores = colors.academ }
                        if (agenda.categoria == 'Especialidades') { cores = colors.especi }
                        if (agenda.categoria == 'Depila') { cores = colors.deplic }
                        return (
                            <div style={divcards}>
                                <Pane {...cardprops} backgroundColor={cores}>
                                    <CardContent>
                                        <Typography style={textprops}> {agenda.dia} {agenda.hora}</Typography>
                                        <Typography style={textprops}> {agenda.name}, CPF: {agenda.cpf}</Typography>
                                        <Typography style={textprops}> {agenda.especialidade}, {agenda.medico}</Typography>
                                        <Typography style={textprops}> {agenda.preco}</Typography>
                                        <Typography style={textprops}> {agenda.Endereco}</Typography>
                                        <Typography style={textprops}> E-mail: {agenda.email}   Fone: {agenda.fone}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        {buttons(agenda)}
                                    </CardActions>
                                </Pane>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

