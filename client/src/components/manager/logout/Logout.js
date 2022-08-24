import {Modal} from "react-bootstrap";
import React from "react";
import "./Logout.css"
class LogOutDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            show: true
        }

        this.onHide = this.onHide.bind(this)
        this.onLogOut = this.onLogOut.bind(this)
    }

    onHide = () =>{
        this.props.handler1()
    }

    onLogOut = () =>{
        this.props.handler2()
    }

    render() {
        return(
            <Modal show={this.state.show} animation={false} >
                <div className="modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="contained-modal-title-vcenter">
                                Logout
                            </h5>
                            <div className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"
                                 onClick={this.onHide}/>
                        </div>
                        <div className="modal-body">
                            <p>
                                Sei sicuro di voler effettuare il logout ?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <div className="btn btn-success logout-btn" onClick={this.onLogOut}>SI</div>
                            <div className="btn btn-danger logout-btn" onClick={this.onHide}>NO</div>
                        </div>
                    </div>
                </div>
        </Modal>
        );
    }

}

export default LogOutDialog