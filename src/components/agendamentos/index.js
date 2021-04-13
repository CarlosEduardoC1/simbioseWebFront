import { Pane, Text } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, divprops, divcontainer } from '../../props/cadastro';
import { cardprops, divbox, divcards, divlabel, colors, propsbuttons, divbuttons } from '../../props/agendamentos';
import { CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export default function Agendamentos() {

    const theme = createMuiTheme({ palette: { primary: green } });

    return (
        <div>
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
                    </div>
                </Pane>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.exames}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.ultras}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.cirurg}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.proced}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.testAl}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
                <div style={divcards}>
                    <Pane {...cardprops} backgroundColor={colors.procEs}>
                        <CardContent>
                            <Typography style={textprops}>Nome da pessoa</Typography>
                            <Typography style={textprops}>Procedimento</Typography>
                            <Typography style={textprops}>DD/MM/AAAA HH:mm</Typography>
                            <Typography style={textprops}>Endereço</Typography>
                            <Typography style={textprops}>Telefone</Typography>
                            <Typography style={textprops}>CPF</Typography>
                            <Typography style={textprops}>Preço</Typography>
                        </CardContent>
                        <CardActions>
                            <div style={divbuttons}>
                                <Button {...propsbuttons}>Cancelar</Button>
                                <Button {...propsbuttons}>Arquivar</Button>
                            </div>
                        </CardActions>
                    </Pane>
                </div>
            </div>
        </div >
    )
}

