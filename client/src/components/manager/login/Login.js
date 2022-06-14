import React from 'react'
import {Button, Form} from "react-bootstrap";
import Sidebar from "../../sidebar/Sidebar";
import Header from "../../headerbar/Header";
import "./Login.css"
import {Link, Redirect} from 'react-router-dom';
import Api from '../../api/Api'
import Choice from "../../../common/Choice";
let routes = require("../../routes/Routes")

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false,
            message: ""
        }
    }

    handleSubmit = () => {
        Api.checkAuthentication(
            this.state.username,
            this.state.password,
            error =>{
                this.setState({error:true})
                this.setState({message: error})
            },
            user => {
                sessionStorage.setItem("token", user._id)
                user.isAdmin ? sessionStorage.setItem("admin", "true"): null
                this.setState({error:false})
            }
        )
    }

    render() {
        if(sessionStorage.getItem("token")){
            return <Redirect to={routes.manager}/>
        } else {
            return (
                <div className="container-fluid">
                    <div className="home">
                        <div className="row">
                            <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                                <Sidebar state={Choice.NULL}/>
                            </div>
                            <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0" id="main">
                                <Header/>
                                {this.state.error ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.message}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close" onClick={()=> this.setState({error: false})}/>
                                    </div> : null
                                }
                                <div className=" col-md-7 offset-md-3 d-flex flex-column">
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
                </div>
            );
        }
    }
}

export default Login