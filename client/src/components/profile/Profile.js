import React from "react";
import Navbar from "../sidebar/Navbar";
import Header from "../headerbar/Header";
import {Redirect} from 'react-router-dom';
let routes = require("../routes/Routes")

class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            logged: false
        }
    }

    componentDidMount() {


    }


    render() {
        if (!sessionStorage.getItem("token")){
            return <Redirect to={routes.login}/>;
        } else {
            return (
                <div className="container-fluid">
                    <div className="home">
                        <div className="row">
                            <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                                <Navbar state={false}/>
                            </div>
                            <div className="col-md-9 col-7 offset-md-3 offset-5" id="main">
                                <Header/>
                                Profile
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile