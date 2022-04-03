import React from "react";
import {Redirect} from 'react-router-dom';
import Api from "../../api/Api";
import {Alert, Button, Form} from "react-bootstrap";
import {BsPencilSquare, BsPersonCircle} from "react-icons/bs";
import "./Profile.css"
let routes = require("../../routes/Routes")

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            user: props.user,
            error: false,
            message: undefined,
            readOnly: true
        }
    }

    componentDidMount() {

    }

    handleEdit = () => {
        this.setState({readOnly: false})
    }

    handleChange = e => {
        this.setState(prevState =>({
            user: {
                ...prevState.user,
                [e.target.name]: e.target.value
            }
        }))
    }

    handleSubmission = () => {
        console.log(this.state.user)
        Api.updateProfileData(
            this.state.user._id,
            this.state.user.name,
            this.state.user.surname,
            this.state.user.birthday,
            this.state.user.username,
            this.state.user.password,
            error => {this.setState(() =>({error: true, message: error}))},
            success => {this.setState(() =>({error: false, message: success, readOnly:true}))})
    }

    renderMessage() {
       return this.state.error ?
                <Alert className="text-center mt-2" variant="danger">
                    {this.state.message}
                </Alert>
                :
                <Alert className="text-center mt-2" variant="success">
                    {this.state.message}
                </Alert>
    }
    render() {
        if (!sessionStorage.getItem("token")){
            return <Redirect to={routes.login}/>;
        } else {
            return (
                <div>
                    <div className="d-flex flex-column">
                        { this.state.message ? this.renderMessage() : null}
                        <BsPencilSquare className="align-self-end me-1 mt-3 text-primary edit" size={32}
                                        onClick={this.handleEdit}/>
                        <div className="text-center mt-3">
                            <BsPersonCircle className="profile card-img-top text-primary" size={180}/>
                            <div className="card-body col-md-6 offset-md-3">
                                <section>
                                    <Form.Group className="text-start mb-5">
                                        <Form.Label className="my-2">Nome</Form.Label>
                                        <Form.Control type="text"
                                                      defaultValue={this.state.user.name}
                                                      name="name"
                                                      onChange={e => this.handleChange(e)}
                                                      readOnly={this.state.readOnly}/>

                                        <Form.Label className="my-2">Cognome</Form.Label>
                                        <Form.Control type="text"
                                                      defaultValue={this.state.user.surname}
                                                      name="surname"
                                                      onChange={e => this.handleChange(e)}
                                                      readOnly={this.state.readOnly}/>

                                        <Form.Label className="my-2">Data di nascita</Form.Label>
                                        <Form.Control type="text"
                                                      defaultValue={this.state.user.birthday}
                                                      name="birthday"
                                                      onChange={e => this.handleChange(e)}
                                                      readOnly={this.state.readOnly}/>

                                        <Form.Label className="my-2">Username</Form.Label>
                                        <Form.Control type="text"
                                                      defaultValue={this.state.user.username}
                                                      name="username"
                                                      onChange={e => this.handleChange(e)}
                                                      readOnly={this.state.readOnly}/>

                                        <Form.Label className="my-2">Password</Form.Label>
                                        <Form.Control type="password"
                                                      defaultValue={this.state.user.password}
                                                      name="password"
                                                      onChange={e => this.handleChange(e)}
                                                      readOnly={this.state.readOnly}/>
                                    </Form.Group>
                                </section>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <Button className="btn btn-primary align-self-center"
                                            onClick={this.handleSubmission}
                                            hidden={this.state.readOnly}> Save </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile