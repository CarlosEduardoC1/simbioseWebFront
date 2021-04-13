import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Container from './components/container';
import Cadastro from './components/cadastro';
import Agendamentos from './components/agendamentos';
import Config from './components/configr';

function App() {

    return (
        <Router>
            {/* //initial route */}
            <Route path="/" exact component={Cadastro} />
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/agendamentos" exact component={Agendamentos} />
            <Route path="/config" exact component={Config} />

        </Router>
    );
}



export default App;