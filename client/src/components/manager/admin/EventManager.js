import Alert from "../../alert/Alert";
import {Button} from "react-bootstrap";
import {BsFillPlusCircleFill, BsFillTrashFill, BsPencilSquare} from "react-icons/bs";
import React from "react";
import EventCreation from "./EventCreation";
import Choice from "../../../common/Choice";
import Api from "../../api/Api";
import EditEvent from "./EditEvent";


class EventManager extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            events: props.events,
            readOnly: false,
            hide: true,
            alertType: Choice.Alert,
            message: undefined,
            show: false,
            edit: false,
            toBeEdited: undefined,
            follow: []
        }

        this.showForm = this.showForm.bind(this)
        this.showMessage = this.showMessage.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }

    cancelEvent = (event) => {
        Api.getFollowers(event._id,
          () => {},
          success => {
              console.log(success)
              this.setState({follow: success})
              Api.cancelEvent(event._id, () => {
                  },
                  success => {
                      console.log(success)
                      this.props.socket.emit("notification", {
                          sender: sessionStorage.getItem("token"),
                          eventId: event._id,
                          title: event.name,
                          type: "cancelled",
                          text: "L'evento è stato cancellato",
                          followers: this.state.follow
                      })
                  })
          })
    }

    editEvent = (event) => {
        console.log(event)
       this.setState({edit: true, toBeEdited:event})
    }

    componentDidMount() {

    }

    showForm = (state) => {
        this.setState({show:state})
    }

    showMessage = (msg, hide, type, show, event, update) => {
        this.setState({message:msg, hide:hide, alertType: type})
        if(event){
            if(update){
                let updatedList = this.state.events.map(obj => {
                    if (obj._id === event._id) {
                        let location = {
                            ...obj.location,
                            city: event.location.city,
                            address: event.location.address,
                            province: event.location.province
                        }
                        return {
                            ...obj,
                            name: event.name,
                            description: event.description,
                            tags:event.tags,
                            daily_capacity: event.daily_capacity,
                            location: location
                        };
                    }
                    return obj;
                })
                this.setState({events: updatedList, edit: false})
                this.updateMessage(event)
            } else {
                this.setState({events: [...this.state.events, event]})
            }
           this.props.update(this.state.events)
        }
        if(!show){
            this.setState({show:false})
        }
    }

    updateMessage = (event) => {
        Api.getFollowers(event._id,
            () => {},
            success => {
                console.log(success)
                this.setState({follow: success})
                this.props.socket.emit("notification", {
                    sender: sessionStorage.getItem("token"),
                    eventId: event._id,
                    title: event.name,
                    type: "edited",
                    text: "L'evento è stato modificato",
                    followers: this.state.follow
                })
            })
    }

    showWindow = () => {
        this.setState({show: true})
    }

    showEdit = () => {
        this.setState({edit: false})
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
                <div className="d-flex flex-column">
                    {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                               type={this.state.alertType} message={this.state.message}/> : null}
                    <div className="mt-3">
                        {!this.state.edit ?
                             this.state.show ?
                                <EventCreation handler1={this.showForm} handler2={this.showMessage}/>
                                :
                                <div>
                                    <div className="text-center">
                                        <Button className="btn mt-3 mb-3 add-btn" onClick={this.showWindow}>
                                            <BsFillPlusCircleFill className="add" size={30}/>
                                        </Button>
                                    </div >
                                    <ul className="list-group overflow-auto">
                                        { this.state.events.length !== 0 ? this.state.events.map(events =>
                                            <li className="list-group-item d-flex justify-content-between
                                                align-items-center" key={"tag" + events._id}>
                                                <div>
                                                    <div className="fw-bold">
                                                        {events.name} <br/>
                                                        {events.date_start}-
                                                        {events.date_finish}<br/>
                                                    </div>
                                                    <div>
                                                        Luogo:<br/>
                                                        {events.location.address}, {events.location.city}<br/>
                                                        {events.location.province} <br/>
                                                        Stato:
                                                        {events.status === "on" ?
                                                            <span className="text-success"> attivo</span> :
                                                            <span className="text-danger"> cancellato</span>
                                                        }

                                                    </div>
                                                </div>
                                                {events.status === "on" ?
                                                    <div className="d-flex flex-column">
                                                        <div className="btn btn-primary mb-3"
                                                             onClick={() => this.editEvent(events)}>
                                                            <BsPencilSquare className="trash text-white" size={20}/>
                                                        </div>
                                                        <div className="btn btn-danger"
                                                             onClick={() => this.cancelEvent(events)}>
                                                            <BsFillTrashFill className="trash text-white" size={20}/>
                                                        </div>
                                                    </div>
                                                :null}
                                            </li>) : null}
                                    </ul>
                                </div>:
                            <EditEvent edit={this.state.toBeEdited} handler1={this.showEdit}
                                       handler2={this.showMessage}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
} export default EventManager
