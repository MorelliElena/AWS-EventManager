import React from "react";
import Api from "../../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import "../booking/Booking.css"
import Alert from "../../../alert/Alert";
import Choice from "../../../../common/Choice";

let alertType = Choice.Alert

class Likes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            likes : props.likes,
            alertType: Choice.Alert,
            message: undefined,
            hide:true
        }
        this.closeWindow = this.closeWindow.bind(this)
    }

    componentDidMount() {

    }

    deleteLike = (likeId, id_event) => {
        Api.removeLike(
            this.state.userId,
            id_event,
            likeId,
            error => this.setState({alertType:alertType.ERROR, message: error, hide: false}),
            response =>{
                this.setState({alertType:alertType.SUCCESS, message: response, hide: false})
                this.setState({likes: this.state.likes.filter(e => e._id !== likeId)})
            })
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div>
                {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                           type={this.state.alertType} message={this.state.message}/> : null}
                <div>
                    <h4 className="text-center mt-3 mb-3">Eventi d'interesse</h4>
                    <ul className="list-group">
                        {this.state.likes.length !== 0 ?this.state.likes.map(likes =>
                            <li className="list-group-item d-flex justify-content-between align-items-center"
                                key={"tag" + likes._id}>
                                <div>
                                    <div className="fw-bold">
                                        {likes.name}
                                    </div>
                                    <div>
                                        {Api.mapDate(likes.date_start)} - {Api.mapDate(likes.date_finish)}<br/>
                                        {likes.location.address}<br/>
                                        {likes.location.city}<br/>
                                        {likes.location.province}
                                    </div>
                                </div>
                                <div className="btn btn-danger" onClick={() => this.deleteLike(likes._id, likes.id_event)}>
                                    <BsFillTrashFill className="text-white trash" size={20}/>
                                </div>
                            </li>
                        ): <div className="text-center"> Nessun evento d'interesse presente </div>
                        }
                    </ul>
                </div>
            </div>
        );
    }

}

export default Likes