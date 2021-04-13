import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, fieldprops, divprops, divcontainer, divbuttons, buttonCancel, buttonSave, fieldStyle } from '../../props/cadastro';
import { Button, Checkbox, TextField, FormHelperText, Backdrop, CircularProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { formataMoeda } from '../../utils/formatacoes';
import { useState } from 'react';

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
    const [hrInicio, setHoraInicio] = useState();
    const [hrInicioError, setHoraInicioError] = useState();
    const [hrInicioDisable, setHoraInicioDisable] = useState(false);
    const [hrFim, setHoraFim] = useState();
    const [hrFimError, setHoraFimError] = useState();
    const [hrFimDisable, setHoraFimDisable] = useState(false);
    const [passo, setPasso] = useState();
    const [backDrop, setBackDrop] = useState(false);
    const [modal, setModal] = useState();

    function _validations() {
        setBackDrop(true);
        if (!proced) { setProcedError("Campo obrigatório!"); setBackDrop(false); }
        else { setProcedError(''); setBackDrop(false); }
        if (!medico) { setMedicoError("Campo obrigatório!"); setBackDrop(false); }
        else { setMedicoError(''); setBackDrop(false); }
        if (!hrInicio) { setHoraInicioError("Campo obrigatório!"); setBackDrop(false); }
        else { setHoraInicioError(''); setBackDrop(false); }
        if (!hrFim) { setHoraFimError("Campo obrigatório!"); setBackDrop(false); }
        else { setHoraFimError(''); setBackDrop(false); }
        if (!categoria) { setCategoriaError("Campo obrigatório!"); setBackDrop(false); }
        else { setCategoriaError(''); setBackDrop(false); }
    }

    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
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
                            <FormHelperText error >{categoriaError}</FormHelperText>
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
                            Início
                            <TextField disabled={hrInicioDisable} error={!!hrInicioError} {...fieldprops} type="datetime-local" value={hrInicio}
                                onChange={event => setHoraInicio(event.target.value)} />
                            <FormHelperText error>{hrInicioError}</FormHelperText>
                        </div>
                        <div> <Checkbox value="30" onClick={event => setPasso(event.target.value)} />Passo 30 min </div>
                        <div> <Checkbox value="1" onClick={event => setPasso(event.target.value)} />Passo 1 hora </div>
                        <div style={divprops}>
                            Fim
                            <TextField disabled={hrFimDisable} error={!!hrFimError} {...fieldprops} type="datetime-local" value={hrFim}
                                onChange={event => setHoraFim(event.target.value)} />
                            <FormHelperText error>{hrFimError}</FormHelperText>
                        </div>
                        <div><Checkbox value="De seg à sex das 08h as 18h" onChange={event => {
                            if (event.target.checked) {
                                setHoraFim(event.target.value);
                                setHoraFimDisable(true);
                                setHoraInicio(event.target.value);
                                setHoraInicioDisable(true);
                            } else {
                                setHoraInicio('');
                                setHoraInicioDisable(false);
                                setHoraFim('');
                                setHoraFimDisable(false);
                            }
                        }} /> Procedimento realizado todos os dias em todos os horários disponíveis</div>
                    </div>
                </div>
                <div style={divbuttons}>
                    <div style={divcontainer}>
                        <Button {...buttonCancel}>Cancelar</Button>
                    </div>
                    <div style={divcontainer}>
                        <ThemeProvider theme={theme}>
                            <Button {...buttonSave} onClick={() => _validations()}>Salvar</Button>
                        </ThemeProvider>
                    </div>
                </div>
                {modal}
            </Pane>
        </div >
    )
}

