import React from "react";
import {BsFillHouseFill,BsFillBellFill, BsPersonSquare} from "react-icons/bs";
import "./Header.css"
import {Link} from "react-router-dom";
import routes from "../routes/Routes";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <nav className="navbar navbar-expand header">
                <ul className="nav navbar-nav m-auto me-md-5">
                    <li className="nav-item">
                        <Link to={routes.home}> <BsFillHouseFill className="text-white icon" size={36}/> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.profile}> <BsPersonSquare className="text-white mx-4 icon " size={36}/> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.notification}> <BsFillBellFill className="text-white icon" size={36}/> </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Header
