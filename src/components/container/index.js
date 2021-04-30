import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import { Text } from 'evergreen-ui';
import { tabprops, divprops, divLabel, textStyle, buttonProps, appBarProps } from './props';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "theme.palette.background.paper",
    },
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [component, setComponent] = useState();
    let history = useHistory();

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    })

    const handleChange = (event, newValue) => {
        setComponent(event.target.textContent);
        setValue(newValue);
        history.push(`/${event.target.textContent}`);
    };

    const _logout = () => {
        sessionStorage.removeItem('token');
        history.push('/');
    }

    return (
        <div className={classes.root}>
            <AppBar {...appBarProps}>
                <Tabs value={value} onChange={handleChange} {...tabprops} aria-label="full width tabs example">
                    <Tab value={0} label="Cadastro" name="cadastro" />
                    <Tab value={1} label="Agendamentos" />
                    <Tab value={2} label="Promoções" />
                    <Tab value={3} label="Config" />
                </Tabs>
            </AppBar>
            <div style={divprops}>
                <div style={divLabel}>
                    <Text style={textStyle} > CLÍNICA SIMBIOSE</Text>
                </div>
                <div style={divLabel}>
                    <Button {...buttonProps} onClick={() => _logout()}>Sair</Button>
                </div>
            </div>
        </div>
    );
}