import React from 'react';
import Api from '../api/Api'
import './EventInfo.css'
import Sidebar from "../sidebar/Sidebar";
import Header from "../headerbar/Header";
import {BsFillExclamationCircleFill, BsStar, BsStarFill} from "react-icons/bs";
import {Redirect} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import PeopleCounter from "./PeopleCounter";
import Alert from "../alert/Alert";
import Choice from "../../common/Choice";

let routes = require("../routes/Routes")
let alertType = Choice.Alert

class EventInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            idEvent: props.match.params.id,
            eventInfo: undefined,
            showDefaultMessage: false,
            redirection: false,
            alertType: Choice.Alert,
            message: undefined,
            hide: true,
            like: false
        }
        this.bookingHandler = this.bookingHandler.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }

    componentDidMount() {
        if(sessionStorage.getItem("admin")){
            this.setState({alertType:alertType.INFO,
                message: "Alcune funzioni risultano non essere attive in modalità amministratore ", hide: false})
        }
        Api.getEventInformation(
            this.state.idEvent,
            error => {
                console.log(error)
                this.setState({showDefaultMessage: true})
                //this.onError("Errore nel caricare le informazioni dell'evento. Ricaricare la pagina.")
            },
            event => {
                this.setState({eventInfo:event,
                counter: Array(event.booking.length).fill(0)})
            }
        )
        if (sessionStorage.getItem("token")) {
            Api.getIfEventIsLiked(sessionStorage.getItem("token"), this.state.idEvent,
                () => console.log(),
                () => this.setState({like:true}))

        }

    }

    bookingHandler = (e, participants) => {
        if (!sessionStorage.getItem("token")){
            console.log("entra book")
            this.setState({redirection: true})
        } else {
            console.log(e)
            console.log(participants)
            Api.addUserBooking(
                sessionStorage.getItem("token"),
                this.state.idEvent,
                e._id,
                this.state.eventInfo.name,
                e.date,
                this.state.eventInfo.location,
                participants,
                e.n_participants,
                error =>{
                    this.setState({alertType:alertType.ERROR, message: error, hide: false})
                },
                response => {
                    this.updateParticipantsField(e, participants)
                    this.setState({alertType:alertType.SUCCESS, message: response, hide:false})
                })
        }
    }

    updateParticipantsField(e, participants){
        let pos = this.state.eventInfo.booking.findIndex(i => i._id === e._id)
        let items = [...this.state.eventInfo.booking]
        items[pos] = {
            ...items[pos],
            n_participants: e.n_participants + participants
        }
        this.setState(prevState =>({
            eventInfo: {
                ...prevState.eventInfo,
                booking: items
            }
        }))
    }

    like = () => {
        if (!sessionStorage.getItem("token")){
            this.setState({redirection: true})
        } else {
            Api.addUserLike(
                sessionStorage.getItem("token"),
                this.state.idEvent,
                this.state.eventInfo.name,
                this.state.eventInfo.date_start,
                this.state.eventInfo.date_finish,
                this.state.eventInfo.location,
                error => this.setState({alertType:alertType.ERROR, message: error, hide: false}),
                response => {
                    this.setState({alertType:alertType.SUCCESS, message: response, hide:false, like:true})
                })
        }
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                        <Sidebar state = {false}/>
                    </div>
                    <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0">
                        <Header/>
                        { !this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                                    type={this.state.alertType} message={this.state.message}/> : null}
                        { !this.state.showDefaultMessage && !this.state.eventInfo ?
                            <div className="text-center h-100">
                                <Spinner/>
                            </div> :
                            this.state.redirection ? <Redirect to={routes.login}/> :
                                <div className="text-center h-100 pt-3 ">
                                    {!sessionStorage.getItem("admin") ?
                                        <div className="d-flex justify-content-end btn pe-1 ps-1 pt-0"
                                             onClick={this.like}>
                                            {!this.state.like ?
                                                <BsStar className="text-primary star" size={32}/> :
                                                <BsStarFill className="text-primary star" size={32}/>
                                            }
                                        </div> : null
                                    }
                                    <div>
                                        {this.state.eventInfo.img ?
                                            <img className="card-img-top size"
                                                 src={this.state.eventInfo.img} alt="Event"/> : null}

                                    </div>
                                    <div className="card-body p-2">
                                        <h5 className="card-title">{this.state.eventInfo.name}</h5>
                                        <section className="card-text">
                                            <p>{this.state.eventInfo.description}</p>
                                            <section>
                                                {this.state.eventInfo.date_start} - {this.state.eventInfo.date_finish}
                                                <br/>
                                                {this.state.eventInfo.location.address} <br/>
                                                {this.state.eventInfo.location.city} <br/>
                                                {this.state.eventInfo.location.province}
                                            </section><br/>
                                            <section className="mb-4">
                                                {this.state.eventInfo.tags.map((tag) =>
                                                        <span className="badge rounded-pill bg-info text-dark"
                                                              key = {"tag" + tag + this.state.eventInfo._id}
                                                              style={{marginLeft: .65, marginRight: .65}}>
                                                            {tag}
                                                        </span>
                                                )}
                                            </section>
                                            <section>
                                                {this.state.eventInfo.full ?
                                                    <div style={{color: "red"}}>
                                                        Posti Terminati
                                                        <BsFillExclamationCircleFill
                                                            className="text-danger mx-3" size={26}/>
                                                    </div>:<div/>
                                                }
                                            </section>
                                            { sessionStorage.getItem("admin") ? null :
                                                <PeopleCounter booking={this.state.eventInfo.booking}
                                                               handler={(e, participants) =>
                                                                   this.bookingHandler(e, participants,)}/>
                                            }
                                    </section>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default EventInfo