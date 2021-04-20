import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, fieldprops, divprops, divcontainer, divbuttons, buttonCancel, buttonSave } from './props';
import { Button, Checkbox, TextField, FormHelperText, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { formataMoeda } from '../../utils/formatacoes';
import { useEffect, useState } from 'react';
import { _getCategoria, _saveCadastro } from './services';
import { Alert } from '@material-ui/lab';
import { FieldArray, Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

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
            const response = await _saveCadastro({
                especialidade: proced
                , medico: medico
                , particular: particular
                , simbiose: simbiose
                , bompastor: bompastor
                , atestado: atestado
                , categoria: categoria
                , hora: value.dataHora
            })
                .then(res => { setMessage("Cadastrado com sucesso"); setSnack(true); setType("success"); })
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
                    <div tyle={divprops}>
                        <Text style={textprops}>Cadastro</Text>
                        <div style={divprops}>
                            <TextField label="Exame ou procedimento" {...fieldprops} fullWidth error={!!procedError} value={proced} onChange={event => setProced(event.target.value)} />
                            <FormHelperText error >{procedError}</FormHelperText>
                        </div>
                        <Text style={textprops}>Preços</Text>
                        <div style={divprops}>
                            <TextField label="Particular" style={{ marginBottom: 30 }} {...fieldprops} fullWidth value={particular} onChange={event => setParticular(formataMoeda(event.target.value))} />
                            <div>
                            </div>
                            <TextField label="Bom Pastor" style={{ marginBottom: 30 }} {...fieldprops} fullWidth value={bompastor} onChange={event => setBomPastor(formataMoeda(event.target.value))} />
                            <TextField label="Simbiose" style={{ marginBottom: 30 }} {...fieldprops} fullWidth value={simbiose} onChange={event => setSimbiose(formataMoeda(event.target.value))} />
                            <TextField label="Atestado" style={{ marginBottom: 30 }} {...fieldprops} fullWidth value={atestado} onChange={event => setAtestado(formataMoeda(event.target.value))} />
                        </div>
                        <Text style={textprops}>Responsável</Text>
                        <div style={divprops}>

                            <TextField label="Médico ou especialista" {...fieldprops} fullWidth error={!!medicoError} value={medico} onChange={event => setMedico(event.target.value)} />
                            <FormHelperText error >{medicoError}</FormHelperText>
                        </div>
                    </div>
                    <div style={divprops}>
                        <div>
                            <Text style={textprops}>Selecione a categoria</Text>
                            <FormHelperText error style={{ marginLeft: 15 }}>{categoriaError}</FormHelperText>
                        </div>
                        <div style={divprops} >
                            <div><Checkbox value="Exames" onClick={event => setCategoria(event.target.value)} /> Exames</div>
                            <div><Checkbox value="Ultrassonografia" onClick={event => setCategoria(event.target.value)} /> Ultrassonografia</div>
                            <div><Checkbox value="Testes Alérgicos" onClick={event => setCategoria(event.target.value)} /> Testes Alérgicos</div>
                            <div><Checkbox value="Procedimentos Estéticos" onClick={event => setCategoria(event.target.value)} /> Procedimentos Estéticos</div>
                            <div><Checkbox value="Procedimentos" onClick={event => setCategoria(event.target.value)} /> Procedimentos</div>
                            <div><Checkbox value="Cirurgias" onClick={event => setCategoria(event.target.value)} /> Cirurgias</div>
                            <div><Checkbox value="Fisioterapia" onClick={event => setCategoria(event.target.value)} /> Fisioterapia</div>
                            <div><Checkbox value="Academia" onClick={event => setCategoria(event.target.value)} /> Academia</div>
                            <div><Checkbox value="Especialidades" onClick={event => setCategoria(event.target.value)} /> Especialidades</div>
                            <div><Checkbox value="Medicina do trabalho" onClick={event => setCategoria(event.target.value)} /> Medicina do trabalho</div>
                            <div><Checkbox value="Depilação à laser" onClick={event => setCategoria(event.target.value)} /> Depilação à laser</div>
                        </div>
                    </div>
                    <div style={divprops}>
                        <div>
                            <Text style={textprops}>Selecione a data e hora</Text>
                        </div>
                        <div style={divprops}>
                            <Formik enableReinitialize={true} initialValues={{ dataHora: [{ valor: '' }] }}>
                                {({ values, setFieldValue }) => {
                                    setValues(values);
                                    return (
                                        <Form>
                                            <FieldArray name="dataHora">
                                                {(arrayHelpers) => (
                                                    <div>
                                                        <div>
                                                            <Button variant='outlined' style={{ margin: '20px' }} onClick={() => arrayHelpers.push({ valor: '' })}>Add Data/Hora</Button>
                                                        </div>
                                                        {values.dataHora.map((configs, index) => {
                                                            const nome = `dataHora.${index}.valor`;
                                                            return (
                                                                <div>
                                                                    <TextField {...fieldprops} type="datetime-local" name={nome} value={values.dataHora.valor}
                                                                        onChange={e => { setFieldValue(nome, e.target.value) }} />
                                                                </div>
                                                            )
                                                        })}
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

