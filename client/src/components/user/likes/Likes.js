import React from "react";
import Api from "../../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import Spinner from "../../spinner/Spinner";
import "../booking/Booking.css"

class Likes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            likes : []
        }
    }

    componentDidMount() {
        Api.getUserLikes(this.state.userId,
            error => {
                console.log(error)
                this.setState({showDefaultMessage: true})
                //this.onError("Errore nel caricare le informazioni dell'evento. Ricaricare la pagina.")
            },
            likes=> {
                this.setState({likes:likes})
            })
    }

    render() {
        return (
            <div>
                { this.state.likes.length === 0 ?
                    <div className="h-100"><Spinner/></div> :
                    <div>
                        <h4 className="text-center mt-3 mb-3">Eventi d'interesse</h4>
                        <ul className="list-group">
                            {this.state.likes.map(likes =>
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    key={"tag" + likes.id}>
                                    <div>
                                        <div
                                            className="fw-bold">{likes.name}</div>
                                        <div>
                                            {Api.mapDate(likes.date_start)} - {Api.mapDate(likes.date_finish)}<br/>
                                            {likes.location.address}<br/>
                                            {likes.location.city}<br/>
                                            {likes.location.province}
                                        </div>
                                    </div>
                                    <div className="btn btn-danger" onClick={() => console.log("delete")}>
                                        <BsFillTrashFill className="text-white trash" size={20}/>
                                    </div>
                                </li>
                            )
                            }
                        </ul>
                    </div>
                }
            </div>
        );
    }

}

export default Likes