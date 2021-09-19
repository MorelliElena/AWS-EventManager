import React, { Component } from 'react';
import Axios from 'axios';
import EventInfo from './EventInfo.js'

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }
    componentDidMount() {
        Axios.get(`http://localhost:5000/api/events`)
            .then(res => {
                const items = res.data;
                this.setState({events:items})
            })
    }
    render() {
        if(this.state.events){
            return(
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {this.state.events.map(item => (
                        <EventInfo key ={item._id} item = {item}/>
                    ))}
                </div>
            )
        } else {
            return <p>Loading...</p>
        }
    }
}

export default Events;