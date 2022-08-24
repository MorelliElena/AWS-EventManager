import React from "react";
import Api from "../../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import "./Booking.css";
import Alert from "../../../alert/Alert";
import Choice from "../../../../common/Choice";
import routes from "../../../routes/Routes";
import Util from "../../../../common/Util";

let alertType = Choice.Alert

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            bookings : props.bookings,
            alertType: Choice.Alert,
            message: undefined,
            hide: true
        }
        this.closeWindow = this.closeWindow.bind(this)
        this._isMounted = true
    }

    componentDidMount() {
        this._isMounted = true

    }

    componentWillUnmount() {
        this._isMounted = false
    }

    deleteBooking = (bookingId, eventId, participants) => {
        Api.removeBooking(
            this.state.userId,
            eventId,
            bookingId,
            participants,
            error => this.setState({alertType:alertType.ERROR, message: error, hide: false}),
            response =>{
                this.setState({alertType:alertType.SUCCESS, message: response, hide: false})
                let events = this.props.bookings.filter(e => e._id !== bookingId)
                this.props.handler(events, true)
            })
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.hide !== this.state.hide){
            window.scrollTo(0, 0)
        }
    }

    render() {
        return (
            <div>
                <div>
                    { !this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                                type={this.state.alertType} message={this.state.message}/> : null}
                    <h4 className="text-center mt-3 mb-3">Prenotazioni</h4>
                    <ul className="list-group overflow-auto">
                        { this.props.bookings.length !== 0 ? this.props.bookings.map(booking =>
                            <li className="list-group-item" key={"tag" + booking._id}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href={routes.eventFromId(booking.id_event)}
                                       className="text-dark text-decoration-none">
                                        <div>
                                            <div className="fw-bold">
                                                {booking.name} <br/>
                                                {Util.mapDate(booking.date)}
                                            </div>
                                            <div>
                                                Numero posti prenotati: {booking.participants}<br/>
                                                Luogo:<br/>
                                                {booking.location.address}, {booking.location.city}<br/>
                                                {booking.location.province}
                                            </div>
                                        </div>
                                    </a>
                                    <div className="btn btn-danger" onClick={() =>
                                        this.deleteBooking(booking._id, booking.id_event, booking.participants)}>
                                        <BsFillTrashFill className="trash text-white" size={20}/>
                                    </div>
                                </div>
                                {booking.status === "edited" ?
                                    <footer className="text-center footer alert alert-warning">
                                        L'evento è stato stato modificato.
                                        Clicca sulle informazioni per verificare
                                    </footer> : booking.status === "cancelled" ?
                                        <footer className="text-center footer alert alert-danger">
                                            L'evento è stato cancellato.
                                        </footer> : null}
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