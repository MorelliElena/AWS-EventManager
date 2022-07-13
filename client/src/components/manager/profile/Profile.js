import React from "react";
import Api from "../../api/Api";
import {Button, Form} from "react-bootstrap";
import {BsPencilSquare, BsPersonCircle} from "react-icons/bs";
import "./Profile.css"
import Alert from "../../alert/Alert";
import Choice from "../../../common/Choice";

let alertType = Choice.Alert

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            user: props.user,
            alertType: Choice.Alert,
            message: undefined,
            readOnly: true,
            hide: true
        }
        this.closeWindow = this.closeWindow.bind(this)
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
        if(Object.values(this.state.user).filter(e=> e === "").length > 0) {
            this.setState(() =>({alertType: alertType.ERROR, message: "Uno o più campi risultano essere vuoti",
                hide: false}))
        } else {
            this.props.handler(this.state.user)
                 Api.updateProfileData(
                 this.state.user._id,
                 this.state.user.name,
                 this.state.user.surname,
                 this.state.user.birthday,
                 this.state.user.username,
                 this.state.user.password,
                 error => {this.setState(() =>({alertType: alertType.ERROR, message: error, hide: false}))},
                 success => {this.setState(() =>(
                     {alertType: alertType.SUCCESS, message: success, hide: false, readOnly:true}))})
        }
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column">
                    {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                               type={this.state.alertType} message={this.state.message}/> : null}
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

export default Profile