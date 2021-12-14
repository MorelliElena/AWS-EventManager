import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Home.js';
import EventInfo from './events/EventInfo'
import Profile from "./profile/Profile";
import Notification from "./notification/Notification";
import Login from "./login/Login";
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
                    <Route path = {routes.notification} component = {Notification}/>
                    <Route path = {routes.profile} component = {Profile} />
                    <Route path = {routes.login } component = {Login} />
                </Switch>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;