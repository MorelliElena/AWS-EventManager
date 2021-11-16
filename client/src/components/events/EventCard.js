import React from "react";
import {Link} from 'react-router-dom';
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
            <div>
                <div className="card text-center h-100">
                    {this.state.eventInfo.img ?
                        <img className="card-img-top" alt="Card image cap" src={this.state.eventInfo.img}/> : null}
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
                        <Link className="btn btn-primary"
                              to={routes.eventFromId(this.state.eventInfo._id)}> Show more </Link>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
export default EventCard;
