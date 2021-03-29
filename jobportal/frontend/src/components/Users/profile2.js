import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HOme from './../Common/Home'
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phonenumber: '',
            bio: '',
            date: null

        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);

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
    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangePhonenumber(event) {
        this.setState({ phonenumber: event.target.value });
    }

    componentWillMount() {
        {/*} axios.get('http://localhost:4000/profile/recruiter') // unimplemented
.then(response => {
this.setState({ details: response.data });
})n
.catch(function (error) {
console.log(error);
})*/}
        const newUser = { email: localStorage.getItem("email") }

        axios.post('http://localhost:4000/user/profile/recruiter', newUser).
            then(res => {
                //alert(res.data.user.email + "dFAFAF");
                this.setState({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    password: res.data.user.password,
                    phonenumber: res.data.user.contactnumber,
                    bio: res.data.user.bio,

                })

                {/*alert(this.state.name +
this.state.email +
this.state.password+ 
this.state.phonenumber+ 
this.state.bio )*/}

            })
            .catch(
                function (err) {
                    alert(err +"kjhhhkhkhk")
                }
            )
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.history.push('/profile/recruiter/edit')
        
    }

    render() {
        return (
        
            <div>
                
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <h1>{this.state.name}</h1>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <h1>{this.state.password}</h1>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <h1>{this.state.email}</h1>
                    </div>
                    <div className="form-group">
                        <label>Phonenumber: </label>
                        <h1>{this.state.phonenumber}</h1>
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <h1>{this.state.bio}</h1>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                    {/*<Link to = {"/profile/recruiter/edit"} ></Link>*/}

                </form>



            </div>
        )
    }
}

export default Profile;
