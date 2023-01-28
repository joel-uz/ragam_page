import styles from "../styles/Home.module.css"
import ShowProfile from "../components/profile"
import {LoginContext} from "../contexts/logincontext"
import { useRouter } from "next/router";
import { useContext } from "react";
import { authdetails } from "../components/gauthdetails";

function Login(){
    const router = useRouter();
    const {setUsercode, usercode, setToken, setMail,setUsername,token, signin,
    username, mail,signInclicked} = useContext(LoginContext)

    if (router.query.access_token != null && !signInclicked){
        setUsercode(router.query.access_token)
        const resp = authdetails(usercode)
    }
    
    if (signin){
        console.log(token);

        return <div className={styles.top}>
            <ShowProfile/>
        </div>
    }    
}

export default Login
