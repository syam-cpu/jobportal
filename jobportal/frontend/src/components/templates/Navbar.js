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
                    <Link to="/home/applicant" className="navbar-brand">Home</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/appliedjobs" className="nav-link">Appliedjobs</Link>
                            </li>
                            
                            <li className="navbar-item">
                                <Link to="/profile/applicant" className="nav-link">My Profile</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}