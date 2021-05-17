import React, { useState, useEffect } from 'react';
import { Pane, Text, Tab, TabNavigation } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, divprops, divcontainer, fieldprops } from '../cadastro/props';
import {
    Table, TableBody, TableContainer, TableHead, TableRow,
    Paper, IconButton, Tooltip, Backdrop, CircularProgress, Snackbar, TextField, FormControlLabel, Button
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { buttonStyle, divArrayStyle, divButtonStyle, fieldStyle, formStyle, tabs } from './props';
import { useHistory } from 'react-router-dom';
import { _delete, _get, _update } from './services';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import ModalDeletar from '../../constants/modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FieldArray, Formik, Form } from 'formik';

export default function Config() {

    const theme = createMuiTheme({ palette: { primary: green } });
    const [indice, setIndice] = useState(0);
    const [busca, setBusca] = useState('Exames');
    const [dados, setDados] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();
    const [modal, setModal] = useState();
    const [apdate, setApdate] = useState();


    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { }
        else { history.push('/'); }
        getElementos();
    }, [busca]);

    const getElementos = async () => {
        const response = await _get(busca)
            .then(res => { setDados(res.data['rows']); })
            .catch(error => { })
    }

    const closeModal = () => { setModal() }

    const _deletar = async (row) => {
        let close = closeModal;
        let deletaProc = deleteElemento;
        let modalDelete = await ModalDeletar(row.id, row.especialidade, close, deletaProc);
        setModal(modalDelete)
    }

    const deleteElemento = async (id) => {
        setBackDrop(true);
        const response = await _delete(id)
            .then(res => {
                setBackDrop(false);
                setSnack(true);
                setMessage("Procedimento deletado com suceso!");
                setType('success');
                history.go(0);
            })
            .catch(error => {
                setBackDrop(false);
                setSnack(true);
                setMessage("Erro ao deletar procedimento!");
                setType('error');
            })
    }

    const _atualizaCad = async (data) => {
        setBackDrop(true);
        data.dataHora = JSON.stringify(data.dataHora);
        const response = await _update(data)
            .then(response => {
                setBackDrop(false);
                setSnack(true);
                setMessage(response.data.msg);
                setType('success');
                history.go(0);
            })
            .catch(error => {
                setBackDrop(false);
                setSnack(true);
                setMessage("Não foi possível atualizar.");
                setType('error');
                history.go(0);
            });
    }

    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
            <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={600}><Alert severity={type}>{message}</Alert></Snackbar>
            <Container value={3} />
            <Pane {...paneprops} >
                <div style={divcontainer}>
                    <div tyle={divprops}>
                        <Text style={textprops}>Config</Text>
                    </div>
                </div>
                <TabNavigation>
                    {tabs.map((tab, index) => {
                        return (
                            <Tab key={tab.value} is="a" id={tab.index} isSelected={tab.index === indice} onSelect={() => { setIndice(tab.index); setBusca(tab.value) }}>
                                {tab.value}
                            </Tab>
                        )
                    })}
                </TabNavigation>
            </Pane>
            <Pane {...paneprops} >
                <TableContainer component={Paper} >
                    <Table size="small" aria-label="a dense table" >
                        <TableHead>
                            <TableRow >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dados.map((row) => {
                                const hora = JSON.parse(row.hora);
                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                control={
                                                    <Tooltip title="Deletar" aria-label="del" key={"tooltipDelUser" + row.id}>
                                                        <IconButton label="del" onClick={() => _deletar(row)}> <DeleteIcon color="error" /> </IconButton>
                                                    </Tooltip>
                                                }
                                                label={row.especialidade}
                                            />
                                        </AccordionSummary>
                                        <AccordionDetails style={{ flexDirection: 'column' }}>
                                            <Formik enableReinitialize={true} initialValues={{
                                                dataHora: hora
                                                , especialidade: row.especialidade
                                                , categoria: row.categoria
                                                , medico: row.medico
                                                , particular: row.particular
                                                , simbiose: row.simbiose
                                                , atestado: row.atestado
                                                , bompastor: row.bompastor
                                                , id: row.id
                                                , config: apdate
                                            }}>
                                                {({ values, setFieldValue }) => {
                                                    return (
                                                        <Form>
                                                            <div style={formStyle}>
                                                                <TextField value={values.categoria} variant="outlined" label="Categoria" style={{ margin: 10 }} name='categoria'
                                                                    onChange={e => setFieldValue('categoria', e.target.value)} />
                                                                <TextField value={values.especialidade} variant="outlined" label="Especialidade" style={{ margin: 10 }} name='especialidade'
                                                                    onChange={e => setFieldValue('especialidade', e.target.value)} />
                                                                <TextField value={values.medico} variant="outlined" label="Médico" style={{ margin: 10 }} name='medico'
                                                                    onChange={e => setFieldValue('medico', e.target.value)} />
                                                                <TextField value={values.particular} variant="outlined" label="Particular" style={{ margin: 10 }} name='particular'
                                                                    onChange={e => setFieldValue('particular', e.target.value)} />
                                                                <TextField value={values.simbiose} variant="outlined" label="Simbiose" style={{ margin: 10 }} name='simbiose'
                                                                    onChange={e => setFieldValue('simbiose', e.target.value)} />
                                                                <TextField value={values.atestado} variant="outlined" label="Atestado" style={{ margin: 10 }} name='atestado'
                                                                    onChange={e => setFieldValue('atestado', e.target.value)} />
                                                                <TextField value={values.bompastor} variant="outlined" label="Bom Pastor" style={{ margin: 10 }} name='bompastor'
                                                                    onChange={e => setFieldValue('bompastor', e.target.value)} />
                                                            </div>
                                                            <div style={fieldStyle}>
                                                                <FieldArray name="dataHora">
                                                                    {(arrayHelpers) => (
                                                                        <div style={{ width: "100%" }}>
                                                                            <div style={divButtonStyle}>
                                                                                <Button variant='outlined' style={buttonStyle}
                                                                                    onClick={() => arrayHelpers.push({ data: '', hora: '', tipo: "disponivel" })}>Add Data/Hora
                                                                                    </Button>
                                                                            </div>
                                                                            <div style={divArrayStyle}>
                                                                                {values.dataHora.map((configs, index) => {
                                                                                    const data = `dataHora.${index}.data`;
                                                                                    const hour = `dataHora.${index}.hora`;
                                                                                    return (
                                                                                        <div style={{ marginRight: 5, marginBottom: 5 }}>
                                                                                            <TextField {...fieldprops} type="date" name={data} value={configs.data}
                                                                                                onChange={(e) => setFieldValue(data, e.target.value)}
                                                                                            />
                                                                                            <TextField {...fieldprops} type="time" name={hour} value={configs.hora}
                                                                                                onChange={(e) => setFieldValue(hour, e.target.value)}
                                                                                            />
                                                                                            <Tooltip title="Deletar" aria-label="del" key={"tooltipDelUser" + configs.index}>
                                                                                                <IconButton label="del"
                                                                                                    onClick={() => {
                                                                                                        values.dataHora.splice(index, 1);
                                                                                                        setFieldValue('config', 1);
                                                                                                    }} > <DeleteIcon color="error" /> </IconButton>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </FieldArray>

                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                <div>
                                                                    <Button variant="contained" color="primary" onClick={() => _atualizaCad(values)}>Salvar</Button>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )
                                                }}
                                            </Formik>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Pane>
            { modal}
        </div >
    )
}

