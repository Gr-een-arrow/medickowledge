import { globalState } from '../../../Store/globalStore';
import { useState } from 'react';
import './Request.css'
import Swal from "sweetalert2";  
import pic from '../../../Assets/Images/inf.png'
import axios from 'axios';
export default function Request(){
    const [isOpen, setisOpen] = useState(false);
    const [med, setMed] =useState('');
    const [medDesc,setMedDesc] = useState('');
    



    const [callCondition, setCallCondition] = useState(true)
    async function getRequest(){
      const config = {
        headers: { Authorization: `Bearer ${globalState.access}` },
      }; 
      try {
        const response = await axios.get(globalState.baseUrl + "/api/requests/", config);
        globalState.request = response.data;
      } catch (error) {
        Swal.fire({
          icon: 'warning',
          text: 'Request Failed',
          
        }); 
       } 
    } 
   
if(callCondition)
{
  setCallCondition(false)
  getRequest();
}


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
    async function sendRequest(id,sts,desc,req,msg,type) {
      const config = {
        headers: { Authorization: `Bearer ${globalState.access}` },
      };
      const data = { 
        request : id,
        status : sts,
        description : desc
      };
      try {
        const res = await axios.post(globalState.baseUrl+"/api/response/", data, config);  
        for (var i = 0; i < globalState.request.length; i++) {
          if (req.name === globalState.request[i].name) {
            globalState.request.splice(i, 1);
            break;  
           }
        } 
      
        Swal.fire({
          icon: "success",
          text: msg
      });

      } catch(err) {
        Swal.fire({
          icon: 'warning',
          text: "Please Enter Desription"
      });
      }
    }

    const handleAccept=(req)=>{
        sendRequest(req.id,true,req.desc,req,"Request Accepted");
    }
    const handleReject=(req)=>{
     
        sendRequest(req.id,false,req.desc,req,"Request Rejected")
    
    }
    return(
        <div className='mt-5'>
              <div className='sidespace'>
            {(globalState.request.length === 0)&&<p>You Dont Have any request</p>
            } 
            {
              ((globalState.request.length) > 0) &&
              <div >
                  {globalState.request?.map((req)=>{
                    return(
                        <div class="row-card m-3">
                        <div  class="row-card-image pointer">
                          <img src={(req.photo)?req.photo:pic} alt="Image unavailable" />
                        </div>
                        <div class="row-card-content">
                          <h2 class="row-card-title">{req.medicine}</h2>
                          <p className={ (!req.description)?"row-card-description text-danger":"row-card-description" }>{(req.description)?req.description:'No description Provided'}</p>
                          <div class="row-card-icons">
                          <input value={req?.desc} onChange={(e)=>req.desc = e.target.value} className='inpthappu me-2' placeholder='Add Description : Price...' type="text" />
                            <i onClick={()=>handleAccept(req)} class="fas fa-check-circle"></i>
                            <i onClick={()=>handleReject(req)} class="fas fa-times-circle"></i>
                          </div> 
                        </div>
                      </div>
                      
                  )})

                  }
              </div>
            }







           
            


            {isOpen && (
                        <div
                          class="modal fade show"
                          id="modal-xl"
                          aria-modal="true"
                          role="dialog"
                          style={{ display: "block" }}
                        >
                          <div class="modal-dialog modal-xl" id="modal-x2">
                            <div class="modal-content" style={{ "margin-top": "113px" }}>
                              <div class="modal-body">
                                <div class="card  card-secondary" style={{ "margin-bottom": "-1px" }}>
                                        <button
                                            type="button"
                                            className="pop-close close bdr"
                                            onClick={handleClose}
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >New  Request<span className='float-end' aria-hidden="true">×</span>
                                         </button>
                                  <div class="card-body">
                                  <div class="rvpanel-head"></div>
                                  <div className="container-fluid  p-1">
                                <div className='row'>
                                    
                                        <label className='col-md-6'> Medicine Name
                                        <input className=' form-control-part-info mt-1 fs' value={med} onChange={(e)=>{setMed(e.target.value)}} type="text" /></label>
                                        <label className='col-md-6'>Medicine Description
                                        <input className='form-control-part-info  mt-1 fs' value={medDesc} onChange={(e)=>{setMedDesc(e.target.value)}} type="text" /></label>
                                        <label className='col-md-6'>Upload medicine image
                                        <input className='form-control-part-info  mt-1 fs'type="file" /></label>
                                   
                                    
                                    
                                  </div>
                                  <div className='text-center mt-5'>

                                         <button onClick={handleSubmit} className="btn btn-success ms-5 viewall">Submit</button>
                                    </div>
                                    
                                 
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
              </div>

        </div>
    )
}