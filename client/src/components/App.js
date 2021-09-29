import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Home.js';
import EventInfo from './events/EventInfo'
let routes = require("./routes/Routes")

class App extends Component {
       render() {
        return (
            <div>
            <Router>
                <div>
                <Switch>
                    <Route exact path = {routes.home} component = {Home} />
                    <Route path = {routes.event} exact render = {(props) =>
                        <EventInfo {...props}/>} />
                        </Switch>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;