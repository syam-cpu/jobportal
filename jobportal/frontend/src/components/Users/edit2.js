import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                    alert("err")
                }
            )
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            bio :this.state.bio,
            phonenumber :this.state.phonenumber,
            _id :localStorage.getItem("_id")
        }
        alert(newUser._id)
        axios.post("http://localhost:4000/user/profile/recruiter/edit",newUser).then(alert("saved"))
        .catch(function(err){
            alert(err + "fsaffasfasfasfasfa")

        })
        //this.props.history.push("/profile/recruiter")
       
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
                    <div className="form-group">
                        <label>Phonenumber: </label>
                        <input type="number"
                                
                            className="form-control"
                            value={this.state.phonenumber}
                            onChange={this.onChangePhonenumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.bio}
                            onChange={this.onChangeBio}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                    <Link to = {"/profile/recruiter"} >gsgrgarfa</Link>

                </form>




            </div>
        )
    }
}

export default Profile;