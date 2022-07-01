import React from "react";
import {BsFillHouseFill, BsFillBellFill, BsPersonSquare, BsBell} from "react-icons/bs";
import "./Header.css"
import {Link} from "react-router-dom";
import routes from "../routes/Routes";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notify:false
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
                console.log(data)
                console.log(this._isMounted)
                console.log(this.state.notify)
                this._isMounted ? this.setState({notify: true}):null
            })
        }
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
                    <li className="nav-item">
                        <Link to={routes.notification}>
                            {this.state.notify ?
                            <BsFillBellFill className="text-white icon" size={36}/> :
                            <BsBell className="text-white icon" size={36}/> }
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Header
