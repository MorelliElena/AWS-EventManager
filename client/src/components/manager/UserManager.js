import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Choice from "../../common/Choice";
import Profile from "./profile/Profile";
import Likes from "./user/likes/Likes";
import Bookings from "./user/booking/Bookings";
import LogOutDialog from "./logout/Logout";
import {Redirect} from "react-router-dom";
import Api from "../api/Api";
import Spinner from "../spinner/Spinner";
import EventManager from "./admin/EventManager";

let routes = require("../routes/Routes");

class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection : "",
            show:true,
            logout: false,
            user: null,
            events:[],
            notify: false
        }
        this._isMounted = true
        this.userSelection = this.userSelection.bind(this)
        this.hide = this.hide.bind(this)
        this.logOut = this.logOut.bind(this)
        this.userUpdate = this.userUpdate.bind(this)
        this.eventsUpdate = this.eventsUpdate.bind(this)
        this.userInterestsUpdate = this.userInterestsUpdate.bind(this)
    }

    componentDidMount() {
        if(sessionStorage.getItem("token")){
            Api.getProfileData(sessionStorage.getItem("token"),
                error => console.log(error),
                user => this.setState({user: user}))

        }

        if(sessionStorage.getItem("admin")){
            Api.getOwnerEvents(sessionStorage.getItem("token"),
                error => console.log(error),
                events => this.setState({events:events}))
        }

        this._isMounted = true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this._isMounted !== prevState._isMounted ){
            this.props.login(true)
        }

        if(this.props.socket !== prevProps.socket) {
            this.props.socket.on("sendNotification", data => {
                if(this._isMounted) {
                    console.log(data)
                    this.update(data)
                }
            })
        }

    }

    update = (data) => {
        console.log(data)
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                bookings: prevState.user.bookings
                    .map(el => (el.id_event === data.eventId ? {...el, status: data.type} : el)),
                likes: prevState.user.likes
                    .map(el => (el.id_event === data.eventId ? {...el, status: data.type} : el))
            }
        }));
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    userInterestsUpdate = (data, booking) => {
        if(booking){
            this.setState(prevState =>({
                user : {
                    ...prevState.user,
                    bookings : data
                }
            }))
        } else {
            this.setState(prevState =>({
                user : {
                    ...prevState.user,
                    likes : data
                }
            }))
        }
    }

    userUpdate = (e) => {
        this.setState({user: e})
    }

    hide = () => {
        this.setState({show:false})
    }

    logOut = () => {
        this.setState({show:false, logout: true, socket:null})
        sessionStorage.clear()
        this.props.login(false)
    }

    userSelection = (event) => {
        this.setState({selection:event})
        if(event === Choice.UserComponents.LOGOUT){
            this.setState({show:true})
        }
    }

    eventsUpdate = (events) =>{
        this.setState({events: events})
    }

    renderSwitch(param) {
        const user = sessionStorage.getItem("token")
        switch(param) {
            case Choice.UserComponents.PROFILE:
                return <Profile user={this.state.user} handler={this.userUpdate}/>;
            case Choice.UserComponents.LIKES:
                return <Likes id={user} likes={this.state.user.likes} handler={this.userInterestsUpdate}/>;
            case Choice.UserComponents.BOOKING:
                return <Bookings id={sessionStorage.getItem("token")} bookings={this.state.user.bookings}
                                 handler={this.userInterestsUpdate}/>;
            case Choice.UserComponents.EVENTS:
                return <EventManager socket = {this.props.socket} events={this.state.events}
                                     update={this.eventsUpdate}/>;
            default:
                return <Profile user={this.state.user} handler={this.userUpdate}/>;
        }
    }

    render() {
        if(this.state.logout){
            return <Redirect to={routes.login}/>
        } else {
            return (
                <div className="container-fluid d-flex flex-column">
                    <div className="row flex-grow-1">
                        <div className="sidebar col-5 col-md-3 ps-0 pe-1 position-sticky" id="sticky-sidebar">
                            {sessionStorage.getItem("admin") !== null ?
                                <Sidebar state={Choice.SidebarChoice.ADMIN} handler4={this.userSelection}/> :
                                <Sidebar state={Choice.SidebarChoice.PROFILE} handler4={this.userSelection}/>
                                }
                            </div>
                            <div className="col ps-1 pe-1 pt-1 overflow-auto" id="main">
                                {!sessionStorage.getItem("token") ?
                                    <Redirect to={routes.login}/> :
                                    !this.state.user ? <div className="h-100"><Spinner/></div> :
                                    this.renderSwitch(this.state.selection)
                            }
                            {
                                this.state.selection === Choice.UserComponents.LOGOUT ?
                                    this.state.show ?
                                        <LogOutDialog handler2={this.logOut} handler1={this.hide}/>
                                        : null
                                    : null
                            }

                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default UserManager