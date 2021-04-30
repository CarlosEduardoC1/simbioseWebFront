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
import { tabs } from './props';
import { useHistory } from 'react-router-dom';
import { _delete, _get } from './services';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import ModalDeletar from '../../constants/modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FieldArray, Formik, Form } from 'formik';

export default function Config() {

    const theme = createMuiTheme({ palette: { primary: green } });
    const [indice, setIndice] = useState(11);
    const [busca, setBusca] = useState('');
    const [dados, setDados] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();
    const [modal, setModal] = useState();
    const [value, setValues] = useState();


    const [proced, setProced] = useState();



    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { }
        else { history.push('/'); }
        getElementos();
    }, [busca]);

    const getElementos = async () => {
        const response = await _get(busca)
            .then(res => setDados(res.data['rows']))
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

    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
            <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={300}><Alert severity={type}>{message}</Alert></Snackbar>
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
                                            <div style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                <TextField value={row.categoria} variant="outlined" label="Categoria" style={{ margin: 10 }} />
                                                <TextField value={row.especialidade} variant="outlined" label="Especialidade" style={{ margin: 10 }} />
                                                <TextField value={row.medico} variant="outlined" label="Médico" style={{ margin: 10 }} />
                                                <TextField value={row.particular} variant="outlined" label="Particular" style={{ margin: 10 }} />
                                                <TextField value={row.simbiose} variant="outlined" label="Simbiose" style={{ margin: 10 }} />
                                                <TextField value={row.atestado} variant="outlined" label="Atestado" style={{ margin: 10 }} />
                                                <TextField value={row.bompastor} variant="outlined" label="Bom Pastor" style={{ margin: 10 }} />
                                            </div>
                                            <div style={{ display: "flex", paddingLeft: 10 }}>
                                                <Formik enableReinitialize={true} initialValues={{ dataHora: hora }}>
                                                    {({ values, setFieldValue }) => {
                                                        console.log(values.dataHora);
                                                        setValues(values);
                                                        return (
                                                            <Form>
                                                                <FieldArray name="dataHora">
                                                                    {(arrayHelpers) => (
                                                                        <div style={{ width: "100%" }}>
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                                                <Button variant='outlined' style={{ margin: '20px', width: '10%' }} onClick={() => arrayHelpers.push({ data: '', hora: '', tipo: "disponivel" })}>Add Data/Hora</Button>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                                                {values.dataHora.map((configs, index) => {
                                                                                    const data = `dataHora.${index}.data`;
                                                                                    const hour = `dataHora.${index}.hora`;
                                                                                    console.log(configs);
                                                                                    console.log(index);
                                                                                    return (
                                                                                        <div style={{ marginRight: 5, marginBottom: 5 }}>
                                                                                            <TextField {...fieldprops} type="date" name={data} value={configs.data}
                                                                                            />
                                                                                            <TextField {...fieldprops} type="time" name={hour} value={configs.hora}
                                                                                            />
                                                                                            <Tooltip title="Deletar" aria-label="del" key={"tooltipDelUser" + configs.index}>
                                                                                                <IconButton label="del" onClick={() => values.dataHora.splice(index, 1)} > <DeleteIcon color="error" /> </IconButton>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>)}
                                                                </FieldArray>
                                                            </Form>
                                                        )
                                                    }}
                                                </Formik>
                                            </div>
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

