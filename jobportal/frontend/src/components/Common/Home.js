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
            name: '',
            email: '',
            ok: props.ok,
        }
        this.check = this.check.bind(this)


       
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

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>

               <h1> welcome </h1>
                   <h1>{localStorage.getItem("selectedOption")}!</h1>
             
                

                

            </div>
        )
    }
}