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
import ex from './support';
var string = "MyString"

function table(props) {
    this.state.jobs_applied.map((job, ind) => (
        <TableRow key={ind}>



            <TableCell>{job.id}</TableCell>
            <TableCell>fafa</TableCell>
            <TableCell>{job.salary}</TableCell>
            <TableCell>{job.recname}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell><button color='#fff' onClick={(e) => this.review}> submit review </button>;</TableCell>

        </TableRow>
    ))

}
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs_applied: [],
            jobs: [],
            rating: [],

        }
        this.review = this.review.bind(this)
        this.getstatus = this.getstatus.bind(this)
        this.takereview = this.takereview.bind(this)
        this.fordate = this.fordate.bind(this)



    }


    componentDidMount() {


        const newUser = { email: localStorage.getItem("email") }
        alert(localStorage.getItem("email"))

        axios.post('http://localhost:4000/user/profile/applicant', newUser).
            then(res => {

                //alert(res.data.user.email + "dFAFAF");
                this.setState({

                    jobs_applied: res.data.user.jobs_applied




                })

            })



            .catch(
                function (er) {
                    alert(er + "k")
                }
            )


        axios.get('http://localhost:4000/user/jobs').
            then(res => {
                const length = res.data.length
                var rating = []

                for (var i = 0; i < length; i++) {
                    rating.push('')

                }


                this.setState({

                    jobs: res.data,
                    rating: rating,




                })


            })
            .catch(
                function (err) {
                    alert(err + "kjhhhkhkhk")
                }
            )
    }

    getstatus(id,job) {

        var list = [...this.state.jobs_applied]
        var kem = [...job.members]
        var status1 =""
        var status2 =""
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].id) {
                // alert(list[i].state)
                 status1 = list[i].state
                 break;

            }
        }
        for(var  i = 0;i < kem.length;i++){
            if(kem[i].email == localStorage.getItem("email")){
                status2 = kem[i].state
                break;


            }
        }
        if(status1 == "rejected" || status2 == "rejected"){
            return "rejected"
        }
        else{
            return status2
        }
       

    }




    review(e, id, ind) {
        var list = [...this.state.jobs_applied]
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].id) {
                if (list[i].state == "accepted") {
                    var newset = {
                        id: id,
                        rating: this.state.rating[ind],
                        email: localStorage.getItem("email")
                    }
                    axios.post('http://localhost:4000/user/job/review', newset).then(res => {
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
                else {
                    alert("you arenot allowed")
                    break;
                }

            }
        }

    }
    takereview(e, id, ind) {

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
    fordate(members){
        var list = [...members]
        var email = localStorage.getItem("email")
        for(var i = 0;i < list.length;i++){
            if(list[i].email == email){
                if(list[i].state == "accepted"){
                  var date = new Date(list[i].date); 
                  var t  = date.toString(); 
                return t
                }
                else{
                    return "notapplicable"
                }
            }
        }
    }

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        var jobs_applied = [...this.state.jobs_applied]
        var jobs = [...this.state.jobs]
        var ids = []
        var states = []
        for (var i = 0; i < jobs_applied.length; i++) {
            ids.push(jobs_applied[i].id)
            states.push(jobs_applied[i].state)


        }

        var mem = jobs.filter((a) => ids.indexOf(a._id) !== -1)

        const collcetion = mem.map((job, ind) => {
            return (
                // <ex job = {a} />
                <TableRow>



                    <TableCell>{job.title}</TableCell>
                    <TableCell>{this.fordate(job.members)}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.recname}</TableCell>
                    <TableCell>{this.getstatus(job._id,job)}</TableCell>
                    <TableCell><input type="number"
                        className="form-control"
                        step ='1'
                        value={this.state.rating[ind]}
                        onChange={(e) => this.takereview(e, job._id, ind)} /> <button color='#fff' onClick={(e) => this.review(e, job._id, ind)}> submit review </button>;</TableCell>

                </TableRow>


            )

        })





        return (
            <div>

                < Grid item xs={12} md={9} lg={9} >
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Date_of_joining</TableCell>
                                    <TableCell>salary</TableCell>
                                    <TableCell>recname</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell>rate</TableCell>
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