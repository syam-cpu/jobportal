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

export default class ex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job : props.job
           
        }


       
    }

   

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>fsafafaf</div>
        
            
                
      /*  <TableRow>



            <TableCell>{this.state.job._id}</TableCell>
            <TableCell>fafa</TableCell>
            <TableCell>{this.state.job.salary}</TableCell>
            <TableCell>{this.state.job.recname}</TableCell>
            <TableCell>{this.state.job.status}</TableCell>
            <TableCell><button color='#fff' onClick={(e) => this.review}> apply </button>;</TableCell>

        </TableRow>*/

                

                

            
        )
    }
}