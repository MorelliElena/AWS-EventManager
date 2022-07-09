import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './home/Home.js';
import EventInfo from './events/EventInfo'
import Notification from "./notification/Notification";
import Login from "./manager/login/Login";
import Bookings from "./manager/user/booking/Bookings";
import Likes from "./manager/user/likes/Likes";
import UserManager from "./manager/UserManager";
import Registration from "./registration/Registration";
import Header from "./headerbar/Header";
import {io} from "socket.io-client";

let routes = require("./routes/Routes")

class App extends Component {
        constructor() {
            super();
            this.state = {
                socket : null
            }

        }

        componentDidMount() {
            this.setState({socket : io("http://localhost:5005")})
        }

        login = (state) =>{
            if(state) {
                if (sessionStorage.getItem("token")) {
                    if (!this.state.socket.id) {
                        this.state.socket.connect(io("http://localhost:5005"), {'forceNew': true})
                    }
                    this.state.socket.emit("newUser", sessionStorage.getItem("token"))
                } else {
                    this.state.socket.disconnect()
                }
            }
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if(this.state.socket !== prevState.socket) {
                this.login(true)
            }

        }

    render() {
        return (
            <Router>
            <div className="container-fluid d-flex flex-column min-vh-100">
                <div className="row">
                    <Header socket = {this.state.socket}/>
                </div>
                <div className="row flex-grow-1">
                    <Switch>
                        <Route exact path = {routes.home} component = {Home} />
                        <Route path = {routes.event} exact render = {
                            (props) => <EventInfo {...props}/>} />
                        <Route path = {routes.notification} component = {Notification}/>
                        <Route path = {routes.manager} render = {() =>
                            <UserManager socket ={this.state.socket} login={this.login}/>} />
                        <Route path = {routes.login } component = {Login} />
                        <Route path = {routes.booking} component = {Bookings} />
                        <Route path = {routes.likes} component = {Likes} />
                        <Route path = {routes.registration} component = {Registration} />
                    </Switch>
                </div>
                </div>
            </Router>
        );
    }
}

export default App;