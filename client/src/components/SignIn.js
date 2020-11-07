import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/SignIn.css";
import MLDB from "../MLDB.png";

function SignIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);

    const getUserName = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    };

    const getPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const login = (e) => {
        e.preventDefault();
        userList.includes((val) => {
            (val.userName === userName) 
            ?
                alert("User already registered. Please login into account.")
            :
                Axios.post("http://localhost:3001/insert", {
                    userName: userName,
                    password: password,
                }).then(() => {
                    alert("Successful insert");
                });
            });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/get").then((res) => {
            console.log(res.data);
            setUserList(res.data);
        });
    }, []);

    return (
        <div className="app__signin">
            <img id="img-signin" src={ MLDB } alt="logo"/>
            <div className="signin__container">
                <h1>Sign-In</h1>
                <form className="signin__form">
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="userName" 
                        onChange={ getUserName }
                    />
                    <br/>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={ getPassword }
                    />
                    <br/>
                    <button 
                        id="submit"
                        onClick={ login } 
                    >Submit</button>
                </form>
                <div className="create__account">
                    <hr/>
                    <h3>New to MLDB?</h3>
                    <button>Create an Account</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

/*
{ userList.map((val, index) => {
                    return ( 
                    <h1 key={index}>
                        UserName: { val.userName } | 
                        Password: { val.password }
                    </h1>
                    );
                })};
*/