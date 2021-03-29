import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Initialpage from './components/Common/initialpage'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'   
import Navbar2 from './components/templates/Navbar2' 
import Navbar3 from './components/templates/Navbar3' 
import Profile from './components/Users/Profile'
import Profile2 from './components/Users/profile2'
import Appliedjobs from './components/applicant/appliedJobs'
import Dashboard from './components/applicant/dashboard'
import Creatjobs from './components/recruiter/createJob'
import U_created from './components/recruiter/U_created'
import editjob from './components/recruiter/editjob'
import id_wise from './components/recruiter/id_wise_applications'
import id_wise1 from './components/recruiter/id_wise_application1'
import accepted from './components/recruiter/accepted'

import Edit from './components/Users/edit2'
import Edit1 from './components/Users/edit'
import app from './components/Users/test'



function App() {
  return (
    <Router>
      <div className="container">
      
        <br/>
        <Route path="/" exact component={Navbar2}/>
        <Route path="/" exact component={Initialpage}/>
        <Route path="/register" exact component={Navbar2}/>
        <Route path="/register" component={Register}/>
        
      
        
        <Route path="/home/applicant" exact component={Navbar}/>
        <Route path="/home/applicant" exact component={Home}/>
        <Route path="/dashboard" exact component={Navbar}/>
        <Route path="/dashboard" exact component={Dashboard}/>

        <Route path="/appliedjobs" exact component={Navbar}/>
        <Route path="/appliedjobs" exact component={Appliedjobs}/>
     
        <Route path="/profile/applicant" exact component={Navbar}/>
        <Route path="/profile/applicant" exact component={Profile}/>
        <Route path="/profile/applicant/edit" exact component={Edit1}/>

        
        <Route path="/home/recruiter" exact component={Navbar3}/>
        <Route path="/home/recruiter" exact component={Home}/>
        <Route path="/createjob" exact component={Navbar3}/>
        <Route path="/createjob" exact component={Creatjobs}/>
        <Route path="/ucreated" exact component={Navbar3}/>
        <Route path="/ucreated" exact component={U_created}/>
        <Route path="/ucreated/edit" exact component={editjob}/>
        <Route path="/ucreated/id_wise" exact component={id_wise}/>

        <Route path="/accepted" exact component={Navbar3}/>
        <Route path="/accepted" exact component={accepted}/>
     
        <Route path="/profile/recruiter" exact component={Navbar3}/>
        <Route path="/profile/recruiter" exact component={Profile2}/>
        <Route path="/profile/recruiter/edit" component={Edit}/>

      </div>
    </Router>
  );
}

export default App;
