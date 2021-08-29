import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import md5 from 'md5';

export default class Signup extends Component {
  
  constructor() {
    super(); 
    this.state = {
      username: "",
      useremail: "",
      userpassword: "",
      userconf_pass: "",
      photo: ''
    };
  }
  
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
  };

  onFileChange =(e)=>{
    this.setState({[e.target.name]: e.target.files[0]})
  }

  onSubmit = (a) => {
    a.preventDefault();

    const formData = new FormData();
    formData.append('photo', this.state.photo);
    formData.append('username', this.state.username);
    formData.append('useremail', this.state.useremail);
    formData.append('userpassword', md5(this.state.userpassword));

    if (this.state.userpassword === this.state.userconf_pass) {

      axios
        .post("http://localhost:5000/api/user/create/", formData)
        .then((res) => {
          this.setState({
            username: "",
            useremail: "",
            userpassword: "",
            userconf_pass: "",
            photo: ''
          });

          swal({
            title: "Success",
            text: "Account created Sussessfully!",
            icon: "success",
            button: "Done",
          });

          this.props.history.push("/");
        })
        .catch((er) => {
          console.log(er);
          // swal({
          //   title: "Error",
          //   text: "Error while creating account",
          //   icon: "error",
          //   button: "Done",
          // });
        });
    } else {
        swal({
        title: "Error",
        text: "Password not matched",
        icon: "error",
        button: "Done",
        });
    }
  };
  render() {
    return (
      <>
        <div className="container mt-3">
          <h2 className="text-primary text-center">Create New Account</h2>
          <div className="form-set">
            <form onSubmit={this.onSubmit} encType='multipart/form-data'>

            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={this.onFileChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Deo"
                  name="username"
                  autoComplete={false}
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="useremail"
                  autoComplete={false}
                  value={this.state.useremail}
                  onChange={this.onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password@123"
                  name="userpassword"
                  autoComplete={false}
                  value={this.state.userpassword}
                  onChange={this.onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password@123"
                  name="userconf_pass"
                  autoComplete={false}
                  value={this.state.userconf_pass}
                  onChange={this.onChange}
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-success" type="submit" name="submit">
                  Create
                </button>
              </div>
              <div className="mb-3 text-center">
                <a href="/">Already a user ? Click Here</a>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
