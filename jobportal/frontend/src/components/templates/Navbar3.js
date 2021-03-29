import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/home/recruiter" className="navbar-brand">Home</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/createjob" className="nav-link">Createjob</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/ucreated" className="nav-link">U_created</Link>
                            </li>
                            
                            <li className="navbar-item">
                                <Link to="/profile/recruiter" className="nav-link">My Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/accepted" className="nav-link">accepted</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}