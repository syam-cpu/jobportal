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
            jobs: [],
            k : 1


        }
        this.editjob = this.editjob.bind(this);
        this.deletejob = this.deletejob.bind(this);
        this.seeapplications = this.seeapplications.bind(this)


    }


    componentWillMount() {

        const newUser = { email: localStorage.getItem("email") }
        alert(localStorage.getItem("email"))

        axios.post('http://localhost:4000/user/jobs', newUser).
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
    }
 
    editjob(e,id){
       // e.preventDefault();
        localStorage.setItem("id",id)
        this.props.history.push('/ucreated/edit')

    }
    deletejob(e,id){
        const neeUser = {
            id : id
        }
        axios.post('http://localhost:4000/user/jobs/delete',neeUser).then(res=>{
            alert("success")
        })
        .catch({
            function(err){
                alert(err)
            }
        })
    }
    seeapplications(e,id){
        localStorage.setItem("id",id)
        this.props.history.push('/ucreated/id_wise')

    }

    render() {
        return (


            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell> title.</TableCell>
                                <TableCell>posting</TableCell>
                                <TableCell>applicants_count</TableCell>
                                <TableCell>remaining positions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.jobs.map((job, ind) =>{
                                    var mem = [...job.members]
                                    var applications = mem.length
                                    var count  = 0
                                    for(var i = 0;i < applications;i++){
                                        if(mem[i].state == "accepted"){
                                            count++;
                                        }
                                    }
                                    var f = job.maxpositions - count
                                if(f != 0){
                                
                                return(
                                    <TableRow key={ind}>

                                        <TableCell>
                                      {job.title}
                                        </TableCell>
                                        <TableCell>{job.postdate}</TableCell>
                                        <TableCell>{applications}</TableCell>
                                        <TableCell>{f}</TableCell>
                                <TableCell><button color='#fff' onClick={(e) => this.editjob(e, job._id)}> edit </button></TableCell>
                                <TableCell><button color='#fff' onClick={(e) => this.deletejob(e, job._id)}> delete </button></TableCell>
                                <TableCell>
                                        <button color='#fff' onClick={(e) => this.seeapplications(e, job._id)}> seeapplications</button>
                                        </TableCell>
                                    </TableRow>
                                )}})
                                
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>

        )
    }
}

export default Profile;
