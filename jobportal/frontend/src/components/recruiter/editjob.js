import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxpositions: '',
            maxapplications: '',
            deadline: ''
          

        }
        this.maxapplication = this.maxapplication.bind(this);
        this.maxposition = this.maxposition.bind(this);
        this.deadlin= this.deadlin.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
       

    }
    maxapplication(event) {
        this.setState({ maxapplications: event.target.value });
       // alert(this.state.maxapplications)
    }         

    maxposition(event) {
        this.setState({ maxpositions: event.target.value });
      //  alert(this.state.maxpositions)
    }
    deadlin(event) {
        this.setState({ deadline: event.target.value });
    }
    

    componentDidMount() {
        const newUser = { job_id: localStorage.getItem("id") }
         alert(localStorage.getItem("id"))

        axios.post('http://localhost:4000/user/jobe', newUser).
            then(res => {
                //alert(res.data.user.email + "dFAFAF");
                this.setState({
                    maxpositions: res.data.user.maxpositions,
                    maxapplications: res.data.user.maxapplications,
                    deadline: res.data.user.deadline,
                   


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
//        alert(this.state.deadline)
        const neUser = {
            maxpositions: this.state.maxpositions,
            maxapplications: this.state.maxapplications,
            deadline: this.state.deadline,
            
            id :localStorage.getItem("id")
        }
       // alert(newUser._id)
        axios.post("http://localhost:4000/user/jobs/edit",neUser).then(res=>{
           // alert("saved")
            if(res.data.error == "dddd"){
                alert("maxpositions cant be less than number of accepted applications")
            }
            else{
                alert("saved")
            }
    })
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
                        <label>maxapplications: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.maxapplications}
                            onChange={(e)=>this.maxapplication(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>maxpositions: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.maxpositions}
                            onChange={(e)=>this.maxposition(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>deadline: </label>
                        <input type="Datetime-local"
                            className="form-control"
                            value={this.state.deadline}
                            onChange={this.deadlin}
                        />
                        
                    </div>
                    
                   
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                    <Link to = {"/ucreated"} >gsgrgarfa</Link>

                </form>




            </div>
        )
    }
}

export default Profile;