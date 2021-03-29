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


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs_applied: [],
            jobs: [],
            title: "",
            job_type: "",
            sortName :true,
            sortoption :'',
            temp :[]

        }

        this.getstatus = this.getstatus.bind(this)
        this.getstatus1 = this.getstatus1.bind(this)
        this.changestate = this.changestate.bind(this)
        this.limitreject = this.limitreject.bind(this)
        this.geteducation = this.geteducation.bind(this)
        this.getskill = this.getskill.bind(this)

        this.sortChangename = this.sortChangename.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
        this.sortoption = this.sortoption.bind(this)
        this.sortChangedate= this.sortChangedate.bind(this)
        this.sortChangerating = this.sortChangerating.bind(this)
        this.gowell = this.gowell.bind(this)
        






    }


    componentDidMount() {


        const newUser = { job_id: localStorage.getItem("id") }
        alert(localStorage.getItem("email"))

        axios.post('http://localhost:4000/user/jobe', newUser).
            then(res => {

                //alert(res.data.user.email + "dFAFAF");
                this.setState({

                    jobs_applied: res.data.user.members,
                    title: res.data.user.title,
                    job_type: res.data.user.jobtype




                })

            })



            .catch(
                function (er) {
                    alert(er + "k")
                }
            )


        axios.get('http://localhost:4000/user/applicant').
            then(res => {




                this.setState({

                    jobs: res.data,



                })


            })
            .catch(
                function (err) {
                    alert(err + "kjhhhkhkhk")
                }
            )
    }

    getstatus(id) {
        var list = [...this.state.jobs_applied]
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].email) {
                // alert(list[i].state)
                const u = {
                    state: list[i].state,
                    sop: list[i].sop,
                    date: list[i].date

                }
                return u

            }
        }


    }
    getstatus1(email, job) {
        var list = [...job.jobs_applied]
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == localStorage.getItem("id")) {
                return list[i].state
            }

        }
    }

    changestate(email, num, name) {
        var k = this.getstatus(email).state
        if (k == "applied") {
            k = "shortlisted"
        }
        else {
            k = "accepted"
        }
        if (num == 0) {
            k = "rejected"
        }

        const send_id = {
            id_job: localStorage.getItem("id"),
            email: email,
            sop: this.getstatus(email).sop,
            date: this.getstatus(email).date,
            state: k,
            title: this.state.title,
            job_type: this.state.job_type,
            name: name,
            eemail: localStorage.getItem("email")

        };
        axios.post("http://localhost:4000/user/recruiter/button", send_id).then(alert("saved"))
            .catch(function (err) {
                alert(err + "fsaffasfasfasfasfa")

            })


    }
    limitreject(job) {
        if (this.getstatus(job.email).state !== "accepted") {
            return <>
                <TableCell><button color='#fff' onClick={(e) => this.changestate(job.email, 1, job.name)}> to next stage</button></TableCell>
                <TableCell><button color='#fff' onClick={(e) => this.changestate(job.email, 0, job.name)}> reject</button></TableCell>
            </>

        }
        else {
            return <h1>:)-----------(:</h1>
        }
    }

    geteducation(job) {
        const collection = job.education.map(a => {
            return (
                <ul>
                   <li>{a.name}</li>
                   <li>{a.start}</li>
                   <li>{a.end}</li>
                </ul>)
        })
        return collection

    }
    getskill(job){
        const collection = job.skils.map(a => {
            return (
                
                   <li>{a}</li>
                   
            )})
        return collection

    }
    sortChangename(mem) {
        console.log(mem)
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = mem;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if(flag == true)
            return a.name - b.name

            else
               return b.name -a.name
        });
        this.setState({
            temp: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangedate(mem) {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if(flag == true)
            return a.duration - b.duration
            else
               return b.duration -a.duration
        });
        this.setState({
            jobs: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangerating(mem) {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if(flag == true)
            return  a.avg_rating - b.avg_rating
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
    gowell(e,mem){
        if(this.state.sortoption == "name"){
            this.sortChangename(mem)
        }
        else if(this.state.sortoption == "date"){
            this.sortChangedate(mem)
        }
        else{
            this.sortChangerating(mem)
        }


    }
    sortoption(event) {
        this.setState({ sortoption : event.target.value });
    }





    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        var jobs_applied = [...this.state.jobs_applied]
        var jobs = [...this.state.jobs]
        var ids = []
        var states = []
        for (var i = 0; i < jobs_applied.length; i++) {
            ids.push(jobs_applied[i].email)
            states.push(jobs_applied[i].state)


        }

        var mem = jobs.filter((a) => ids.indexOf(a.email) !== -1)

        const collcetion = mem.map((job, ind) => {
            if (this.getstatus(job.email).state != "rejected" && this.getstatus1(job.email, job) !== "rejected") {
                return (
                    // <ex job = {a} />
                    <TableRow>



                        <TableCell>{job.name}</TableCell>

                        <TableCell>{this.getskill(job)}</TableCell>
                        <TableCell>{this.geteducation(job)}</TableCell>
                        <TableCell>{this.getstatus(job.email).sop}</TableCell>
                        <TableCell>rating babai</TableCell>
                        <TableCell>{this.getstatus(job.email).state}</TableCell>

                        {this.limitreject(job)
                        }


                    </TableRow>


                )
            }

        })





        return (
            <div><Grid item xs={12} md={9} lg={9}>
            
        </Grid>
        <FormControl>

        
            <Select
            native
            value={this.state.sortoption}
            onChange={this.sortoption}

        >
            <option aria-label="None" value="" />
            <option value={"name"}>name</option>
            <option value={"date"}>date</option>
            <option value={"rating"}>rating</option>
           



        </Select>
    </FormControl>


        <TableCell> <Button onClick={(e)=>this.gowell(e,mem)}>{this.renderIcon()}</Button></TableCell>

                < Grid item xs={12} md={9} lg={9} >
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>name</TableCell>
                                    <TableCell>skills</TableCell>
                                    <TableCell>education</TableCell>
                                    <TableCell>sop</TableCell>
                                    <TableCell>rating</TableCell>
                                    <TableCell>state</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    collcetion

                                    // <table jobs = {this.state.jobs} jobs_applied = {this.state.jobs_applied} />

                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid >



            </div >
        )
    }
}