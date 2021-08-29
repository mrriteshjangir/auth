import React from 'react'
import useToken from '../components/useToken';

export default function Dashbaord() {
    const { token, setToken } = useToken();
    //const { myfile }=require(`../images/${token.profile}`);
    return (
        <div>
            //<img src={myfile} style={{height:"200px"}} alt="My user profile" />
            <p className="text-danger">{token.userid}</p>
            <h1>Welcome , {token.username}</h1>
            <h2>Email : {token.useremail}</h2>
        </div>
    )
}
