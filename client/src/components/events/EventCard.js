import React from "react";
import {Link} from 'react-router-dom';
import "./EventCard.css"
let routes = require("../routes/Routes")

class EventCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventInfo: props.eventInfo
        }
    }

    render() {
        return (
                <div className="card text-center d-flex">
                    {this.state.eventInfo.img ?
                        <div className="wrapper">
                            <img className="card-img-top image" src={this.state.eventInfo.img}
                                 alt="locandina"/>
                        </div> : null}
                    {/*d-flex flex-column justify-content-end*/}
                    <div className="card-body d-flex flex-column justify-content-between" >
                        <div className="card-text">
                        <h5 className="card-title">{this.state.eventInfo.name}</h5>
                            <section>
                                {this.state.eventInfo.date_start} - {this.state.eventInfo.date_finish} <br/>
                                {this.state.eventInfo.location.city} <br/>
                                {this.state.eventInfo.location.province}
                            </section>
                            <section >
                                {this.state.eventInfo.tags.map((tag) =>
                                    <span className="badge rounded-pill bg-info text-dark"
                                          key = {"tag" + tag + this.state.eventInfo._id}
                                          style={{marginLeft: .65, marginRight: .65}}>
                                    {tag}
                                    </span>
                                )}
                            </section>
                        </div><br/>
                        <section className="filter d-flex flex-column justify-content-end">
                            <Link className="btn btn-primary "
                                  to={routes.eventFromId(this.state.eventInfo._id)}> Mostra di più </Link>
                        </section>
                    </div>
                </div>
        )
    }
}
export default EventCard;
