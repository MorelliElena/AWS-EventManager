import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Choice from "../../common/Choice";
import Header from "../headerbar/Header";
import Profile from "./profile/Profile";
import Likes from "./likes/Likes";
import Bookings from "./booking/Bookings";
import LogOutDialog from "./logout/Logout";
import {Redirect} from "react-router-dom";
import Api from "../api/Api";
import Spinner from "../spinner/Spinner";
let routes = require("../routes/Routes");

class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection : "",
            show:true,
            logout: false,
            user: undefined
        }
        this.userSelection = this.userSelection.bind(this)
        this.hide = this.hide.bind(this)
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
        if(sessionStorage.getItem("token")){
            Api.getProfileData(sessionStorage.getItem("token"),
                error => console.log(error),
                user => this.setState({user: user}))

        }
    }

    hide = () => {
        this.setState({show:false})
    }

    logOut = () => {
       this.setState({show:false, logout: true})
       sessionStorage.clear()
    }

    userSelection = (event) => {
        this.setState({selection:event})
        if(event === Choice.UserComponents.LOGOUT){
            this.setState({show:true})
        }
    }

    renderSwitch(param) {
        switch(param) {
            case Choice.UserComponents.PROFILE:
                return <Profile user={this.state.user}/>;
            case Choice.UserComponents.LIKES:
                return <Likes id={sessionStorage.getItem("token")} likes={this.state.user.likes}/>;
            case Choice.UserComponents.BOOKING:
                return <Bookings id={sessionStorage.getItem("token")} bookings={this.state.user.bookings}/>;
            default:
                return <Profile user={this.state.user}/>;
        }
    }

    render() {
        if(this.state.logout){
            return <Redirect to={routes.login}/>
        } else {
            return (
                <div className="container-fluid">
                    <div className="home">
                        <div className="row">
                            <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                                <Sidebar state={Choice.SidebarChoice.PROFILE} handler4={this.userSelection}/>
                            </div>
                            <div className="col-md-9 col-7 offset-md-3 offset-5 ps-0 pe-1 pt-0" id="main">
                                <Header/>
                                {!this.state.user ?  <div className="h-100"><Spinner/></div> :
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
                </div>
            );
        }
    }
}
export default UserManager