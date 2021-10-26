import React, { Component } from 'react';
import { Col, Container, Row} from "react-bootstrap";
import EventCard from "./events/EventCard";
import Navbar from "./sidebar/Navbar";
import Api from "./api/Api";

let filteredTags = [];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            tags: [],
            filter: false
        }
        this.filterHandler = this.filterHandler.bind(this)
    }

    filterHandler(event){
        console.log("evento: "+ event);
        if (event != null) {
            this.setState({filter: true});
            filteredTags = event.map(t => this.state.tags.find(el => el._id === t)).map(e => e.name)
            console.log(filteredTags);
        } else {
            this.setState({filter: false});
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

        Api.getTags(
            error => {
                console.log(error)
                //this.onError("Errore nel caricare la home. Ricaricare la pagina.")
            }, tags => {
                this.setState({tags:tags})
            }
        )
    }

    renderEvents = () => {
        if(!this.state.events){
            return (
                <div> Loading ... </div>
            )
        } else {
            let eventsList = this.state.events;
            if (this.state.filter) {
                eventsList = this.state.events.filter(e => filteredTags.every(t => e.tags.includes(t)));
                console.log(eventsList);
            }
            if (eventsList.length === 0 && this.state.filter) {
                return (
                    <div> Nessun risultato per la tua ricerca </div>
                )
            } else {
                return (
                    <div className="row row-cols-1 row-cols-md-3 g-4" key={"event-card-container"}>
                        {
                            eventsList.map(event =>
                                <div className="col" key={"col" + event._id}>
                                    <EventCard {...this.props} key={"event-card" + event._id}
                                               eventInfo={event}/>
                                </div>)
                        }
                    </div>
                )
            }
        }
    }

    render() {
        return(
            <div className= "home">
                <h1> Event Hub </h1>
                <Container>
                   <Row>
                        <Col  xs={6} md={4}>
                            <Navbar handler = {this.filterHandler}/>
                        </Col>
                        <Col  xs={12} md={8}>
                            <div className="show-events" >
                                {this.renderEvents()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Home;