

import m1 from '../../../Assets/Images/md1.jpg'
import m2 from '../../../Assets/Images/md2.jpg'
import m3 from '../../../Assets/Images/md3.webp'
import m4 from '../../../Assets/Images/md4.jpg'
import m5 from '../../../Assets/Images/md5.jpeg'
import pic from '../../../Assets/Images/bullet.jpeg'

import Swal from "sweetalert2"; 
import axios from 'axios'
import { globalState } from '../../../Store/globalStore'
import { useState } from 'react'
export default function Response(){
var num=0;
var images =[
  m1,m2,m3,m4,m5
]
const handleSelectedRequest=()=>{

}

const [callCondition, setCallCondition] = useState(true);

if(callCondition)
{
  medicineResponses();
  setCallCondition(false);
}

async function medicineResponses() {
  const config = {
    headers: { Authorization: `Bearer ${globalState.access}` },
  };
  
  try {
    const res = await axios.get(globalState.baseUrl+"/api/medicine-responses/", config);  
    globalState.medicalResponse = res.data;
  } catch(err) {
    Swal.fire({
      icon: 'warning',
      text: "Failed"
  });
  }
}



    return(
        <div className='mt-5'>

        <div className='sidespace'>
          {
            (globalState.medicalResponse.length === 0) &&
            <div><h3> You Haven't Sent Any Response</h3>
              </div>
          }

        {
              ((globalState.medicalResponse.length) > 0) &&
              <div >
                  {globalState.medicalResponse?.map((req)=>{
                    return(
                        <div onClick={()=>{handleSelectedRequest(req)}} class="row-card pointer m-3">
                        <div class="row-card-image">
                          <img src={pic} alt="Card image"/>
                        </div>
                        <div class="row-card-content">
                          <h2 class="row-card-title">{req.medicine}</h2>
                          <span className='badge bg-success'>Requested by {req.request_by}</span>
                          <p class="mt-2 row-card"><span class="text-primary me-1">Medicine Description:</span>  {req.description}</p>
                          <p class="mt-2 row-card"><span class="text-primary me-1">Customer Address:</span>{req.address}</p>

                        </div>
                        </div>
                  )})

                  }
              </div>
            }
      </div>
      </div>


    )
}