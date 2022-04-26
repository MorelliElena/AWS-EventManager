import React from "react";
import {Redirect} from "react-router-dom";
import routes from "../routes/Routes";
import Sidebar from "../sidebar/Sidebar";
import Choice from "../../common/Choice";
import Header from "../headerbar/Header";
import {Button, Form} from "react-bootstrap";
import Api from "../api/Api";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            email:undefined,
            password:undefined,
            birthday: undefined,
            name: undefined,
            surname: undefined,
            message: undefined,
            hide: true,
            redirection: false
        }
    }

    handleSubmit = () =>  {
        console.log(this.state.valueOf())
        if(this.state.email && this.state.password && this.state.name && this.state.surname && this.state.birthday){
            if(this.state.password.length < 8){
                this.setState({hide:false,
                    message:"La password deve essere più lunga di 8 caratteri", error:true})
            } else {
                console.log(this.state.valueOf())
                Api.addUser(this.state.email, this.state.password, this.state.birthday,
                    this.state.name, this.state.surname, error => {
                        this.setState({hide:false, message:error, error:true})
                    }, success =>{
                        this.setState({hide:false, message:success, error:false, redirection:true})
                    })
            }
        } else {
            this.setState({hide:false, message:"Tutti i campi devono essere riempiti", error:true})
        }

    }

    alert = () => {
        return(
            this.state.error ?
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert"
                            aria-label="Close" onClick={()=> this.setState({hide:true})}/>
                </div> :
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {this.state.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert"
                            aria-label="Close" onClick={()=> this.setState({hide:true})}/>
                </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="home">
                    <div className="row">
                        <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                            <Sidebar state={Choice.NULL}/>
                        </div>
                        <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0" id="main">
                            <Header/>
                            {!this.state.hide? this.alert() : null
                            }
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