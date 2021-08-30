import React from 'react'
import swal from "sweetalert";

export default function Logout() {
     function takeMeOut(){       
        swal({
            title: "Are you sure?",
            text: "Once logged out, you have to login again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((result) => {
            if (result) {
                localStorage.removeItem("token");
                window.location="/";
            } else {
              swal("Log out proccess stoped!");
            }
          });    
    }
    return (
        <button className="btn btn-danger" onClick={takeMeOut}>Logout</button>
    )
}
