import React from "react";
import Api from "../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import "../booking/Booking.css"
import Alert from "../../alert/Alert";

class Likes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            likes : props.likes,
            error: false,
            message: undefined,
            hide:true
        }
    }

    componentDidMount() {

    }

    deleteLike = (likeId) => {
        Api.removeLike(
            this.state.userId,
            likeId,
            error => this.setState({error:true, message: error, hide: false}),
            response =>{
                this.setState({error:false, message: response, hide: false})
                this.setState({likes: this.state.likes.filter(e => e._id !== likeId)})
            })
    }

    render() {
        return (
            <div>
                {!this.state.hide ? <Alert error={this.state.error} message={this.state.message}/> : null}
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
                                <div className="btn btn-danger" onClick={() => this.deleteLike(likes._id)}>
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