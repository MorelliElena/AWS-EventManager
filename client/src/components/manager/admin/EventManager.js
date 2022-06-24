import Alert from "../../alert/Alert";
import {Button} from "react-bootstrap";
import {BsFillPlusCircleFill, BsFillTrashFill} from "react-icons/bs";
import React from "react";
import EventCreation from "./EventCreation";

class EventManager extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            events: props.events,
            readOnly: false,
            hide: true,
            error: false,
            message: undefined,
            show: false
        }

        this.showForm = this.showForm.bind(this)
        this.showMessage = this.showMessage.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }


    showForm = (state) => {
        this.setState({show:state})
    }

    showMessage = (msg, hide, error, show, event) => {
        this.setState({message:msg, hide:hide, error:error})
        if(event){
           this.setState({events: [...this.state.events, event]})
           this.props.update(event)
        }
        if(!show){
            this.setState({show:false})
        }
    }

    showWindow = () => {
        this.setState({show: true})
    }

    closeWindow = (state) => {
        this.setState({hide:state})
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column">
                    {!this.state.hide ? <Alert handler={this.closeWindow} state={this.state.hide}
                                               error={this.state.error} message={this.state.message}/> : null}
                    <div className="mt-3">
                        {this.state.show ?
                            <EventCreation handler1={this.showForm} handler2={this.showMessage}/>
                            :
                            <div>
                                <div className="text-center">
                                    <Button className="btn mt-3 mb-3" onClick={this.showWindow}>
                                        <BsFillPlusCircleFill  size={30}/>
                                    </Button>
                                </div >
                                <ul className="list-group">
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
                                                    {events.location.province}
                                                </div>
                                            </div>
                                            <div className="btn btn-danger"
                                                 onClick={() => console.log("click")}>
                                                <BsFillTrashFill className="trash text-white" size={20}/>
                                            </div>
                                        </li>) : null}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
} export default EventManager
