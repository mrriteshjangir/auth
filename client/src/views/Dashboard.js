import React from 'react'
import useToken from '../components/useToken';
import Logout from '../components/Logout';

export default function Dashboard() {
    const { token} = useToken();
    return (
        <div>
            <img src={process.env.PUBLIC_URL + 'images/'+token.photo} style={{height:"200px"}} alt="My user profile" />
            <p className="text-danger">{token.userid}</p>
            <h1>Welcome , {token.username}</h1>
            <h2>Email : {token.useremail}</h2>

            <div className="text-center m-5">
                <Logout />
            </div>
        </div>
    )
}
