import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './home/Home.js';
import EventInfo from './events/EventInfo'
import Notification from "./notification/Notification";
import Login from "./login/Login";
import Bookings from "./user/booking/Bookings";
import Likes from "./user/likes/Likes";
import UserManager from "./user/UserManager";
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
                    <Route path = {routes.profile} component = {UserManager} />
                    <Route path = {routes.login } component = {Login} />
                    <Route path = {routes.booking} component = {Bookings} />
                    <Route path = {routes.likes} component = {Likes} />
                </Switch>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;