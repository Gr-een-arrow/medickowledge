import React, { useState } from "react"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"; 
import { useNavigate } from 'react-router-dom';
import { globalState } from './../Store/globalStore';
import { useSnapshot } from "valtio";
import axios from "axios";
const LoginForm = () => { 
  let navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      password: Yup.string().min(5).required("Password is required"),
    }), 
    onSubmit: (values) => {  
     console.log("Entered onsubmit")
     login(values.name,values.password);
     console.log(globalState.profiles[globalState.profiles.length-1]) 
      async function getProfilePic(){
        try{
        const response = await axios({
          url: globalState.baseUrl + '/api/users/me/picture/',
          method: "GET",
          headers: { Authorization: `Bearer ${globalState.access}` }, 
        });
        globalState.profilePic = response.data.profile_picture;
        console.log(globalState.profilePic); 
      } catch (error) {
          console.log(error);
      } 
      } 
      async function getUserData(){
        const config = {
          headers: { Authorization: `Bearer ${globalState.access}` },
        }; 
        try {
          const response = await axios.get(globalState.baseUrl + "/api/users/me/", config);
          globalState.selectedProfile = response.data;
          navigate("/home");
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            text: 'invalid username or Password',
            
          }); 
         } 
        getProfilePic();
      } 
      async function login(user, password) { 
        try {
          const response = await axios.post(globalState.baseUrl + "/api/token/", {
            username: user,
            password: password,
          });
          globalState.access = response.data.access;
          if(globalState.access)
          {
            getUserData(); 
          }
          console.log(globalState.access);
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            text: 'Bad request', 
          });
        }
      } 
      if(globalState.selectedProfile.roles === 'CUS')
      {
      globalState.activeTab = globalState.customerTab[0];
      }else{
      globalState.activeTab = globalState.medicalTab[0];
      }
  }
});

  return (
    <div className="center-container login-container">
        <div class="signin signin_wrapper" style={{"margin": "100px;"}}> 
            <h4 className="py-3"> Medic Knowledge</h4>
            <form onSubmit={formik.handleSubmit}> 
            <div class="form-floating mb-3">
                <input 
                    name="name"
                    type="text" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.name} 
                    className={formik.touched.name && formik.errors.name ?"form-control border-danger":"form-control"}
                    id="floatingInput"  />
                <label for="floatingInput">Username</label>

                {formik.touched.name && formik.errors.name ? (
                    <div className="error_msg">{formik.errors.name}</div>
                  ) : null}
            </div>
            <div class="form-floating">
                <input 
                    name="password"
                    type="password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={formik.touched.password && formik.errors.password ?"form-control border-danger":"form-control"} 
                    id="floatingPassword" />
                <label for="floatingPassword">Password</label>
                {formik.touched.password && formik.errors.password ? (
                    <div className="error_msg">{formik.errors.password}</div>
                  ) : null} 
            </div> 
            <button type="submit" className="button">Login</button>
            <label>If you dont't have an account <u onClick={()=>{navigate("/register")}} className="pointer"> Register here</u></label>
          
          </form>
        </div>
    </div>
  );
};

export default LoginForm;