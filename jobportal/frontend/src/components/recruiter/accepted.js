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
            name: '',
            email: '',
            all: [],
            rating: [],
            sortName: true,
            sortoption: '',
        }
        this.review = this.review.bind(this)
        this.takereview = this.takereview.bind(this)


        this.sortChangeperson_name = this.sortChangeperson_name.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
        this.sortoption = this.sortoption.bind(this)
        this.sortChangedate = this.sortChangedate.bind(this)
        this.sortChangetitle = this.sortChangetitle.bind(this)
        this.gowell = this.gowell.bind(this)




    }

    componentDidMount() {
        const email = localStorage.getItem("email")
        const newUser = {
            email: email
        }
        //alert(email)
        axios.post("http://localhost:4000/user/recruiter/accepted", newUser).then(res => {
            // console.log(res.data)
            const length = res.data.length
            var rating = []

            for (var i = 0; i < length; i++) {
                rating.push('')

            }
            this.setState({
                all: res.data,
                rating: rating
            })



        })
            .catch()




    }

    componentDidUpdate() {

    }
    review(e, person_email, job_id, ind) {


        var newset = {
            id: job_id,
            rating: this.state.rating[ind],
            email: person_email
        }
        axios.post('http://localhost:4000/user/person/review', newset).then(res => {
            if (res.data == "already given")
                alert(res.data)
            else
                alert("thanks for rating")
        })
            .catch(
                function (err) {
                    alert(err + "at review")
                }
            )


    }


    takereview(e, ind) {

        var temp = [...this.state.rating]
        temp[ind] = e.target.value
        if (e.target.value <= 5 && e.target.value >= 0) {
            this.setState({
                rating: temp
            })
        }
        else {
            temp[ind] = ''
            this.setState({
                rating: temp

            })
            alert("giving integer rating between 0 to 5 ")
        }

    }


    sortChangeperson_name() {
        //console.log(mem)
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = [...this.state.all];
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                }
                else {
                    return -1
                }

            }


            else {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1
                }
                else {
                    return -1
                }
                // return b.name  -a.name
            }
        });
        this.setState({
            all: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangetitle() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.all;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                }
                else {
                    return -1
                }

            }


            else {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return 1
                }
                else {
                    return -1
                }
                // return b.name  -a.name
            }

        });
        this.setState({
            all: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangedate() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.all;
        var flag = this.state.sortName;

        array.sort(function (a, b) {
            if (flag == true){
                if( Date.parse(a.join_date) > Date.parse(b.join_date)){
                    return 1
                }
                else{
                    return -1
                }
            }
            else{
                if(Date.parse(b.join_date) < Date.parse(b.join_date)){
                    return 1
                }
                else{
                    return -1
                    
                }
            }
        });
        this.setState({
            all: array,
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
    gowell(e) {
        if (this.state.sortoption == "person_name") {
            this.sortChangeperson_name()
        }
        else if (this.state.sortoption == "title") {
            this.sortChangetitle()
        }
        else {
            this.sortChangedate()
        }


    }
    sortoption(event) {
        this.setState({ sortoption: event.target.value });
    }



    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                <FormControl>


                    <Select
                        native
                        value={this.state.sortoption}
                        onChange={this.sortoption}

                    >
                        <option aria-label="None" value="" />
                        <option value={"person_name"}>name</option>
                        <option value={"title"}>title</option>
                        <option value={"date"}>date</option>




                    </Select>
                </FormControl>


                <TableCell> <Button onClick={(e) => this.gowell(e)}>{this.renderIcon()}</Button></TableCell>

                <Grid item xs={12} md={9} lg={9} >
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> name</TableCell>
                                    <TableCell>joined date</TableCell>
                                    <TableCell>title</TableCell>
                                    <TableCell>jobtype</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.all.map((job, ind) => (
                                        <TableRow key={ind}>

                                            <TableCell>
                                                {job.name}
                                            </TableCell>
                                            <TableCell>{job.join_date}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.jobtype}</TableCell>
                                            <TableCell><input type="number"
                                                className="form-control"
                                                value={this.state.rating[ind]}
                                                onChange={(e) => this.takereview(e, ind)} /> <button color='#fff' onClick={(e) => this.review(e, job.person_email, job.job_id, ind)}> submit review </button>;</TableCell>


                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid >
            </div>







        )
    }
}