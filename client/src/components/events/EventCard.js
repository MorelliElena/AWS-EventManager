import React from "react";
import {Link} from 'react-router-dom';
import Api from '../api/Api'
let routes = require("../routes/Routes")

class EventCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        Api.getEvents(
            error => {
                console.log(error)
                //this.onError("Errore nel caricare la home. Ricaricare la pagina.")
            }, events => {
                this.setState({events:events})
            }
        )
    }

    render() {
        if(!this.state.events){
            return <div> Loading ... </div>
        } else {
            return (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {this.state.events.map( event =>
                    <div className="col">
                        <div className="card text-center h-100">
                            {event.img ?
                                <img className="card-img-top" src={event.img} alt="Card image cap"/> : null}
                            <div className="card-body">
                                <h5 className="card-title">{event.name}</h5>
                                <section className="card-text">
                                    <p>{event.description}</p>
                                    <section>
                                        {event.date_start} - {event.date_finish} <br/>
                                        {event.location.address} <br/>
                                        {event.location.city} <br/>
                                        {event.location.province}
                                    </section>
                                    <section>
                                        {event.tags.map((tag) =>
                                                <span className="badge rounded-pill bg-info text-dark"
                                                      style={{marginLeft: .65, marginRight: .65}}>
                                        {tag}
                                    </span>
                                        )}
                                    </section>
                                </section><br/>
                                <section>
                                <Link className="btn btn-primary" to={routes.eventFromId(event._id)}> Show
                                    more </Link>
                                </section>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            );
        }
    }
}
export default EventCard;
