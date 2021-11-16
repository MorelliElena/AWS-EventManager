import React, { Component } from 'react';
import EventCard from "./events/EventCard";
import Navbar from "./sidebar/Navbar";
import Api from "./api/Api";
import Header from "./headerbar/Header";

let filteredTags = [];
let locFilter;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            tags: [],
            filter: false,
            loc: false
        }
        this.filterHandler = this.filterHandler.bind(this)
        this.locHandler = this.locHandler.bind(this)
    }

    filterHandler(event){
        if (event != null) {
            this.setState({filter: true});
            filteredTags = event.map(t => this.state.tags.find(el => el._id === t)).map(e => e.name)
            console.log(filteredTags);
        } else {
            this.setState({filter: false});
        }

    }

    locHandler(event){
        if (event != null) {
            if(event !== "Tutte le province"){
               this.setState({loc:true})
               locFilter = event
            } else {
               this.setState({loc:false})
            }
            console.log(event)
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
                eventsList = eventsList.filter(e => filteredTags.every(t => e.tags.includes(t)));
            }
            if(this.state.loc) {
                eventsList = eventsList.filter(e => e.location.province === locFilter)
                console.log(eventsList)
            }
            if (eventsList.length === 0 && (this.state.filter || this.state.loc)) {
                return (
                    <div> Nessun risultato per la tua ricerca </div>
                )
            } else {
                return (
                    <div className="row row-cols-1 row-cols-xl-5 row-cols-md-3 g-4" key={"event-card-container"}>
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
            <div className="container-fluid">
            <div className= "home">
                    <div className="row">
                        <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                            <Navbar handler = {this.filterHandler} state = {true} handler1 ={this.locHandler}/>
                        </div>
                        <div className="col-md-9 col-7 offset-md-3 offset-5" id="main">
                            <Header/>
                            <div className="show-events" >
                                {this.renderEvents()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;