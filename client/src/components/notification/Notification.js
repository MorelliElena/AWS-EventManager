import React from "react";
import Sidebar from "../sidebar/Sidebar";

class Notification extends React.Component{
    componentDidMount() {
    }

    render() {
        return (
            <div className="container-fluid">
                <div className= "home">
                    <div className="row">
                        <div className="sidebar col-5 col-md-3 ps-0 pe-1 position-sticky min-vh-100" id="sticky-sidebar">
                            <Sidebar state = {false}/>
                        </div>
                        <div className="col ps-0 pe-1 pt-0 overflow-auto" id="main">
                            Notification
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification