import { proxy } from 'valtio';
export const globalState = proxy({ 

    // get from .env
    baseUrl : process.env.REACT_APP_BASE_URL || "http://localhost:8000",

    access : "",
   
    profilePic: null,

    selectedProfile :"",
    profiles :[
        {
            'name' : 'Ahamed',
            'email' : 'ahamed@gmail.com',
            'username' : 'ahamed',
            'password' : 'ahamed',
            'address' : 'Kajanayagam street melepalayam',
            'role' : 'customer',
            'pincode':'627005'
        },
        {
            'name' : 'Abdulla',
            'email' : 'abd@gmail.com',
            'username' : 'abdulla',
            'password' : 'abdulla',
            'address' : 'Nethaji road melepalayam',
            'role' : 'medical',
            'pincode':'627005'
        },
    ],
    request:[],
    nearbyMedicals:[],

    activeTab :"",
    medicineName :"",
    selectedRequest :[],
    hospitalName :[],
    medicalResponse:[],
    medicals:[
        {
            medicalname : "raha",
            displayName : "Raha Medical",
            medicine : [
                'dolo650',
                'paracetamal',
                'combiflam'
            ]
        },
        {
            medicalname : "mg",
            displayName : "MG Medical",
            medicine : [
                'dolo650',
                'paracetamal',
                'combiflam'
            ]
        },
        {
            medicalname : "sm",
            displayName : "SM Medical",
            medicine : [
                'dolo650',
                'paracetamal',
                'combiflam'
            ]
        }
    ],
    customerTab:[
        {
            id: 1,
            displayName  : 'My Requests',
            name: 'request'
        },
        {
            id : 2,
            displayName  : 'Acknowledgment',
            name : 'response'
        },
        {
            id : 3,
            displayName  : 'Nearby Medicals',
            name : 'nearbymedical'
        }
    ],

    medicalTab:[
        {
            id: 1,
            displayName  : 'Cusomer Requests',
            name: 'request'
        },
        {
            id : 2,
            displayName  : 'Responses',
            name : 'response'
        },
    ]     
})
