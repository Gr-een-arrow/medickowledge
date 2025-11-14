  
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import pic from '../../../Assets/Images/ahmd.jpeg'; 
import { globalState } from '../../../Store/globalStore';
import Swal from "sweetalert2"; 
import axios from 'axios';
import * as React from 'react'; 
import { snapshot } from 'valtio'; 
import { useState } from 'react';
function Profile() { 
  const [createOpen, setCreateOpen]  = useState(false);
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const handleClose = ()=>{
    setCreateOpen(false)
    setisOpen(false)
  }
  const handleSubmit=()=>{
    setisOpen(false)
    Swal.fire({
      icon: 'success',
      text: "Profile Saved",
      timer: 2000,
      showConfirmButton: false
    });
    
  }


const handleEditProfile = ()=>{
  setisOpen(true)
}

// Create profile API   api/ users/create-profile/ //

const [name, setname] = useState('');
const [add, setAdd] = useState('');
const [pincode, setpincode]= useState('');
const [state, setState]= useState('');
const [country, setCountry]= useState('');
const [desc, setDesc]= useState('');
const [phno, setPhno]= useState('');



async function createProfile() {
  const config = {
    headers: { Authorization: `Bearer ${globalState.access}` },
  };
  const data = { // add an object to hold the data to send
    name: name,
    address: add,
    pincode: pincode,
    state : state,
    country : country,
    description : desc,
    phone : phno
  };
  try {
    const res = await axios.post(globalState.baseUrl+"/api/users/create-profile/", data, config);  
    globalState.selectedProfile.user_profile = res.data;
  } catch(err) {
    Swal.fire({
      icon: 'warning',
      text: "Failed"
  });
  }
}


async function editProfile() {
  const config = {
    headers: { Authorization: `Bearer ${globalState.access}` },
  };
  const data = { // add an object to hold the data to send
    name: globalState.selectedProfile.user_profile.name,
    address: globalState.selectedProfile.user_profile.address,
    pincode: globalState.selectedProfile.user_profile.pincode,
    state : globalState.selectedProfile.user_profile.state,
    country : globalState.selectedProfile.user_profile.country,
    description :globalState.selectedProfile.user_profile.description,
    phone : globalState.selectedProfile.user_profile.phone
  };
  try {
    const res = await axios.put(globalState.baseUrl+"/api/users/update-profile/", data, config);  
    globalState.selectedProfile.user_profile = res.data;
  } catch(err) {
    Swal.fire({
      icon: 'warning',
      text: "Failed"
  });
  }
}


const handleCreateProfile=()=>{
    setCreateOpen(true);
    console.log(createOpen)
}

const submitCreateProfile=()=>{
  createProfile();
  console.log("api called");
  setCreateOpen(false)
}

const submitEditProfile=()=>{
  editProfile();
  setisOpen(false);
}

  const handleLogout = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar ">
        <div className={(globalState.selectedProfile.role === 'medical')?" profile": "profile"}>
          <img src={(globalState.profilePic)?globalState.profilePic :  pic} alt="not found" />
          <h3>{globalState.selectedProfile?.username}</h3>
          <p>Medical</p>
          <button onClick={handleLogout} className="lg"><i className='mx-1 fas fa-power-off'></i>
            Logout
          </button>
        </div>
          <div className="container-fluid p-3 box bg">
              <div className="label-view">
                <label className='label'>Name</label>
                <label className='label'>{globalState.selectedProfile?.user_profile?.name}</label>
              </div>
              <div className="label-view">
                <label className='label'>Email </label>
                <label className='label'>{globalState.selectedProfile?.email}</label>
            </div>
            <div className="label-view">
                <label className='label'>Phone no </label>   
                <label className='label'>{globalState.selectedProfile?.user_profile?.phone}</label>
            </div>
              <div className="label-view">
                <label className='label'>Address </label>
                <label className='label'>{globalState.selectedProfile?.user_profile?.address}</label>
            </div>
            <div className="label-view">
                <label className='label'>Pincode </label>   
                <label className='label'>{globalState.selectedProfile?.user_profile?.pincode}</label>
            </div>
            <div className="label-view">
                <label className='label'>State </label>   
                <label className='label'>{globalState.selectedProfile?.user_profile?.state}</label>
            </div>
            <div className="label-view">
                <label className='label'>Country </label>   
                <label className='label'>{globalState.selectedProfile?.user_profile?.country}</label>
            </div>
          </div>
        <div className='text-center'>
          {(globalState.selectedProfile.user_profile)?
        <button onClick={handleEditProfile} className='mt-3 ed'>
        <i class="fas fa-edit"></i> Edit Profile
          </button>
          :
          <button onClick={handleCreateProfile} className='mt-3 ed'>
        <i class="fas fa-edit"></i> Create Profile
          </button>
          }
        </div>
      </div>






{
  createOpen && (
    <div className='popbg'>
    <div className='createform'>

        <h3>Create Profile <span onClick={handleClose} className='flend'><i class="fa fa-window-close" aria-hidden="true"></i></span> </h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            value={add}
            onChange={(e)=>setAdd(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter State"
            value={state}
            onChange={(e)=>setState(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter Country"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e)=>setpincode(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone no"
            value={phno}
            onChange={(e)=>setPhno(e.target.value)}
          />
        </div>
        <div className="mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button onClick={submitCreateProfile} type="submit" className="createbtn">
            Submit
          </button>
        </div>
       
      </div>
      </div>
  )
  
  }
 

     
      {isOpen && (
                       <div className='popbg'>
                       <div className='createform'>
                   
                           <h3>Edit Profile <span onClick={handleClose} className='flend'><i class="fa fa-window-close" aria-hidden="true"></i></span> </h3>
                           <div className="mb-3">
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Name"
                               value={globalState.selectedProfile.user_profile.name}
                               onChange={(e)=>globalState.selectedProfile.user_profile.name=e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Address"
                               value={globalState.selectedProfile.user_profile.address}
                               onChange={(e)=>globalState.selectedProfile.user_profile.address=e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter State"
                               value={globalState.selectedProfile.user_profile.state}
                               onChange={(e)=>globalState.selectedProfile.user_profile.state = e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Country"
                               value={globalState.selectedProfile.user_profile.country}
                               onChange={(e)=>globalState.selectedProfile.user_profile.country = e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Pincode"
                               value={globalState.selectedProfile.user_profile.pincode}
                               onChange={(e)=>globalState.selectedProfile.user_profile.pincode = e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Phone no"
                               value={globalState.selectedProfile.user_profile.phone}
                               onChange={(e)=>globalState.selectedProfile.user_profile.phone = e.target.value}
                             />
                           </div>
                           <div className="mb-3"> 
                             <input
                               type="text"
                               className="form-control"
                               placeholder="Enter Description"
                               value={globalState.selectedProfile.user_profile.description}
                               onChange={(e)=>globalState.selectedProfile.user_profile.description = e.target.value}
                             />
                           </div>
                           <div className="d-grid">
                             <button onClick={submitEditProfile} type="submit" className="createbtn">
                               Submit
                             </button>
                           </div>
                          
                         </div>
                         </div>
                      )}


    </>
  );
}

export default Profile;
