import React, { useState } from "react";
import propTypes from "prop-types";
import md5 from "md5";
import swal from "sweetalert";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/api/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Signin({ setToken }) {
  
  const [useremail, setUserEmail] = useState();

  const [userpassword, setUserPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      useremail,
      userpassword,
    });
    setToken(token);
    if(!token || token.error) 
    {
      swal({
        title: "Not Found",
        text: "Account does not exist!",
        icon: "error",
        button: "Cancel",
      });
    }
    else
    {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <div className="container">
          <h2 className="text-primary text-center">Welcome</h2>
          <div className="form-set">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="useremail"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password@123"
                  name="userpassword"
                  onChange={(e) => setUserPassword(md5(e.target.value))}
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-success" type="submit" name="submit">
                  Login
                </button>
              </div>
              <div className="mb-3 text-center">
                <a href="/sign-up">New user ? Click Here</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
Signin.propTypes = {
  setToken: propTypes.func.isRequired,
};