import { globalState } from '../../Store/globalStore';
import { useState } from 'react';
import './Request.css'
import Swal from "sweetalert2"; 
import m1 from '../../Assets/Images/md1.jpg'
import m2 from '../../Assets/Images/md2.jpg'
import m3 from '../../Assets/Images/md3.webp'
import m4 from '../../Assets/Images/md4.jpg'
import m5 from '../../Assets/Images/md5.jpeg'
import noimg from '../../Assets/Images/noimg.jpeg'
import Profile from '../Profile/Profile';
import axios from 'axios';
export default function Request(){
    const [isOpen, setisOpen] = useState(false);
    const [med, setMed] =useState('');
    const [medDesc,setMedDesc] = useState('');
    
    const handleCancel = (req)=>{


      
      // for (var i = 0; i < globalState.request.length; i++) {
      //   if (globalState.request[i].name === req.name) {
      //     globalState.request.splice(i, 1);
      //   }
      // }
      
    }

    var images =[
      m1,m2,m3,m4,m5
    ]
    var num = 0;

    const handleClose = ()=>{
        setisOpen(false)
    }

    const handleSubmit=()=>{
      setisOpen(false);

      if(med === '')
      {
        Swal.fire({
          icon: 'warning',
          text: "Pls enter medicine name"
      });
      return;
      }

      globalState.request.push({'name' : med,'desc' : medDesc})
      setMed('');
      setMedDesc('');
      Swal.fire({
        icon: 'success',
        text: "Requested"
    });

    console.log(globalState.request[0].name)
    }


// API CALL  /

const [selectedFile,setSelectedFile] = useState(null);
const [mname, setmname] = useState('');
const [desc , setDesc] = useState('');

async function submitForm(name, desc, file) {
  const formData = new FormData();
  formData.append("medicine", name);
  formData.append("description", desc);
  formData.append("photo", file);

  const config = {
    headers: { "content-type": "multipart/form-data", Authorization: `Bearer ${globalState.access}`  },
  };

  try {
    const response = await axios.post(globalState.baseUrl+"/api/requests/", formData, config);
    globalState.request.push(response.data)
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
const submitRequest =()=>{
  submitForm(mname, desc, selectedFile);
  setisOpen(false);
}
    const handleRequest=()=>{
        setisOpen(true);
    }


// API CALL  //
async function getMedicineResponse(id){
  const config = {
    headers: { Authorization: `Bearer ${globalState.access}` },
  }; 
  try {
    const response = await axios.get(globalState.baseUrl +"/api/requests/"+id+"/responses/", config);
    globalState.selectedRequest = response.data;
    globalState.activeTab= globalState.customerTab[1];
  } catch (error) {
    Swal.fire({
      icon: 'warning',
      text: 'Medicals for medicine failed',
    }); 
   } 
}  
    const handleSelectedRequest = (req)=>{

      getMedicineResponse(req.id);

      // globalState.hospitalName=[];
      // globalState.medicineName = req.name;

      // for (var i = 0; i < globalState.medicals.length; i++) {
      //   for (var j = 0; j < globalState.medicals[i].medicine.length; j++) {
      //     if (globalState.medicals[i].medicine[j] === req.name) {
      //       globalState.hospitalName.push(globalState.medicals[i].displayName)
      //       globalState.selectedRequest = {
      //         medicalname: globalState.medicals[i].medicalname,
      //         medicinename: globalState.medicals[i].medicine[j]
      //       };
            
      //     }
      //   }
      // }
      
      // console.log(globalState.hospitalName)
      //   globalState.activeTab = globalState.customerTab[1];
    }
    return(
        <div className='mt-5'>
              {/* <Profile/> */}

              <div className='sidespace'>
            {(globalState.request.length === 0)&&<p>You Dont Have any reuest</p>
            }


            {
              ((globalState.request.length) > 0) &&
              <div >
                  {globalState.request?.map((req)=>{
                    return(
                        <div class="row-card ms-3 me-3">
                        <div  onClick={()=>{handleSelectedRequest(req)}} class="row-card-image  pointer">
                          <img src={(req.photo)?req.photo:noimg} alt="Picture Unavailable"/>
                        </div>
                        <div class="row-card-content">
                          <h2 class="row-card-title">{req.medicine}</h2>
                          <p class="row-card-description">{(req.description)?(req.description):'No description provided'}</p>
                          <button onClick={()=>{handleSelectedRequest(req)}} class="btn btn-success ">See Acknowledgement</button>
                        </div>
                        </div>
                  )})

                  }
              </div>
            }







           
           


            {isOpen &&(
              <div className='popbg'>
              <div className='createform'>
          
                  <h3>Send Request <span onClick={handleClose} className='flend'><i class="fa fa-window-close" aria-hidden="true"></i></span> </h3>
                  <div className="mb-3">
                    <label>Medicine Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Medicine Name"
                      value={mname}
                      onChange={(e)=>setmname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                      value={desc}
                      onChange={(e)=>setDesc(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Upload image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e)=>setSelectedFile(e.target.files[0])}
                    />
                  </div>
                  <div className="d-grid">
                    <button onClick={submitRequest} type="submit" className="createbtn">
                      Submit
                    </button>
                  </div>
                 
                </div>
                </div>
            )}



<button onClick={handleRequest} className='ms-3 btn btn-primary'>Send Request</button>
              </div>

        </div>
    )
}