import React from "react";
import {BsFillHouseFill, BsFillBellFill, BsPersonSquare} from "react-icons/bs";
import "./Header.css"
import {Link} from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";

let routes = require("../../components/routes/Routes")

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notify:[]
        }
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.socket !== prevProps.socket ) {
            this.props.socket.on("sendNotification", data => {
                if(this._isMounted){
                    console.log(data)
                    this.setState((prevState => ({
                        notify: [...prevState.notify, data]
                    })))
                }
            })
        }
    }

    markAsRead = () => {
        this.setState((() => ({
            notify: []
        })))
    }

    render() {
        return (
            <nav className="navbar navbar-expand header">
                <ul className="nav navbar-nav m-auto me-md-5">
                    <li className="nav-item">
                        <Link to={routes.home}>
                            <BsFillHouseFill className="text-white icon" size={36}/> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.manager}>
                            <BsPersonSquare className="text-white mx-4 icon " size={36}/> </Link>
                    </li>
                    <Dropdown>
                        <Dropdown.Toggle className="drop-down">
                            {this.state.notify.length > 0 ?
                                <div className="counter"> {this.state.notify.length} </div> : null
                            }
                            <BsFillBellFill className="text-white icon" size={36}/>
                        </Dropdown.Toggle>
                        {this.state.notify.length > 0 ?
                        <Dropdown.Menu className="menu text-center d-flex flex-column ">
                            {this.state.notify.map(e =>

                                <Dropdown.Item href = {routes.eventFromId(e.eventId)} key={e.eventId}>
                                    <h5>{e.title}</h5>
                                    {e.text}
                                </Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Button className="read btn btn-primary" onClick={this.markAsRead}>
                                Segna come già letti
                            </Button>
                        </Dropdown.Menu>
                            :null}
                    </Dropdown>
                </ul>
            </nav>
        );
    }
}
export default Header
