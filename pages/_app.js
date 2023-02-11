import Footer from "../components/footer";
import Header from "../components/header";
import '../styles/globals.css'
import styles from "../styles/Home.module.css"
import Head from "next/head";
import { useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext"

export default function App({ Component, pageProps }) {

  // const [profile, setProfile] = useState(false);
  const [signin, setSignin] = useState(false);


  const [id, setId] = useState(0);
  const [name, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [ref, setRef] = useState("");
  const [rId,setRId]  = useState("");

  const [usercode, setUsercode] = useState("");
  const [token, setToken] = useState("");
  const [signInclicked, setSignInclicked] = useState(false);

  const logOut = async () => {
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
    localStorage.removeItem("token")
    localStorage.removeItem("user_details")
  }

  const profileComplete = () => (name && mail && phone && state && gender && college && year && district)

  const [ready, setReady] = useState(false);
  const fetchUser = async (_token) => {
    const res = await fetch(`https://api.staging.ragam.co.in/api/user/getme`, {
      headers: {
        'Authorization': `Bearer ${_token}`
      }
    });
    const value = await res.json()
    if (value?.error?.status == 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user_details")
    }
    // console.log("valueee", value)
    return value;
  }
  useEffect(() => {
    async function onStartup() {
      let _token = localStorage.getItem("token");
      localStorage.removeItem("loginRedirect");
      localStorage.removeItem("profileRedirect");

      if (_token) {
        let val = await fetchUser(_token);
        let user_details = { user: val };
        setToken(_token);
        setId(user_details.user.id);
        setUsername(user_details.user.name)
        setMail(user_details.user.email)
        setCollege(user_details.user.college)
        setDistrict(user_details.user.district)
        setGender(user_details.user.gender)
        setPhone(user_details.user.phone)
        setRef(user_details.user.refcode)
        setYear(user_details.user.year)
        setState(user_details.user.state)
        setRId(user_details.user.ragamId)
        setSignin(true)
        setSignInclicked(true)


      }
    }
    onStartup()
  }, [])

  return <div className={styles.main_layout}>
    <LoginContext.Provider value={{
      name, setUsername,
      mail, setMail, phone, setPhone, district, setDistrict, state, setState, gender,
      setGender, college, setCollege, year, setYear, usercode, setUsercode, signin, setSignin, token, setToken, ref, setRef, signInclicked,
      setSignInclicked, id, setId, ready, setReady, logOut, profileComplete,  rId, setRId
    }}>
      <Head>
        <title>RAGAM&apos;23</title>
        <meta name='description' content='Ragam, South India&apos;s largest Institute cultural fest. Igniting the flames of passion, since 2006. A soul gratifying experience.' />
        <link rel="shortcut icon" href="../favicon.ico" />
        <link
            rel="preload"
            href="/fonts/Dmitry.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
      </Head>
      <Header />
      <br />
      <br />
      <Component {...pageProps} />
      <Footer />
    </LoginContext.Provider>
  </div>
}
