import styles from "../styles/Home.module.css"
import ShowProfile from "../components/profile"
import {LoginContext} from "../contexts/loginContext"
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";

function Login(){
    const router = useRouter();
    const {setUsercode, usercode, token, signin,
    signInclicked,setToken, setSignin,setUsername,setMail,setSignInclicked,setId} = useContext(LoginContext)

    const authdetails = async (usercode) => {
            if (usercode != ''){
              const res = await fetch(`https://api.staging.ragam.co.in/api/auth/google/callback?access_token=${usercode}`)
              const value = await res.json()
              const user_details = await value
              if (user_details != null){
                  if (user_details.jwt != null){
                    setToken(user_details.jwt)
                    setId(user_details.user.id);
                    setUsername(user_details.user.username)
                    setMail(user_details.user.email)
                    setSignin(true)
                    setSignInclicked(true)
                  }
                }
            }
      }

    useEffect(() => {
      if (router.query.access_token != null && !signInclicked){
        setUsercode(router.query.access_token)
        const resp = authdetails(usercode)
      }
    }, [router.query.access_token,signInclicked,usercode]);
    
    if (signin){
        console.log(token);

        return <div className={styles.top}>
            <ShowProfile/>
        </div>
    }    
}

export default Login
