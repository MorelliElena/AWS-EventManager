import React from "react";
import Api from "../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import "./Booking.css";

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            bookings : props.bookings
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <h4 className="text-center mt-3 mb-3">Prenotazioni</h4>
                    <ul className="list-group">
                        {this.state.bookings.map(booking =>
                            <li className="list-group-item d-flex justify-content-between align-items-center"
                                key={"tag" + booking.id_booking}>
                                <div>
                                    <div className="fw-bold">
                                        {booking.name} <br/>
                                        {Api.mapDate(booking.date)}
                                    </div>
                                    <div>
                                        {booking.location.address}<br/>
                                        {booking.location.city}<br/>
                                        {booking.location.province}
                                    </div>
                                </div>
                                <div className="btn btn-danger" onClick={() => console.log("delete")}>
                                    <BsFillTrashFill className="trash text-white" size={20}/>
                                </div>
                            </li>
                        )
                        }
                    </ul>
                </div>
            </div>
        );
    }

}

export default Bookings