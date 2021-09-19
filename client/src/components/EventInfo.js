import React from "react";
const moment = require('moment');

class EventInfo extends React.Component {
    render() {
        return(
            <div className="col">
                <div className="card text-center h-100" >
                    {this.props.item.img ? <img className="card-img-top" src={this.props.item.img} alt="Card image cap"/> : null}
                    <div className="card-body">
                        <h5 className="card-title">{this.props.item.name}</h5>
                        <p className="card-text">
                            {this.props.item.desc}
                            <section>
                                {moment(this.props.item.date_start).format("DD/MM/YYYY")}-
                                {moment(this.props.item.date_finish).format("DD/MM/YYYY")} <br />
                                {this.props.item.location.address} <br />
                                {this.props.item.location.city} <br />
                                {this.props.item.location.province}
                            </section>
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default EventInfo;
