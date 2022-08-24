import React from 'react'
import {Button, Form} from "react-bootstrap";
import Sidebar from "../../sidebar/Sidebar";
import "./Login.css"
import {Link, Redirect} from 'react-router-dom';
import Api from '../../api/Api'
import Choice from "../../../common/Choice";
import Alert from "../../alert/Alert";

let routes = require("../../routes/Routes")
let alertType = Choice.Alert

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            alertType: Choice.Alert,
            message: undefined,
            hide: true,
            redirection: false
        }
        this.closeWindow = this.closeWindow.bind(this)
    }

    handleSubmit = () => {
        if(this.state.password && this.state.username){
        Api.checkAuthentication(
            this.state.username,
            this.state.password,
            error =>{
                this.setState({hide:false, message: error, alertType: alertType.ERROR})
            },
            user => {
                sessionStorage.setItem("token", user._id)
                if(user.isAdmin) { sessionStorage.setItem("admin", "true")}
                this.setState({redirection:true})
            }
        )} else {
            this.setState({hide:false, message: "Alcuni campi risultano essere vuoti",
                alertType: alertType.ERROR})
        }
    }

    closeWindow = () =>{
        this.setState({hide:true})
    }

    componentDidMount() {
        if(sessionStorage.getItem("token")){
            this.setState({redirection:true})
        }
    }

    render() {
        if(this.state.redirection){
            return <Redirect to={routes.manager}/>
        } else {
            return (
                <div className="container-fluid d-flex flex-column">
                <div className="row flex-grow-1">
                    <div className="sidebar col-5 col-md-3 ps-0 pe-1 position-sticky" id="sticky-sidebar">
                            <Sidebar state={Choice.NULL}/>
                        </div>
                        <div className="col ps-1 pe-1 pt-1 overflow-auto" id="main">
                            {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                                       type={this.state.alertType} message={this.state.message}/>
                                                : null}
                            <div className="col-md-7 offset-md-3 d-flex flex-column">
                                <Form className="mt-4 justify-content-center">
                                    <h1 className="text-center log"> Log in </h1>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"
                                                      onChange={e => this.setState({
                                                          username: e.target.value})}/>
                                        <Form.Text className="text-muted"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"
                                                      onChange={e => {
                                                          this.setState({password: e.target.value})
                                                      }}/>
                                    </Form.Group>
                                </Form>
                                <div className="d-grid gap-2 mt-3 submit justify-content-center">
                                    <Button className="button" variant="primary" type="submit"
                                            onClick={this.handleSubmit}>
                                       Invia
                                    </Button>
                                    <Link className="d-flex justify-content-center mt-3 registration"
                                          to={routes.registration}>
                                        Sei un nuovo utente? Registrati subito cliccando qui!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login