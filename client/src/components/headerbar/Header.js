import React from "react";
import {BsFillHouseFill, BsFillBellFill, BsPersonSquare,BsXLg} from "react-icons/bs";
import "./Header.css"
import {Link} from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";
import Api from "../api/Api";
import Util from "../../common/Util";

let routes = require("../../components/routes/Routes")

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications:[]
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
                        notifications:[data, ...prevState.notifications]
                    })))
                }
            })

            this.props.socket.on("checkNotification", () => {
                this.checkNotification()
            })


        }

        if(this.props.logged !== prevProps.logged ) {
            this.checkLogin()
        }
    }

    checkLogin = () => {
        if(sessionStorage.getItem("token") === null) {
            this.setState({notifications: []})
        }
    }

    markAsRead = () => {
        Api.markNotifications(this.state.notifications,
            error => console.log(error),
            () => {
                this.setState({notifications: this.state.notifications.map(function (e)
                    {e.read = true; return e})})
                console.log(this.state.notifications)
            })
    }

    checkNotification = () =>{
        if(this.props.logged) {
            Api.getUserNotification(sessionStorage.getItem("token"),
                error => console.log(error),
                success => this.setState({notifications: success}))
        }
    }

    delete = (id) => {
        Api.deleteNotification(id,
            error => console.log(error),
            () => this.setState({notifications: this.state.notifications.filter(e => e._id !== id)}))
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
                    <Dropdown onToggle={this.checkNotification}>
                        <Dropdown.Toggle className="drop-down">
                            {this.state.notifications.filter(e => e.read === false).length > 0 ?
                                <div className="counter">
                                    {this.state.notifications.filter(e => e.read === false).length}
                                </div> : null
                            }
                            <BsFillBellFill className="text-white icon" size={36}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="menu text-center overflow-auto">
                            {this.props.logged ?
                                <div>
                                <Button className="read btn btn-primary" onClick={this.markAsRead}>
                                Segna come già letti
                                </Button>
                                <Dropdown.Divider />
                                    {this.state.notifications.length === 0 ?
                                        <Dropdown.Item> Nessuna notifica presente </Dropdown.Item> :
                                        this.state.notifications.map(e =>
                                            <div className="item d-flex justify-content-between text-center w-auto"
                                                 key={e._id}>
                                                <Dropdown.Item
                                                    className={e.read === false ? "text-dark" : "text-secondary"}
                                                    href={routes.eventFromId(e.eventId)}>
                                                    <h6>{e.name}</h6>
                                                    {e.msg}<br/>
                                                    {Util.mapTimeZone(e.date)}
                                                </Dropdown.Item>
                                                <BsXLg className="trash text-primary"
                                                       onClick={() => this.delete(e._id)} size={20}/>
                                            </div>
                                        )
                                    }
                                </div> : <Dropdown.Item> Effettua l'accesso </Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </nav>
        );
    }
}
export default Header
