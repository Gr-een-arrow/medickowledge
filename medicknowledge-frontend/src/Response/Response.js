

import m1 from '../Assets/Images/md1.jpg'
import m2 from '../Assets/Images/md2.jpg'
import m3 from '../Assets/Images/md3.webp'
import m4 from '../Assets/Images/md4.jpg'
import m5 from '../Assets/Images/md5.jpeg'
import pic from '../Assets/Images/medres.jpeg'
import Swal from "sweetalert2"; 
import { globalState } from "../Store/globalStore";
export default function Response(){
var num=0;
var images =[
  m1,m2,m3,m4,m5
]
const handleSelectedRequest=()=>{

}

    return(
        <div className='mt-5'> 
        <div className='sidespace'>  
        {(globalState.selectedRequest.length>0) ?
              <div >
                  {globalState.selectedRequest?.map((req)=>{
                    return(
                        <div onClick={()=>{handleSelectedRequest(req)}} class="row-card pointer">
                        <div class="row-card-image">
                          <img src={(req.medical.profile_picture)?req.medical.profile_picture:pic} alt="Card image"/>
                        </div>
                        <div class="row-card-content">
                          <h2 class="row-card-title">{req.medical.name}</h2>
                          <p class="row-card-description">{req.medical.description}</p>
                        </div>
                        </div>
                  )}) 
                  }
              </div>
              :
              <div><center><h4>No Acknowledgement found for this Request</h4></center></div>
}
      </div>
      </div>


    )
}