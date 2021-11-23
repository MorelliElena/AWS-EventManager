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
            <nav className="navbar navbar-expand-md header">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={routes.home}> <BsFillHouseFill className="text-white" size={36}/> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.home}> <BsPersonSquare className="text-white mx-3" size={36}/> </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.home}> <BsFillBellFill className="text-white" size={36}/> </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Header
