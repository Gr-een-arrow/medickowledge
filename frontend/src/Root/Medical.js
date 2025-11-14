import { globalState } from "../Store/globalStore";
import { snapshot, useSnapshot } from 'valtio';
import Request from "../Components/Medicals/MedicalRequest/Request";
import Response from "../Components/Medicals/MedicalResponse/Response";
import Profile from "../Components/Medicals/MedicalProfile/Profile"
import { useNavigate } from 'react-router-dom';

export default function Customer(){
  const globalSnap = useSnapshot(globalState); 
  let navigate = useNavigate();

    const handleTab=(val)=>{    
        globalState.activeTab = val;  
        globalState.hospitalName=[];
      } 

  
    return(
<>
    

        <div className="h-100"> 
    <div  class="p-1 sub-tab">
      <div className="bgbtn">
    
      </div>
      <ul class="nav nav-tabs menu-tab "   >
        {globalState.medicalTab?.map((tab)=>{ 
          return (
                //className={checkTabs(tab)?"nav-item":"d-none"}
               
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
        (globalState.activeTab.name === 'response' && <Response/>)
        } 
      </div>    
    </div> 
 
  </div>
  </>
    )
}