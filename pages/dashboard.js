import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../contexts/loginContext";
import RegisteredTable from "../components/RegisteredTable";
import styles from  "../styles/dashboard.module.css"

const dashboard = () => {
    const router    =   useRouter();
    const [regData,setRegData]  = useState([])
    const {token}   =   useContext(LoginContext)
    const fetchReg  =   async   ()  =>{
        const res  = await fetch(`https://api.ragam.co.in/api/user/getme`,{headers:{
            'Authorization':  `Bearer ${token}`
          }})
          const value = await res.json()
          setRegData([
            // {Events:value.registeredEvents},
            {Workshops:value.registeredWorkshops},
            // {Competitions:value.registeredCompetitions},
            // {Lectures:value.registeredLectures},
          ])
    }
    useEffect(()=>{
        if (token) {
            fetchReg()
        }
        else{
            router.push('/')
        }
    },[])

  return (
    <div    className={styles.margin}>
     {token&& regData.map(x=><RegisteredTable data={x} key={Object.keys(x)[0]}/>)}            
    </div>
  )
}

export default dashboard