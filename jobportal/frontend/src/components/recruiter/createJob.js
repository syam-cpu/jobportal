import React, { Component } from 'react';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            maxapplications: '',
            maxpositions: '',
            postdate: '',
            deadline: '',
            skillset: [],
            jobtype: '',
            duration: '',
            salary: '',
            rating: '',
            recname: '',

            recemail: '',
            deadtime :''
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.title = this.title.bind(this);
        this.maxapplications = this.maxapplications.bind(this);
        this.maxpositions = this.maxpositions.bind(this);
        this.postdate = this.postdate.bind(this);
        this.deadline = this.deadline.bind(this);
        this.skillset = this.skillset.bind(this);
        this.duration = this.duration.bind(this);
        this.salary = this.salary.bind(this);
        this.rating = this.rating.bind(this);
        this.recname = this.recname.bind(this);
        this.recemail = this.recemail.bind(this);
        this.jobtype = this.jobtype.bind(this);
        this.deadtime = this.deadtime.bind(this)


    }

    title(event) {
        this.setState({ title: event.target.value });
    }
    maxapplications(event) {
        if(event.target.value <0){
            this.setState({ maxapplications: '' });
            alert("only positive values allowed")

        }else{

        this.setState({ maxapplications: event.target.value });
        }
    }
    maxpositions(event) {
        if(event.target.value <0){
            this.setState({ maxpositions: '' });
            alert("only positive values allowed")

        }else{
        this.setState({ maxpositions: event.target.value });
        }
    }
    postdate(event) {
        this.setState({ postdate: event.target.value });
    }
    deadline(event) {
        this.setState({ deadline: event.target.value });
    }
    skillset(event) {
        this.setState({ skillset: event.target.value });
    }
    duration(event) {
        if(event.target.value <0){
            this.setState({ duration: '' });
            alert("only positive values allowed")

        }else{
        this.setState({ duration: event.target.value });
        }
    }
    salary(event) {
        if (event.target.value < 0) {
            this.setState({ salary: '' });
            alert("only positive values allowed")
        }
        else {
            this.setState({ salary: event.target.value });
        }
    }
    rating(event) {
        this.setState({ rating: event.target.value });
    }
    recname(event) {
        this.setState({ name: event.target.value });
    }
    recemail(event) {
        this.setState({ name: event.target.value });
    }
    jobtype(event) {
        this.setState({ jobtype: event.target.value });
    }
    deadtime(event) {
        this.setState({deadtime : event.target.value})
    }




    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.selectedOption)
        alert(localStorage.getItem("name"))


        const newUser = {
            title: this.state.title,
            maxapplications: this.state.maxapplications,
            maxpositions: this.state.maxpositions,
            postdate: this.state.postdate,
            deadline: this.state.deadline ,
            skillset: this.state.skillset,
            jobtype: this.state.jobtype,
            duration: this.state.duration,
            salary: this.state.salary,
            // rating: this.state.rating,
            recname: localStorage.getItem("name"),

            recemail: localStorage.getItem("email"),
            jobtype: this.state.jobtype
        }
        let NULL = ''
        if (newUser.name == NULL || newUser.email == NULL || newUser.password == NULL || newUser.selectedOption == NULL) {
            alert("please enter all details")

        } else {

            axios.post('http://localhost:4000/user/job/register', newUser)
                .then(res => {
                    alert("created")
                })
                .catch(
                    function (error) {
                        console.log(error);
                        //  console.log("errorrrr");
                    })
        }

        this.setState({
            title: '',
            maxapplications: '',
            maxpositions: '',
            postdate: '',
            deadline: '',
            skillset: [],
            jobtype: '',
            duration: '',
            salary: '',
            rating: '',
            recname: '',

            recemail: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>maxapplications: </label>
                        <input type="number"
                             min = "1"
                             
                             step = '1'
                            className="form-control"
                            value={this.state.maxapplications}
                            onChange={this.maxapplications}
                        />
                    </div>
                    <div className="form-group">
                        <label>maxpositions: </label>
                        <input type="number"
                            min = '1'
                            step ='1'
                            className="form-control"
                            value={this.state.maxpositions}
                            onChange={this.maxpositions}
                        />
                    </div>
                    <div className="form-group">
                        <label>postdate: </label>
                        <input type="date"
                            className="form-control"
                            value={this.state.postdate}
                            onChange={this.postdate}
                        />
                    </div>
                    <div className="form-group">
                        <label>deadline: </label>
                        <input type="Datetime-local"
                            className="form-control"
                            value={this.state.deadline}
                            onChange={this.deadline}
                        />
                    </div>
                   
                    <div className="form-group">
                        <label>skillset: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.skillset}
                            onChange={this.skillset}
                        />
                    </div>
                    <div className="form-group">
                        <label>duration: </label>
                        <input type="number"
                            min = '1'
                            max = '6'
                            step = '1'
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.duration}
                        />
                    </div>
                    <div className="form-group">
                        <label>salary: </label>
                        <input type="number"
                            min = '1'
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.salary}
                        />
                    </div>
                    <FormControl>

                        JobType
                        <Select
                            native
                            value={this.state.jobtype}
                            onChange={this.jobtype}

                        >
                            <option aria-label="None" value="" />
                            <option value={"WFH"}>WFH</option>
                            <option value={"FULL TIME"}>FULL TIME</option>
                            <option value={"PART TIME"}>PART TIME</option>

                        </Select>
                    </FormControl>



                    <br />
                    <br />
                    <br />


                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>


                </form>
            </div>
        )
    }
}