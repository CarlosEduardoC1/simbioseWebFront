import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, divprops, divcontainer } from '../cadastro/props';
import { cardprops, divbox, divcards, divlabel, colors, propsbuttons, divbuttons, divMaps, divFiltro, divFormControl, selectCat } from './props';
import { CardContent, Typography, CardActions, Button, Backdrop, CircularProgress, Snackbar, Select, MenuItem, InputLabel, FormControl, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { _arquivaAgendamento, _deletaAgendamento, _filtroPorCategoria, _getAgendamentos, _getArquivo } from './services';
import { Alert } from '@material-ui/lab';
import { categoria } from './recursos';

export default function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();

    const theme = createMuiTheme({ palette: { primary: green } });

    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { console.log(token) }
        else { history.push('/'); }
        _getAgenda();
    }, []);


    const _getAgenda = async () => {
        setBackDrop(true);
        const response = await _getAgendamentos();
        setAgendamentos(response.data);
        setBackDrop(false);
    }

    const _getArquivados = async () => {
        setBackDrop(true);
        const response = await _getArquivo();
        setAgendamentos(response.data);
        setBackDrop(false);
    }

    const _cancelaAtendimento = async (id) => {
        const response = await _deletaAgendamento(id);
        if (response.status == 200) {
            setSnack(true);
            setMessage("Agendamento cancelado com sucesso!");
            setType('success');
            _getAgenda();
        }
        else {
            setSnack(true);
            setMessage("Erro ao cancelar agendamento. Tente novamente mais tarde!");
            setType('error');
            _getAgenda();
        }

    }

    const _filtraCatetgoria = async (cat) => {
        if (cat == "todas") { _getAgenda() }
        else {
            const response = await _filtroPorCategoria(cat);
            if (response.status == 200) {
                console.log(response);
                setAgendamentos(response.data);
            }
            else {
                setSnack(true);
                setMessage("Não existem agendamentos para esta categoria");
                setType('error');
                _getAgenda();
            }
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
                            <FormControl style={divFormControl}>
                                <InputLabel>Filtrar por categoria</InputLabel>
                                <Select style={selectCat} onChange={event => _filtraCatetgoria(event.target.value)}>
                                    {categoria.map(cat => {
                                        return (<MenuItem value={cat.value}>{cat.label}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                            <div style={{ display: "flex", width: '33%', paddingLeft: 10 }}>
                                <TextField style={selectCat} label="Filtrar por data" />
                            </div>
                            <div style={{ display: "flex", width: '33%', paddingLeft: 10, justifyContent: "flex-end" }}>
                                <Button {...propsbuttons} onClick={() => _getArquivados()}>Arquivados</Button>
                            </div>
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
                                        <Typography style={textprops}> {agenda.NomeUsuario}, CPF: {agenda.CPF}</Typography>
                                        <Typography style={textprops}> {agenda.especialidade}, {agenda.medico}</Typography>
                                        <Typography style={textprops}> {agenda.preco}</Typography>
                                        <Typography style={textprops}> {agenda.Endereco}</Typography>
                                        <Typography style={textprops}> E-mail: {agenda.Email}   Fone: {agenda.Fone}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <div style={divbuttons}>
                                            <Button {...propsbuttons} onClick={() => _cancelaAtendimento(agenda.id)} >Cancelar</Button>
                                            <Button {...propsbuttons} onClick={() => _arquiva(agenda)}>Arquivar</Button>
                                        </div>
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

