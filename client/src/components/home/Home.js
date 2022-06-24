import React, {Component} from 'react';
import EventCard from "../events/EventCard";
import Sidebar from "../sidebar/Sidebar";
import Api from "../api/Api";
import Header from "../headerbar/Header";
import Spinner from "../spinner/Spinner";
import Choice from "../../common/Choice";
import "../home/Home.css"
let filteredTags = [];
let locFilter;
let searchString;
let eventsList = [];

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            tags: [],
            filter: false,
            search: false,
            loc: false
        }
        this.filterHandler = this.filterHandler.bind(this)
        this.locHandler = this.locHandler.bind(this)
        this.searchHandler = this.searchHandler.bind(this)
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
        }
    }

    searchHandler(event) {
        if(event !== ""){
           this.setState({search:true})
            searchString = event
        } else {
           this.setState({search:false})
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
        if(this.state.events){
            eventsList = this.state.events;
            if (this.state.filter) {
                eventsList = eventsList.filter(e => filteredTags.every(t => e.tags.includes(t)));
            }
            if(this.state.loc) {
                eventsList = eventsList.filter(e => e.location.province === locFilter)
            }
            if(this.state.search){
                console.log(eventsList)
                console.log(searchString)
                const str = searchString.toLowerCase()
                eventsList = eventsList.filter(e => e.location.city.toLowerCase().includes(str)
                    || e.name.toLowerCase().includes(str)
                    || e.description.toLowerCase().includes(str))
                console.log(eventsList)
            }

            if (eventsList.length === 0 && (this.state.filter || this.state.loc || this.state.search)) {
                return (
                    <div className="text-center"> Nessun risultato per la tua ricerca </div>
                )
            } else {
                return (
                    <div className="row equal row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 pt-3
                    mx-1 vh-100 overflow-auto" key={"event-card-container"} >
                        {
                            eventsList.map(event =>
                                <div className= "col d-flex px-1 h-50 pb-2" key={"col" + event._id}>
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
                    <div className="row" >
                        <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                            <Sidebar handler = {this.filterHandler} state = {Choice.SidebarChoice.HOME}
                                     handler1 ={this.locHandler}
                                     handler2 ={this.searchHandler}/>
                        </div>
                        <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0" id="main">
                            <Header/>
                            <div className="show-events">
                                {
                                    this.state.events.length === 0 ?
                                       <Spinner/> : this.renderEvents()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;