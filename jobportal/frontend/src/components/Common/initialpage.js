import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

var string = "MyString"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            selectedOption: ''
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();
        //localStorage.clear()
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            selectedOption: this.state.selectedOption,
            date: Date.now()
        }
        localStorage.clear()
        localStorage.setItem("name" ,newUser.name)
        localStorage.setItem("email" ,newUser.email)
        localStorage.setItem("password" ,newUser.password)
        localStorage.setItem("selectedOption" ,newUser.selectedOption)
        let NULL = ""
        if (newUser.email == NULL || newUser.password == NULL || newUser.selectedOption == NULL) {
            alert("please enter all details")

        }
        else {
            if (this.state.selectedOption == 'applicant') {
             
                axios.post('http://localhost:4000/user/login/applicant', newUser)
                    .then(res => {


                        console.log(res.data.user);
                        if (res.data.user.password == newUser.password) {
                             alert("ok")
                             localStorage.setItem("_id",res.data.user._id)
                             localStorage.setItem("name",res.data.user.name)
                             alert(localStorage.getItem("name") + "faaaaaaaaaaaaaa")
                            this.props.history.push("/home/applicant");
                        }
                        else {

                            alert("invalid password" + res.data.user.password + newUser.password);
                        }
                    })


                    .catch(

                        function (error, ok) {
                            alert("invalid credentials")
                            console.log(error + "fafadfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                            //  console.log("errorrrr");
                        })
            }
            else if (this.state.selectedOption == 'recruiter') {
                axios.post('http://localhost:4000/user/login/recruiter', newUser)
                    .then(res => {

                        console.log(res.data);
                        if (res.data.user.password == newUser.password) {
                            alert("valid\t" + res.data.user.name);
                            localStorage.setItem("_id",res.data.user._id)
                            localStorage.setItem("name",res.data.user.name)
                            alert(localStorage.getItem("name") + "faaaaaaaaaaaaaa")

                            this.props.history.push("/home/recruiter");
                        }
                        else {
                            alert("incorrect password");
                        }

                    })
                    .catch(

                        function (error) {
                            alert("invalid credentials")
                            console.log(error + "fafadfaaaaaaaaaaaaaaaaaaaaaaaa");
                            //  console.log("errorrrr");
                        })
            }                                          
        }


        this.setState({
            name: '',
            email: '',
            password: '',
            selectedOption: ''

        });
    }



    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                {/* Happy Coding {this.state.name}!

                <Link to='/users'>
                    <button type="button" className="btn btn-info">Button</button>
                </Link>
                <input className="btn btn-info"
                    onClick={this.deleteItem} value="delete" />
        <Link to="/about">About</Link>*/}
                <form onSubmit={this.onSubmit}>
                <label>Email: </label>
                    <br />
                    <input type="text"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        className="form-control"
                    />
                    <br />
                    
                    <label>Password: </label>
                    <br />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        className="form-control"
                    />
                    <br />


                    <small class="form-text text-muted">We'll never share your password with anyone else.</small>

                    <br />

                    



                    <FormControl>
                        Type
                        <Select
                            native
                            value={this.state.selectedOption}
                            onChange={this.handleOptionChange}

                        >
                            <option aria-label="None" value="" />
                            <option value={"applicant"}>Applicant</option>
                            <option value={"recruiter"}>Recruiter</option>

                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <br />



                    <input type="submit" value="Login" className="btn btn-primary" />

                </form>


            </div>
        )
    }
}