import { globalState } from "./Store/globalStore";
import axios from "axios";
import Swal from "sweetalert2"; 
import pic from './Assets/Images/medres.jpeg'
import { useEffect, useState } from "react";
import { snapshot, useSnapshot } from "valtio"; 
export default function NearbyMedical(){ 
const [callApi, setCallApi] = useState(true); 

useEffect(()=>{
    if(callApi)
    {
        setCallApi(false);
        getNearbyMedicals();
    }
},[callApi])

    
    async function getNearbyMedicals(){
        const config = {
          headers: { Authorization: `Bearer ${globalState.access}` },
        }; 
        try {
          const response = await axios.get(globalState.baseUrl +"/api/medicals/", config);
          globalState.nearbyMedicals = response.data;
          console.log(globalState.nearbyMedicals)
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            text: 'Nearby response failed',
          }); 
         } 
      }  
    return(
        <div className="mt-5 sidespace">
                  {globalState.nearbyMedicals?.map((req)=>{
                    return(
                      
                        <div class="row-card pointer ms-3 me-3">
                        <div class="row-card-image">
                          <img src={(req.profile_picture)?req.profile_picture:pic} alt="Card image"/>
                        </div>
                        <div class="row-card-content">
                          <h2 class="row-card-title">{req.name}</h2>
                          <p class="row-card">{req.address} - {req.state} - {req.country}</p>
                          <p class="row-card">{req.pincode}</p>
                          <p class="row-card-description "> <span className="badge bg-primary">Medical Description </span> <br/><span class="ms-2">{req.description}</span></p>
                           </div>
                        </div>
                  )}) 
                  }
              </div>
    )
}