import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            education: [],
            skills: [],
            date: null

        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);

    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangePhonenumber(event) {
        this.setState({ phonenumber: event.target.value });
    }

    componentWillMount() {
        {/*} axios.get('http://localhost:4000/profile/recruiter') // unimplemented
.then(response => {
this.setState({ details: response.data });
})n
.catch(function (error) {
console.log(error);
})*/}
        const newUser = { email: localStorage.getItem("email") }
        alert( localStorage.getItem("email"))

        axios.post('http://localhost:4000/user/profile/applicant', newUser).
            then(res => {
                //alert(res.data.user.email + "dFAFAF");
                this.setState({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    password: res.data.user.password,
                    education: res.data.user.education,
                    skills: res.data.user.skils


                })

                {/*alert(this.state.name +
this.state.email +
this.state.password+ 
this.state.phonenumber+ 
this.state.bio )*/}

            })
            .catch(
                function (err) {
                    alert(err + "kjhhhkhkhk")
                }
            )
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.history.push('/profile/applicant/edit')

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <h1>{this.state.name}</h1>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <h1>{this.state.password}</h1>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <h1>{this.state.email}</h1>
                    </div>
                    <div className="form-group">
                        <h1>educations:</h1>
                        <Grid item xs={12} md={9} lg={9}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> Education institution.</TableCell>
                                            <TableCell>Start year</TableCell>
                                            <TableCell>End year</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.education.map((education, ind) => (
                                                <TableRow key={ind}>
                                                    
                                                    <TableCell>{education.name}</TableCell>
                                                    <TableCell>{education.start}</TableCell>
                                                    <TableCell>{education.end}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </div>
                    <div className="form-group">
                        <label>skills: </label>
                        <ul>
                            {this.state.skills.map(item => {
                                return (

                                    <li>     {item}

                                    </li>

                                );
                            })}

                        </ul>

                        </div>
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                    {/*<Link to = {"/profile/recruiter/edit"} ></Link>*/}

                </form>



            </div>
        )
    }
}

export default Profile;
