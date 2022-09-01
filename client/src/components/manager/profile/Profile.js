import React from "react";
import Api from "../../api/Api";
import {Button, Form} from "react-bootstrap";
import {BsPencilSquare, BsPersonCircle, BsXLg} from "react-icons/bs";
import "./Profile.css"
import Alert from "../../alert/Alert";
import Choice from "../../../common/Choice";
import bcrypt from "bcryptjs";
import moment from "moment/moment";
import Util from "../../../common/Util";

const hsalt = bcrypt.genSaltSync(10)
let alertType = Choice.Alert

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({readOnly: false, edited:true})
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
        let change = false
        let psw = bcrypt.hashSync(this.state.user.password, hsalt)
        const db = moment(this.state.user.birthday, "DD/MM/YYYY", true).isValid();
        if(Object.values(this.state.user).filter(e=> e === "").length > 0) {
            this.setState(() =>({alertType: alertType.ERROR, message: "Uno o più campi risultano essere vuoti",
                hide: false}))
        } else if(!db || Util.mapDateISO(this.state.user.birthday) >= Util.getCurrentDate()){
            this.setState(() =>({alertType: alertType.ERROR, message: "La data risulta essere non valida",
                hide: false}))
        } else if(this.state.user.password.length < 8){
            this.setState(() =>({alertType: alertType.ERROR,
                message: "La password deve essere lunga almeno 8 caratteri", hide: false}))
        } else {
            if(this.state.user.password !== this.props.user.password){
                change = true
            }
             Api.updateProfileData(
             this.state.user._id,
             this.state.user.name,
             this.state.user.surname,
             this.state.user.birthday,
             this.state.user.username,
             change ? psw: this.props.user.password,
             change ? hsalt: this.props.user.salt,
             error => {this.setState(() =>({alertType: alertType.ERROR, message: error, hide: false}))},
             success => {this.setState(() =>(
                 {alertType: alertType.SUCCESS, message: success, hide: false, readOnly:true}))
                 if(change){
                     this.setState(prevState => ({
                         user: {
                             ...prevState.user,
                             password: psw,
                             salt: hsalt
                         }
                     }), () => this.props.handler(this.state.user))
                 } else {
                     this.props.handler(this.state.user)
                 }
             })


        }
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    closeEdit = () => {
        this.setState({readOnly:true, user: this.props.user})
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column">
                    {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                               type={this.state.alertType} message={this.state.message}/> : null}
                    {this.state.readOnly ? <BsPencilSquare className="align-self-end me-1 mt-3 text-primary edit"
                                                           size={32} onClick={this.handleEdit}/> :
                        <BsXLg className="align-self-end me-1 mt-3 text-primary edit" size={32}
                                                                                  onClick={this.closeEdit}/>}
                    <div className="text-center mt-3">
                        <BsPersonCircle className="profile card-img-top text-primary" size={180}/>
                        <div className="card-body col-md-6 offset-md-3">
                            <section>
                                <Form.Group className="text-start mb-5">
                                    <Form.Label className="my-2">Nome</Form.Label>
                                    <Form.Control type="text"
                                                  value={this.state.user.name}
                                                  name="name"
                                                  onChange={e => this.handleChange(e)}
                                                  readOnly={this.state.readOnly}/>

                                    <Form.Label className="my-2">Cognome</Form.Label>
                                    <Form.Control type="text"
                                                  value={this.state.user.surname}
                                                  name="surname"
                                                  onChange={e => this.handleChange(e)}
                                                  readOnly={this.state.readOnly}/>

                                    <Form.Label className="my-2">Data di nascita</Form.Label>
                                    <Form.Control type="text"
                                                  value={this.state.user.birthday}
                                                  name="birthday"
                                                  onChange={e => this.handleChange(e)}
                                                  readOnly={this.state.readOnly}/>

                                    <Form.Label className="my-2">Username</Form.Label>
                                    <Form.Control type="text"
                                                  value={this.state.user.username}
                                                  name="username"
                                                  onChange={e => this.handleChange(e)}
                                                  readOnly={true}/>

                                    <Form.Label className="my-2">Password</Form.Label>
                                    <Form.Control type="password"
                                                  value={this.state.user.password}
                                                  name="password"
                                                  onChange={e => this.handleChange(e)}
                                                  readOnly={this.state.readOnly}/>
                                    <span className="text-secondary" style={{fontSize:12}}>
                                        La password risulta più lunga del dovuto per una maggiore sicurezza </span>
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