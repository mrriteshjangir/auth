import React from 'react'

export default function Logout() {
    function takeMeOut(){
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <button className="btn btn-danger" onClick={takeMeOut}>Logout</button>
    )
}
