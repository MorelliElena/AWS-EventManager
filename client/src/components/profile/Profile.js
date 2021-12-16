import React from "react";
import Navbar from "../sidebar/Navbar";
import Header from "../headerbar/Header";
import '../profile/Profile.css'
import {Redirect} from 'react-router-dom';
import Api from "../api/Api";
import {Form} from "react-bootstrap";
let routes = require("../routes/Routes")

class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem("token")){
            Api.getProfileData(sessionStorage.getItem("token"),
                error => console.log(error),
                user => this.setState({user: user}))

        }
    }

    render() {
        if (!sessionStorage.getItem("token")){
            return <Redirect to={routes.login}/>;
        } else {
            return (
                <div className="container-fluid">
                    <div className="home">
                        <div className="row">
                            <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                                <Navbar state={false}/>
                            </div>
                            <div className="col-md-9 col-7 offset-md-3 offset-5" id="main">
                                <Header/>
                                {!this.state.user ?
                                    <div> Loading ... </div> :
                                    <div className="text-center mt-3 h-100">
                                        <img className="card-img-top size-prof"
                                             src={require("../../public/user-icon.png")} alt="user"/>
                                        <div className="card-body col-md-7 offset-md-3 d-flex flex-column">
                                            <section className="text-start">
                                                <section>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Nome</Form.Label>
                                                        <Form.Control type="text" value={this.state.user.name}
                                                                      readOnly={true}/>

                                                        <Form.Label>Cognome</Form.Label>
                                                        <Form.Control type="text" value={this.state.user.surname}
                                                                      readOnly={true}/>

                                                        <Form.Label>Data di nascita</Form.Label>
                                                        <Form.Control type="text" value={this.state.user.birthday}
                                                                      readOnly={true}/>

                                                        <Form.Label>Username</Form.Label>
                                                        <Form.Control type="text" value={this.state.user.username}
                                                                      readOnly={true}/>

                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" value={this.state.user.password}
                                                                      readOnly={true}/>
                                                    </Form.Group>
                                                </section>
                                            </section>
                                            <br/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile