import React from "react";
import Navbar from "../sidebar/Navbar";
import Header from "../headerbar/Header";


class Notification extends React.Component{
    render() {
        return (
            <div className="container-fluid">
                <div className= "home">
                    <div className="row">
                        <div className="col-md-3 col-5 px-1 position-fixed" id="sticky-sidebar">
                            <Navbar state = {false}/>
                        </div>
                        <div className="col-md-9 col-7 offset-md-3 offset-5" id="main">
                            <Header/>
                            Notification
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification