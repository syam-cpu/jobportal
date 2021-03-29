import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import Button from '@material-ui/core/Button';

var string = "MyString"

function Buttonstatus(props) {
    const applied_count = props.members.length
    // alert(applied_count)
    var mem = props.members
    const max_applications = props.max_applications
    // alert(max_applications)
    const email = localStorage.getItem("email")
    const isLoggedIn = props.isLoggedIn;
    if (applied_count < max_applications) {
        var chem = mem.filter(a =>
            (a.email == email)

        )
        if (props.length >= 1) {
            return <button type="button" class="btn btn-warning">youcant</button>
        }
        else {
            // alert(chem.length)
            if (props.rem == 0) {
                return <button type="button" class="btn btn-danger">full</button>
            }
            else {
                if (chem.length == 0)
                    return <button class="btn btn-primary" value="Alert the text input" onClick={(e) => props.onClick(e, props.id)}> apply </button>;
                else
                    return <button type="button" class="btn btn-success">applied</button>
            }
        }

    }
    return <button type="button" class="btn btn-danger">full</button>;
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            enteredName: '',
            length: '',
            jobs_applied: '',
            filterjobtype: '',
            filterduration: '',
            filtermax: '',
            filtermin: '',
            searchname: '',
            sortName: true,
            sortoption: ''


        }
        this.Applybutton = this.Applybutton.bind(this);
        this.get_rating = this.get_rating.bind(this)
        this.get_prompt = this.get_prompt.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.checkcount = this.checkcount.bind(this)
        this.filterjobtype = this.filterjobtype.bind(this)
        this.filterduration = this.filterduration.bind(this)
        this.filtermin = this.filtermin.bind(this)
        this.filtermax = this.filtermax.bind(this)
        this.searchname = this.searchname.bind(this)
        this.sortChange = this.sortChange.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
        this.sortoption = this.sortoption.bind(this)
        this.sortChangeduration = this.sortChangeduration.bind(this)
        this.sortChangerating = this.sortChangerating.bind(this)
        this.gowell = this.gowell.bind(this)




    }

    componentWillMount() {
        const email = localStorage.getItem("email")
        var newUser = {
            email: email
        }
        axios.post('http://localhost:4000/user/accepted', newUser).
            then(res => {
                //alert(res.data.user.email + "dFAFAF");
                console.log((res.data))
                this.setState({

                    length: res.data.length


                })


            })
            .catch(
                function (err) {
                    alert(err + "kjhhhkhkhk")
                }
            )





        axios.get('http://localhost:4000/user/jobs').
            then(res => {
                //alert(res.data.user.email + "dFAFAF");
                console.log((res.data))
                this.setState({

                    jobs: res.data


                })


            })
            .catch(
                function (err) {
                    alert(err + "kjhhhkhkhk")
                }
            )
        axios.post('http://localhost:4000/user/login/applicant', newUser)
            .then(res => {
                this.setState({
                    jobs_applied: res.data.user.jobs_applied

                })




            })


            .catch(

                function (error) {

                    console.log(error + "fafadfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

                })
    }
    get_rating(job) {
        var temp = [...job.rating]
        var cummulative = 0
        for (var i = 0; i < temp.length; i++) {
            cummulative = parseInt(temp[i].value, 10) + parseInt(cummulative, 10)
        }
        const average = cummulative / temp.length
        return average


    }
    handleClick = (event) => {

        /* call prompt() with custom message to get user input from alert-like dialog */
        const enteredName = prompt('Please enter your name')

        /* update state of this component with data provided by user. store data
           in 'enteredName' state field. calling setState triggers a render of
           this component meaning the enteredName value will be visible via the
           updated render() function below */
        this.setState({ enteredName: enteredName })
    }

    get_prompt() {
        const enteredName = prompt('Please enter Sop')
        this.setState({ enteredName: enteredName })




    }
    filterjobtype(event) {
        this.setState({ filterjobtype: event.target.value });
    }
    filterduration(event) {
        this.setState({ filterduration: event.target.value });
    }
    filtermax(event) {
        this.setState({ filtermax: event.target.value });
    }
    filtermin(event) {
        this.setState({ filtermin: event.target.value });
    }
    searchname(event) {
        this.setState({ searchname: event.target.value });
    }
    sortoption(event) {
        this.setState({ sortoption: event.target.value });
    }
    checkcount() {

        var big_data = [...this.state.jobs]
        var small_data = [...this.state.jobs_applied]
        var count = 0
        for (var i = 0; i < small_data.length; i++) {
            const id = small_data[i].id
            var state1 = small_data[i].state
            var state2 = ''
            for (var j = 0; j < big_data.length; j++) {
                if (big_data[j]._id == small_data[i].id) {
                    var third_data = [...big_data[j].members]
                    for (var z = 0; z < third_data.length; z++) {
                        if (third_data[z].email == localStorage.getItem("email")) {
                            state2 = third_data[z].state
                            if (state1 != "rejected" && state2 != "rejected" && state1 != "accepted") {
                                count++;
                            }

                        }

                    }


                }


            }
        }

        return count




    }
    Applybutton(event, id) {
        alert(event)
        alert(id)
       // this.get_prompt()
       const enteredName = prompt('Please enter Sop')
       

        alert(enteredName)
        var t = this.checkcount()
        alert(t)

        if (parseInt(t, 10) < 10) {

            const email = localStorage.getItem("email")
            const send_id = {
                id_job: id,
                email: email,
                sop: enteredName

            };
            axios.post("http://localhost:4000/user/applicant/button", send_id).then(alert("saved"))
                .catch(function (err) {
                    alert(err + "fsaffasfasfasfasfa")

                })
        }
        else {
            alert("you cant apply more than ten")
        }






    }
    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true)
                return a.salary - b.salary
            else
                return b.salary - a.salary
        });
        this.setState({
            jobs: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangeduration() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true)
                return a.duration - b.duration
            else
                return b.duration - a.duration
        });
        this.setState({
            jobs: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangerating() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true)
                return a.avg_rating - b.avg_rating
            else
                return b.avg_rating - a.avg_rating
        });
        this.setState({
            jobs: array,
            sortName: !this.state.sortName,
        })
    }

    renderIcon() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    gowell() {
        if (this.state.sortoption == "salary") {
            this.sortChange()
        }
        else if (this.state.sortoption == "duration") {
            this.sortChangeduration()
        }
        else {
            this.sortChangerating()
        }


    }



    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>


                filter
                <br />
                <FormControl>

                    JobType
                        <Select
                        native
                        value={this.state.filterjobtype}
                        onChange={this.filterjobtype}

                    >
                        <option aria-label="None" value="" />
                        <option value={"WFH"}>WFH</option>
                        <option value={"FULL TIME"}>FULL TIME</option>
                        <option value={"PART TIME"}>PART TIME</option>

                    </Select>
                </FormControl>
                <FormControl>

                    J
                        <Select
                        native
                        value={this.state.filterduration}
                        onChange={this.filterduration}

                    >
                        <option aria-label="None" value="" />
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>
                        <option value={"7"}>7</option>



                    </Select>
                </FormControl>

                min
                <input type="text"

                    value={this.state.filtermin}
                    onChange={this.filtermin}
                />


                max
                <input type="text"

                    value={this.state.filtermax}
                    onChange={this.filtermax}
                />
                <br />
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField
                            id="standard-basic"
                            label="Search"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            onChange={this.searchname}
                        />
                    </List>
                </Grid>
                <FormControl>


                    <Select
                        native
                        value={this.state.sortoption}
                        onChange={this.sortoption}

                    >
                        <option aria-label="None" value="" />
                        <option value={"salary"}>salary</option>
                        <option value={"duration"}>duration</option>
                        <option value={"rating"}>rating</option>




                    </Select>
                </FormControl>


                <TableCell> <Button onClick={this.gowell}>{this.renderIcon()}</Button></TableCell>


                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> title.</TableCell>




                                    <TableCell>  deadline    </TableCell>

                                    <TableCell>   jobtype    </TableCell>
                                    <TableCell>  duration    </TableCell>
                                    <TableCell> salary     </TableCell>
                                    <TableCell>  rating    </TableCell>
                                    <TableCell>  recruiter name    </TableCell>
                                    <TableCell>  recruiter email     </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.jobs.map((job, ind) => {
                                        var memrs = [...job.members]
                                        var counte = 0

                                        for (var i = 0; i < memrs.length; i++) {
                                            if (memrs[i].state == "accepted") {
                                                counte++

                                            }

                                        }
                                        var rem = job.maxpositions - counte
                                        if (this.state.searchname == '' || this.state.searchname == job.title.substring(0, this.state.searchname.length))
                                            if (this.state.filterjobtype == '' || this.state.filterjobtype == job.jobtype) {
                                                if (this.state.filterduration == '' || parseInt(this.state.filterduration) > job.duration) {
                                                    if (this.state.filtermin == '' || parseInt(this.state.filtermin) <= job.salary) {
                                                        if (this.state.filtermax == '' || parseInt(this.state.filtermax, 10) >= job.salary) {
                                                           if (Date.now() < Date.parse(job.deadline)) {

                                                                return (

                                                                    <TableRow key={ind}>

                                                                        <TableCell>{job.title}</TableCell>



                                                                        <TableCell> {job.deadline}</TableCell>

                                                                        <TableCell> {job.jobtype}</TableCell>
                                                                        <TableCell> {job.duration}</TableCell>
                                                                        <TableCell> {job.salary}</TableCell>
                                                                        <TableCell> {this.get_rating(job)} </TableCell>
                                                                        <TableCell> {job.recname} </TableCell>
                                                                        <TableCell> {job.recemail} </TableCell>
                                                                        <TableCell>  <Buttonstatus onClick={this.Applybutton} members={job.members} max_applications={job.maxapplications} id={job._id} length={this.state.length} rem={rem} />        </TableCell>

                                                                    </TableRow>
                                                                )
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>



            </div>
        )
    }
}