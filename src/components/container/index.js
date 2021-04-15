import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import { Text } from 'evergreen-ui';
import { tabprops, divprops } from './props';

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
            console.log(props.value)
        }
    })

    const handleChange = (event, newValue) => {
        setComponent(event.target.textContent);
        setValue(newValue);
        history.push(`/${event.target.textContent}`);
    };

    return (
        <div className={classes.root}>
            <AppBar position="absolute" color="default">
                <Tabs value={value} onChange={handleChange} {...tabprops} aria-label="full width tabs example">
                    <Tab value={0} label="Cadastro" name="cadastro" />
                    <Tab value={1} label="Agendamentos" />
                    <Tab value={2} label="Promoções" />
                    <Tab value={3} label="Config" />
                </Tabs>
            </AppBar>
            <div style={divprops}>
                <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20 }} > CLÍNICA SIMBIOSE</Text>
            </div>
        </div>
    );
}