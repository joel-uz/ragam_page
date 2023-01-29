import Footer from "../components/footer";
import Header from "../components/header";
import '../styles/globals.css'
import styles from "../styles/Home.module.css"
import Head from "next/head";
import { useState } from "react";
import {LoginContext} from "../contexts/loginContext"

export default function App({ Component, pageProps }) {
  
  const [profile, setProfile] = useState(false);
  const [signin, setSignin] = useState(false);

  
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [ref, setRef] = useState("");
  
  const [usercode, setUsercode] = useState("");
  const [token, setToken] = useState("");
  const [signInclicked, setSignInclicked] = useState(false);
  const logOut  = async()  =>{
    setProfile(false)
    setSignin(false)
    setSignInclicked(false)
    setId(0)
    setUsername("")
    setMail("")
    setPhone("")
    setState("")
    setGender("")
    setCollege("")
    setYear("")
    setRef("")
    setUsercode("")
    setToken("")
    setDistrict("")
  }
  return <div className={styles.main_layout}>
    <LoginContext.Provider value={{username, setUsername, setProfile, profile,
      mail, setMail, phone, setPhone, district, setDistrict, state, setState, gender,
      setGender, college, setCollege, year, setYear, usercode,setUsercode, signin, setSignin, token,setToken, ref, setRef,signInclicked,
      setSignInclicked, id, setId,logOut}}>
      <Head>
        <title>RAGAM &apos; 23</title>
        <meta name='description' content='About Ragam' />
        <link rel="shortcut icon" href="../ragam.ico" />
      </Head>
      <Header/>
      <br/>
      <br/>
      <Component {...pageProps} />
      <Footer/>
    </LoginContext.Provider>
  </div>
}
