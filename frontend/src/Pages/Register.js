import React, { useState } from "react";
import "./Register.css";
import { globalState } from './../Store/globalStore';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import axios from "axios";
import { useSnapshot } from "valtio";
function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // send form data to server
    


    registeruser();

    // globalState.profiles.push(register)
    
    // navigate("/")
    // console.log(globalState.profiles[globalState.profiles.length-1])
  };


  // API CALL  //
  async function registeruser()
    {
              try{
          await axios.post(globalState.baseUrl+"/api/create-user/",
          {
            
            username : username,
            email :email,
            password : password,
            roles : accountType
          });
        navigate("/");      

        }catch(err)
        {
            alert("Failed");
        }
    }

  return (
    <div className="registration-form">
      <h1>Registration Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={(event) =>  setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            name="accountType"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            required
          >
            <option disabled value="">Choose an account type</option>
            <option value="MED">Medical</option>
            <option value="CUS">Customer</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </form>
      <label>
        Already have an account? <u className="pointer" onClick={()=>{navigate("/")}}>Login</u>
      </label>
    </div>
  );
}

export default Register;
