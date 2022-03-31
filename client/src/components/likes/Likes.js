import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Choice from "../../common/Choice";
import Header from "../headerbar/Header";
import Api from "../api/Api";
import {BsFillTrashFill} from "react-icons/bs";
import Spinner from "../spinner/Spinner";

class Likes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.match.params.id,
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
            <div className="container-fluid">
                <div className="home">
                    <div className="row">
                        <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                            <Sidebar state={Choice.PROFILE}/>
                        </div>
                        <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0" id="main">
                            <Header/>
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
                                                            {Api.mapDate(likes.date_start)} - {Api.mapDate(likes.date_finish)}
                                                            {likes.location.address}<br/>
                                                            {likes.location.city}<br/>
                                                            {likes.location.province}
                                                        </div>
                                                    </div>
                                                    <div className="btn btn-danger" onClick={() => console.log("delete")}>
                                                        <BsFillTrashFill className="text-white" size={20}/>
                                                    </div>
                                                </li>
                                            )
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Likes