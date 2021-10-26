import React from 'react';
import Api from '../api/Api'
import '../events/EventInfo.css'
import {Button} from "react-bootstrap";

let routes = require("../routes/Routes")

class EventInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            idEvent: props.match.params.id,
            eventInfo: undefined,
            showDefaultMessage: false,
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

    render() {
        if (!this.state.showDefaultMessage && !this.state.eventInfo) {
            return <div> Loading ... </div>
        } else if(!this.state.showDefaultMessage && this.state.eventInfo) {
            return (
                <div className="row justify-content-md-center">
                    <div className="card text-center h-100">
                        <div className="figure">
                        {this.state.eventInfo.img ?
                            <img className="card-img-top prova" src={this.state.eventInfo.img} alt="Card image cap"/> : null}
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.eventInfo.name}</h5>
                                <section className="card-text">
                                    <p>{this.state.eventInfo.description}</p>
                                    <section>
                                        {this.state.eventInfo.date_start} - {this.state.eventInfo.date_finish} <br/>
                                        {this.state.eventInfo.location.address} <br/>
                                        {this.state.eventInfo.location.city} <br/>
                                        {this.state.eventInfo.location.province}
                                    </section>
                                    <section>
                                        {this.state.eventInfo.tags.map((tag) =>
                                                <span className="badge rounded-pill bg-info text-dark"
                                                      key = {"tag" + tag + this.state.eventInfo._id}
                                                      style={{marginLeft: .65, marginRight: .65}}>
                                        {tag}
                                    </span>
                                        )}
                                    </section>
                                </section><br/>
                                <section>
                                    {this.state.eventInfo.n_participants}/{this.state.eventInfo.max_participants}
                                </section><br/>
                                <section>
                                    <Button className="btn btn-primary"> Participate </Button>
                                </section>
                            </div>
                    </div>
                </div>
            );
        }
    }
}
export default EventInfo