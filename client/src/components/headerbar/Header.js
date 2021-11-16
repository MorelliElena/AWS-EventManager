import React from "react";
import "./Header.css"
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm header">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 3</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Header
