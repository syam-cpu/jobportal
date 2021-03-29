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
            education: [
                { id: 1, name: 'hero', start: '1222', end: '2222' },
                { id: 2, name: 'her', start: '1222', end: '2222' },
                { id: 3, name: 'he', start: '1222', end: '2222' },
                { id: 4, name: 'h', start: '1222', end: '2222' },
                { id: 5, name: 'heross', start: '1222', end: '2222' },


            ],
            skills: [],
            date: null

        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangestart = this.onChangestart.bind(this);
        this.onChangeend = this.onChangeend.bind(this);
        this.newrow = this.newrow.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteItemeducation = this.deleteItemeducation.bind(this);

    }
    onChangeUsername(event, ind) {
        let list = [...this.state.education];
        list[ind].name = event.target.value

        this.setState({ education: list });
    }


    handleOptionChange(changeEvent) {
        let list = [...this.state.skills];


        list.push(changeEvent.target.value)

        this.setState({ skills: list });
    };


    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangestart(event, ind) {
        let list = [...this.state.education];
        list[ind].start = event.target.value

        this.setState({ education: list });
    }
    onChangeend(event, ind) {
        let list = [...this.state.education];
        list[ind].end = event.target.value

        this.setState({ education: list });

    }
    newrow() {
        let list = [...this.state.education];
        let f = 1;
        if (list.length == 0) {
            f = -1
        }
        else {

            f = list[list.length - 1].id
        }
        let newrow = {
            id: f + 1,
            name: '',
            start: '',
            end: ''

        }
        list.push(newrow)

        this.setState({ education: list });

    }
    deleteItem(event, i) {
        let list = [...this.state.skills];
        const updatedlist = list.filter((item, index) => index !== i);
        this.setState({
            skills: updatedlist
        })
    }
    deleteItemeducation(event,i){
        let list = [...this.state.education];
        const updatedlist = list.filter((item, index) => index !== i);
        this.setState({
            education: updatedlist
        })

    }
    editor(event, i) {
        let list = [...this.state.skills];
        list[i] = event.target.value
        this.setState({
            skills: list
        })
    }
    addskill(event) {
        let list = [...this.state.skills];
        const newitem = ''
        list.push(newitem)

        this.setState({
            skills: list
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            education: this.state.education,
            skills: this.state.skills,
            _id: localStorage.getItem("_id")
        }
        alert(newUser._id)
        axios.post("http://localhost:4000/user/profile/applicant/edit", newUser).then(alert("saved"))
            .catch(function (err) {
                alert(err + "fsaffasfasfasfasfa")

            })


    }

    componentWillMount() {

        {
            const newUser = { email: localStorage.getItem("email") }
            alert(localStorage.getItem("email"))

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


                })
                .catch(
                    function (err) {
                        alert(err + "kjhhhkhkhk")
                    }
                )
        }
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
                        <h1>educations:</h1>    <button className="add-btn"
                            onClick={this.newrow}>add</button>
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
                                                    <TableCell> <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.education[ind].name}
                                                        onChange={(e) => this.onChangeUsername(e, ind)} /></TableCell>
                                                    <TableCell> <input type="number"
                                                        className="form-control"
                                                        required
                                                        placeholder="YYYY"
                                                        min="1000"
                                                        max="9999"
                                                        value={this.state.education[ind].start}
                                                        onChange={(e) => this.onChangestart(e, ind)} /></TableCell>
                                                    <TableCell> <input type="number"
                                                        className="form-control"
                                                        placeholder="YYYY"
                                                        min="1000"
                                                        max="9999"
                                                        value={this.state.education[ind].end}
                                                        onChange={(e) => this.onChangeend(e, ind)} /></TableCell>
                                                    <TableCell> <button className="btn btn-primary"
                                            onClick={(e) => this.deleteItemeducation(e, ind)}>remove</button> </TableCell>

                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </div>
                    <div className="form-group">
                        <label>Select skills</label>
                        <br />
                        <input
                            type="radio"
                            name="react-tips"
                            value="C++"
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                        />C++
                            <br />
                        <input
                            type="radio"
                            name="react-tips"
                            value="C"
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                        />C
                            <br />
                        <input
                            type="radio"
                            name="react-tips"
                            value="pyhton"
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                        />python
                        <br />
                        <br />
                        <label>Add new skill</label>
                        <br />
                        <button className="btn btn-primary"
                            onClick={(e) => this.addskill(e)}>ADD new skill</button>
                        <br />
                        <br />


                        <label> your skills</label>
                        <ul>
                            {this.state.skills.map((item, ind) => {
                                return (

                                    <li>     <input type="text"
                                        className="form-control"
                                        value={this.state.skills[ind]}
                                        onChange={(e) => this.editor(e, ind)} /> <button className="btn btn-primary"
                                            onClick={(e) => this.deleteItem(e, ind)}>remove</button>

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
                <Link to={"/profile/applicant"} >gsgrgarfa</Link>



            </div>
        )
    }
}

export default Profile;
