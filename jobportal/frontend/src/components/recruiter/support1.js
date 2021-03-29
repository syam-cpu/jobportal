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
var string = "MyString"



export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs_applied :props.jobs_applied,
            jobs : props.jobs,
        }
        this.check = this.check.bind(this)
        this.getstatus = this.getstatus.bind(this)


       
    }

    componentDidMount() {
        this.setState({
            name: 'Vikrant'
        })
    }

    componentDidUpdate() {
        if (this.state.name != 'Kanish')
            this.setState({
                name: 'Kanish'
            })
    }
    check(j){
        return <><h1>{j}</h1>
        <h1>{this.state.name}</h1>
        <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Date_of_joining</TableCell>
                                    <TableCell>salary</TableCell>
                                    <TableCell>recname</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell>rate</TableCell>
                                </TableRow></>
        
    }
    getstatus(id) {
        var list = [...this.state.jobs_applied]
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].email) {
               // alert(list[i].state)
               const u = {
                   state : list[i].state,
                   sop : list[i].sop,
                   date :list[i].date

               }
                return u

            }
        }

    }

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() { var jobs_applied = [...this.state.jobs_applied]
       // console.log(jobs_applied)
        var jobs = [...this.state.jobs]
        //console.log(jobs)
        var ids = []
        var states = []
        for (var i = 0; i < jobs_applied.length; i++) {
            ids.push(jobs_applied[i].email)
            states.push(jobs_applied[i].state)


        }

        var mem = jobs.filter((a) => ids.indexOf(a.email) !== -1)
        //console.log(mem)

        const collcetion = mem.map((job,ind) => {
            if(this.getstatus(job.email).state == "accepted"){
              //  alert(job.email)
            return (
                // <ex job = {a} />
                <TableRow>


                     

                    <TableCell>{job.name}</TableCell>
                
                    <TableCell>1</TableCell>
                    <TableCell>1111</TableCell>
                    <TableCell>{this.getstatus(job.email).sop}</TableCell>
                    <TableCell>rating babai</TableCell>
                    <TableCell>{this.getstatus(job.email).state}</TableCell>
                    
                   
                  
                    
                </TableRow>


            )
            }

        })

        return (
            

        <TableBody> {collcetion}</TableBody>
            
                

                

        
        )
    }
}