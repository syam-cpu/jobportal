import React, { Component } from 'react';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            selectedOption: '',
            password: '',
            date: null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        console.log(this.state.selectedOption)

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            date: Date.now()
        }
        let NULL = ''
        if (newUser.name == NULL ||newUser.email == NULL || newUser.password == NULL || newUser.selectedOption == NULL) {
            alert("please enter all details")

        } else {
            if (this.state.selectedOption == "applicant") {
                axios.post('http://localhost:4000/user/applicant/register', newUser)
                    .then(res => {
                        if (res.data.error == 'aa') {
                            alert("please use another mailId")
                        }
                        else {
                            localStorage.setItem("Id",res.data._id)
                            alert("Created\t" + res.data.name); console.log(res.data)
                        }
                    })
                    .catch(
                        function (error) {
                            console.log(error);
                            //  console.log("errorrrr");
                        })
            }
            else {
                axios.post('http://localhost:4000/user/recruiter/register', newUser)
                    .then(res => {
                        if (res.data.error == 'aa') {
                            alert("please use another mailId")
                        }
                        else {
                            alert("Created\t" + res.data.name); console.log(res.data)
                        }
                    })
                    .catch(
                        function (error) {
                            console.log(error);
                            //  console.log("errorrrr");
                        })

            }
        }
        this.setState({
            name: '',
            email: '',
            password: '',
            selectedOption: '',
            date: null
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
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


                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>


                </form>
            </div>
        )
    }
}