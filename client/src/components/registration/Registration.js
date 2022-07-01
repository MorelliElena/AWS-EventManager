import React from "react";
import {Redirect} from "react-router-dom";
import routes from "../routes/Routes";
import Sidebar from "../sidebar/Sidebar";
import Choice from "../../common/Choice";
import Header from "../headerbar/Header";
import {Button, Form} from "react-bootstrap";
import Api from "../api/Api";
import Alert from "../alert/Alert";

let alertType = Choice.Alert

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertType: Choice.Alert,
            email:undefined,
            password:undefined,
            birthday: undefined,
            name: undefined,
            surname: undefined,
            message: undefined,
            hide: true,
            redirection: false
        }
        this.closeWindow = this.closeWindow.bind(this)
    }

    handleSubmit = () =>  {
        console.log(this.state.valueOf())
        if(this.state.email && this.state.password && this.state.name && this.state.surname && this.state.birthday){
            if(this.state.password.length < 8){
                this.setState({hide:false,
                    message:"La password deve essere più lunga di 8 caratteri", alertType:alertType.ERROR})
            } else {
                console.log(this.state.valueOf())
                Api.addUser(this.state.email, this.state.password, this.state.birthday,
                    this.state.name, this.state.surname, error => {
                        this.setState({hide:false, message:error, alertType:alertType.ERROR})
                    }, success =>{
                        this.setState({hide:false, message:success, alertType:alertType.SUCCESS, redirection:true})
                    })
            }
        } else {
            this.setState({hide:false, message:"Tutti i campi devono essere riempiti", alertType:alertType.ERROR})
        }

    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="home">
                    <div className="row">
                        <div className="sidebar col-5 col-md-3 ps-0 pe-1 position-sticky min-vh-100" id="sticky-sidebar">
                            <Sidebar state={Choice.NULL}/>
                        </div>
                        <div className="col ps-0 pe-1 pt-0 overflow-auto" id="main">
                            {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                                       type={this.state.alertType} message={this.state.message}/>
                                                        : null}

                            {this.state.redirection && this.state.hide ? <Redirect to={routes.login} /> : null}
                            <div className=" col-md-7 offset-md-3 d-flex flex-column">
                                <Form className="mt-4 justify-content-center">
                                    <h1 className="text-center mb-4 log"> Registrazione </h1>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" placeholder="Nome"
                                                      onChange={e => this.setState({name: e.target.value})}/>
                                        <Form.Text className="text-muted"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicSurname">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control type="text" placeholder="Cognome"
                                                      onChange={e => this.setState({surname: e.target.value})}/>
                                        <Form.Text className="text-muted"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicDate">
                                        <Form.Label>Data di nascita </Form.Label>
                                        <Form.Control type="date" placeholder=""
                                                      onChange={e => this.setState({birthday: e.target.value})}/>
                                        <Form.Text className="text-muted"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email"
                                                      onChange={e => this.setState({email: e.target.value})}/>
                                        <Form.Text className="text-muted"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"
                                                      onChange={e => this.setState({password: e.target.value})}/>
                                    </Form.Group>
                                </Form>
                                <div className="d-grid gap-2 mt-3 submit justify-content-center">
                                    <Button className="button" variant="primary" type="submit"
                                            onClick={this.handleSubmit}>
                                        Invia
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default Registration