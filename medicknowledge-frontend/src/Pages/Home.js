import Customer from "../Root/Customer";
import { globalState } from './../Store/globalStore';
import Medical from '../Root/Medical'

export default function Home(){
    return(
        <>
        
        {(globalState.selectedProfile.roles === 'CUS') && <Customer/>}
        {(globalState.selectedProfile.roles === 'MED') && <Medical/>}

        </>
    )
}