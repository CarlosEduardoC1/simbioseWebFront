import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Container from './components/container';
import Cadastro from './components/cadastro';
import Agendamentos from './components/agendamentos';
import Config from './components/configr';
import Promocoes from './components/promocoes';
import Login from './components/login';

function App() {

    return (
        <Router>
            {/* //initial route */}
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/agendamentos" exact component={Agendamentos} />
            <Route path="/config" exact component={Config} />
            <Route path="/Promoções" exact component={Promocoes} />

        </Router>
    );
}



export default App;