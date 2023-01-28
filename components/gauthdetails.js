import { useContext } from "react"
import { LoginContext } from "../contexts/logincontext"

export const authdetails = async (usercode) => {
  const {setToken, setSignin,setUsername,setMail,setSignInclicked,setId} = useContext(LoginContext)
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