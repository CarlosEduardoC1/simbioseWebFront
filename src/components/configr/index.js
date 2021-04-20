import React, { useState, useEffect } from 'react';
import { Pane, Text, Tab, TabNavigation } from 'evergreen-ui';
import Container from '../container';
import { paneprops, textprops, fieldprops, divprops, divcontainer, divbuttons, buttonCancel, buttonSave } from '../cadastro/props';
import { Button, Checkbox, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { tabs } from './props';
import { useHistory } from 'react-router-dom';

export default function Config() {

    const theme = createMuiTheme({ palette: { primary: green } });
    const [indice, setIndice] = useState(0);



    let history = useHistory();
    
    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { console.log(token) }
        else { history.push('/'); }
    })

    return (
        <div>
            <Container value={3} />
            <Pane {...paneprops} >
                <div style={divcontainer}>
                    <div tyle={divprops}>
                        <Text style={textprops}>Config</Text>
                    </div>
                </div>
                <TabNavigation>
                    {tabs.map((tab, index) => (
                        <Tab key={tab.value} is="a" id={tab.index} isSelected={tab.index === indice} onSelect={() => setIndice(tab.index)}>
                            {tab.value}
                        </Tab>
                    ))}
                </TabNavigation>
            </Pane>

        </div >
    )
}

