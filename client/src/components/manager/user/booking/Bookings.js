import React from "react";
import Api from "../../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import "./Booking.css";
import Alert from "../../../alert/Alert";

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            bookings : props.bookings,
            error: false,
            message: undefined,
            hide: true
        }
        this.closeWindow = this.closeWindow.bind(this)
    }

    componentDidMount() {

    }

    deleteBooking = (bookingId, eventId, participants) => {
        Api.removeBooking(
            this.state.userId,
            eventId,
            bookingId,
            participants,
            error => this.setState({error:true, message: error, hide: false}),
            response =>{
                this.setState({error:false, message: response, hide: false})
                this.setState({bookings: this.state.bookings.filter(e => e._id !== bookingId)})
            })
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div>
                <div>
                    { !this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                                error={this.state.error} message={this.state.message}/> : null}
                    <h4 className="text-center mt-3 mb-3">Prenotazioni</h4>
                    <ul className="list-group">
                        { this.state.bookings.length !== 0 ? this.state.bookings.map(booking =>
                            <li className="list-group-item d-flex justify-content-between align-items-center"
                                key={"tag" + booking._id}>
                                <div>
                                    <div className="fw-bold">
                                        {booking.name} <br/>
                                        {Api.mapDate(booking.date)}
                                    </div>
                                    <div>
                                        Numero posti prenotati: {booking.participants}<br/>
                                        Luogo:<br/>
                                        {booking.location.address}, {booking.location.city}<br/>
                                        {booking.location.province}
                                    </div>
                                </div>
                                <div className="btn btn-danger" onClick={() =>
                                    this.deleteBooking(booking._id, booking.id_event, booking.participants)}>
                                    <BsFillTrashFill className="trash text-white" size={20}/>
                                </div>
                            </li>
                        ): <div className="text-center"> Nessuna prenotazione presente </div>
                        }
                    </ul>
                </div>
            </div>
        );
    }

}

export default Bookings