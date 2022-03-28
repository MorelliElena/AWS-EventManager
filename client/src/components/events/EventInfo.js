import React from 'react';
import Api from '../api/Api'
import './EventInfo.css'
import {Button} from "react-bootstrap";
import Navbar from "../sidebar/Navbar";
import Header from "../headerbar/Header";
import {BsFillExclamationCircleFill} from "react-icons/bs";
import {Redirect} from "react-router-dom";
import Spinner from "../spinner/Spinner";
let routes = require("../routes/Routes")

class EventInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            idEvent: props.match.params.id,
            eventInfo: undefined,
            showDefaultMessage: false,
            redirection: false
        }

    }

    componentDidMount() {
        Api.getEventInformation(
            this.state.idEvent,
            error => {
                console.log(error)
                this.setState({showDefaultMessage: true})
                //this.onError("Errore nel caricare le informazioni dell'evento. Ricaricare la pagina.")
            },
            event => {
                this.setState({eventInfo:event})
            }
        )
    }

    bookInfo = e => {
        if (!sessionStorage.getItem("token")){
            console.log("entra")
            this.setState({redirection: true})
        } else {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                        <Navbar state = {false}/>
                    </div>
                    <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0">
                        <Header/>
                        { !this.state.showDefaultMessage && !this.state.eventInfo ?
                            <div className="text-center h-100">
                                <Spinner/>
                            </div> :
                            this.state.redirection ? <Redirect to={routes.login}/> :
                                <div className="text-center h-100 pt-3">
                                    {this.state.eventInfo.img ?
                                        <img className="card-img-top size"
                                             src={this.state.eventInfo.img} alt="Event"/> : null}
                                    <div className="card-body p-2">
                                        <h5 className="card-title">{this.state.eventInfo.name}</h5>
                                        <section className="card-text">
                                            <p>{this.state.eventInfo.description}</p>
                                            <section>
                                                {this.state.eventInfo.date_start} - {this.state.eventInfo.date_finish}<br/>
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
                                            <div className="d-flex flex-column justify-content-center">
                                                <ul className="list-group text-start book">
                                                    { this.state.eventInfo.booking.map(day =>
                                                        <li className="list-group-item text-center"
                                                            key = {"booking"+ day.id}>
                                                            <div>
                                                                <div>
                                                                    Data: {Api.mapDate(day.date)} <br/>
                                                                    Posti Occupati: {day.n_participants}/
                                                                    {day.max_participants}
                                                                </div>
                                                                <div>
                                                                    <Button className="btn btn-primary mt-3 button"
                                                                            onClick={()=> this.bookInfo(day)}>
                                                                        Prenota
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
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