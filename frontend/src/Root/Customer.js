import { globalState } from "../Store/globalStore";
import { snapshot, useSnapshot } from 'valtio';
import Request from "../Components/Request/Request";
import Response from "../Response/Response";
import Profile from "../Components/Profile/Profile";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; 
import NearbyMedical from "../NearbyMedical";
export default function Customer(){
  const globalSnap = useSnapshot(globalState); 
  let navigate = useNavigate();

  const [callCondition, setCallCondition] = useState(true)

    const handleTab=(val)=>{    
        globalState.activeTab = val;  
      
      } 

   
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
      
   



    return(
<>
    

        <div className="h-100"> 
    <div  class="sub-tab">
      <div className="bgbtn">
    
      </div>
      <ul class="nav nav-tabs menu-tab "   >
        {globalState.customerTab?.map((tab)=>{ 
          return ( 
                <li className="nav-item" onClick={ ()=>handleTab(tab)}>   
              <span className={globalState.activeTab.displayName === tab.displayName ?" nav-link tab active":" nav-link sub-nav "} >{tab.displayName}</span> 
          </li>
          )  
        })} 
      </ul> 
      <div class=" p-1"  > 
      <Profile/>
        {
        (globalState.activeTab.name === 'request' && <Request/>)|| 
        (globalState.activeTab.name === 'response' && <Response/>)||
        (globalState.activeTab.name === 'nearbymedical' && <NearbyMedical/>)
        } 
      </div>    
    </div> 
 
  </div>
  </>
    )
}