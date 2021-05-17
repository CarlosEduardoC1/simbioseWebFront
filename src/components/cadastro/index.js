import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, fieldprops, divprops, divcontainer, divbuttons, buttonCancel, buttonSave, divColumn, divCat, divPrice, divHour, divCategoria } from './props';
import { Button, Checkbox, TextField, FormHelperText, Backdrop, CircularProgress, Snackbar, Radio } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { formataMoeda } from '../../utils/formatacoes';
import { useEffect, useState } from 'react';
import { _getCategoria, _saveCadastro } from './services';
import { Alert } from '@material-ui/lab';
import { FieldArray, Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function Cadastro() {

    const theme = createMuiTheme({ palette: { primary: green } });

    const [particular, setParticular] = useState(0.00);
    const [bompastor, setBomPastor] = useState(0.00);
    const [simbiose, setSimbiose] = useState(0.00);
    const [atestado, setAtestado] = useState(0.00);
    const [proced, setProced] = useState();
    const [procedError, setProcedError] = useState();
    const [medico, setMedico] = useState();
    const [medicoError, setMedicoError] = useState();
    const [categoria, setCategoria] = useState();
    const [categoriaError, setCategoriaError] = useState();
    const [backDrop, setBackDrop] = useState(false);
    const [modal, setModal] = useState();
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();
    const [value, setValues] = useState();

    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { console.log(token) }
        else { history.push('/'); }
    })

    function _validations() {
        setBackDrop(true);
        if (!proced) { setProcedError("Campo obrigatório!"); setBackDrop(false); return true; }
        else { setProcedError(''); setBackDrop(false); }
        if (!medico) { setMedicoError("Campo obrigatório!"); setBackDrop(false); return true; }
        else { setMedicoError(''); setBackDrop(false); }
        if (!categoria) { setCategoriaError("Campo obrigatório!"); setBackDrop(false); return true; }
        else { setCategoriaError(''); setBackDrop(false); }
    }


    async function salvaCadastro(values) {
        const response = await _validations();
        if (response) {
            return;
        }
        else {
            const hr = JSON.stringify(value.dataHora);
            console.log(value.dataHora);
            console.log(hr);
            const response = await _saveCadastro({
                especialidade: proced
                , medico: medico
                , particular: particular
                , simbiose: simbiose
                , bompastor: bompastor
                , atestado: atestado
                , categoria: categoria
                , hora: hr
            })
                .then(res => { setMessage("Cadastrado com sucesso"); setSnack(true); setType("success"); history.go(0); })
                .catch(error => { setMessage(error); setSnack(true); setType('error'); });
        }
    }

    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
            <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={300}><Alert severity={type}>{message}</Alert></Snackbar>
            <Container value={0} />
            <Pane {...paneprops} >
                <div style={divcontainer}>
                    <div style={divColumn}>
                        <div style={{ width: '20%' }}>
                            <Text style={textprops}>Cadastro</Text>
                            <div style={divprops}>
                                <TextField label="Exame ou procedimento" {...fieldprops} fullWidth error={!!procedError} value={proced} onChange={event => setProced(event.target.value)} />
                                <FormHelperText error >{procedError}</FormHelperText>
                            </div>
                        </div>
                        <div>
                            <Text style={textprops}>Preços</Text>
                            <div style={divprops}>
                                <TextField label="Particular" style={divPrice} {...fieldprops} fullWidth value={particular} onChange={event => setParticular(formataMoeda(event.target.value))} />
                                <TextField label="Bom Pastor" style={divPrice} {...fieldprops} fullWidth value={bompastor} onChange={event => setBomPastor(formataMoeda(event.target.value))} />
                                <TextField label="Simbiose" style={divPrice} {...fieldprops} fullWidth value={simbiose} onChange={event => setSimbiose(formataMoeda(event.target.value))} />
                                <TextField label="Atestado" style={divPrice} {...fieldprops} fullWidth value={atestado} onChange={event => setAtestado(formataMoeda(event.target.value))} />
                            </div>
                        </div>
                        <div style={{ width: '20%' }}>
                            <Text style={textprops}>Responsável</Text>
                            <div style={divprops}>
                                <TextField label="Médico ou especialista" {...fieldprops} fullWidth error={!!medicoError} value={medico} onChange={event => setMedico(event.target.value)} />
                                <FormHelperText error >{medicoError}</FormHelperText>
                            </div>
                        </div>
                    </div>
                    <div style={divColumn}>
                        <div style={{ width: '10%' }}>
                            <Text style={textprops}>Selecione a categoria</Text>
                            <FormHelperText error style={{ marginLeft: 15 }}>{categoriaError}</FormHelperText>
                        </div>
                        <div style={divCategoria} >
                            <div style={divCat}><Radio value="Exames" onClick={event => setCategoria(event.target.value)} /><div>Exames</div></div>
                            <div style={divCat}><Radio value="Ultrassonografia" onClick={event => setCategoria(event.target.value)} /><div>Ultrassonografia</div></div>
                            <div style={divCat}><Radio value="Testes Alérgicos" onClick={event => setCategoria(event.target.value)} /><div>Testes Alérgicos</div></div>
                            <div style={divCat}><Radio value="Procedimentos Estéticos" onClick={event => setCategoria(event.target.value)} /><div> Procedimentos Estéticos</div></div>
                            <div style={divCat}><Radio value="Procedimentos" onClick={event => setCategoria(event.target.value)} /><div> Procedimentos</div></div>
                            <div style={divCat}><Radio value="Cirurgias" onClick={event => setCategoria(event.target.value)} /><div> Cirurgias</div></div>
                            <div style={divCat}><Radio value="Fisioterapia" onClick={event => setCategoria(event.target.value)} /><div> Fisioterapia</div></div>
                            <div style={divCat}><Radio value="Academia" onClick={event => setCategoria(event.target.value)} /><div> Academia</div></div>
                            <div style={divCat}><Radio value="Especialidades" onClick={event => setCategoria(event.target.value)} /> <div>Especialidades</div></div>
                            <div style={divCat}><Radio value="Medicina do trabalho" onClick={event => setCategoria(event.target.value)} /><div> Medicina do trabalho</div></div>
                            <div style={divCat}><Radio value="Depilação à laser" onClick={event => setCategoria(event.target.value)} /><div> Depilação à laser</div></div>
                        </div>
                    </div>
                    <div style={divColumn}>
                        <div style={{ width: '100%' }}>
                            <Text style={textprops}>Selecione a data e hora</Text>
                        </div>
                        <div style={divHour}>
                            <Formik enableReinitialize={true} initialValues={{ dataHora: [{ data: '', hora: '', tipo: "disponivel"}] }}>
                                {({ values, setFieldValue }) => {
                                    setValues(values);
                                    return (
                                        <Form>
                                            <FieldArray name="dataHora">
                                                {(arrayHelpers) => (
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                            <Button variant='outlined' style={{ margin: '20px', width: '10%' }} onClick={() => arrayHelpers.push({ data: '', hora: '', tipo: "disponivel" })}>Add Data/Hora</Button>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                            {values.dataHora.map((configs, index) => {

                                                                console.log(values.dataHora);
                                                                const data = `dataHora.${index}.data`;
                                                                const hora = `dataHora.${index}.hora`;
                                                                return (
                                                                    <div style={{ marginRight: 5, marginBottom: 5 }}>
                                                                        <TextField {...fieldprops} type="date" name={data} value={values.dataHora.valor}
                                                                            onChange={e => { setFieldValue(data, e.target.value) }} />
                                                                        <TextField {...fieldprops} type="time" name={hora} value={values.dataHora.valor}
                                                                            onChange={e => { setFieldValue(hora, e.target.value) }} />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div style={divbuttons}>
                    <div style={divcontainer}>
                        <Button {...buttonCancel}>Cancelar</Button>
                    </div>
                    <div style={divcontainer}>
                        <ThemeProvider theme={theme}>
                            <Button {...buttonSave} onClick={() => salvaCadastro()}>Salvar</Button>
                        </ThemeProvider>
                    </div>
                </div>
                {modal}
            </Pane>
        </div >
    )
}

