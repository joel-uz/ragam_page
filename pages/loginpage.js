import styles from "../styles/Home.module.css"
import ShowProfile from "../components/profile"
import { LoginContext } from "../contexts/loginContext"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Image from "next/image"
import image from "../public/DrawKit Vector Illustration Fun & Playful Finn Character (13).svg"
import image2 from "../public/DrawKit Vector Illustration Fun & Playful Finn Character (14).svg"
import RegisteredTable from "../components/RegisteredTable";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

function checkProfile({ id, username, email, college, district, gender, phone, year, state }) {
  return username && college && district && gender && phone && year && state
}
function Login() {
  const router = useRouter();
  //usrecode is never used
  // const [loading, setLoading] = useState(true);
  const { setUsercode, usercode, token, signin, profileComplete,
    signInclicked, setToken, setState, setGender, setDistrict, setPhone, setCollege, setYear, setRef, setSignin, setUsername, setMail, setSignInclicked, setId } = useContext(LoginContext)
  const [regData, setRegData] = useState([])
  const authdetails = async (usercode) => {
    if (usercode != '') {
      const res = await fetch(`https://api.staging.ragam.co.in/api/auth/google/callback?access_token=${usercode}`)
      const value = await res.json()
      const user_details = await value
      console.log(user_details);
      if (user_details != null) {
        if (user_details.jwt != null) {
          localStorage.setItem("token", user_details.jwt);
          localStorage.setItem("user_details", user_details)
          setToken(user_details.jwt)
          setId(user_details.user.id);
          setUsername(user_details.user.username)
          setMail(user_details.user.email)
          setCollege(user_details.user.college)
          setDistrict(user_details.user.district)
          setGender(user_details.user.gender)
          setPhone(user_details.user.phone)
          setRef(user_details.user.refcode)
          setYear(user_details.user.year)
          setState(user_details.user.state)
          setSignin(true)
          setSignInclicked(true)
          // setLoading(false);
          // let redirect = localStorage.getItem("loginRedirect");
          if (checkProfile(user_details.user)) {
            //snackbar -> login successfull

            localStorage.removeItem("loginRedirect");
            router.push("/");
          }else{
            localStorage.setItem("profileRedirect", true)
          }

        }
      }
    }
  }

  useEffect(() => {
    if (router.query.access_token != null && !signInclicked) {
      console.log('called');
      setUsercode(router.query.access_token)
      authdetails(router.query.access_token)
    }
  }, [router.query]);

  return <div className={styles.top}>
    {
      // loading ?
      //   <div>
      //     <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      //   </div>
      //   :
      signin && <div className={`${styles.regContainer} ${styles.mobileInput}`}>
        <ShowProfile />
        <Image src={image} className={styles.illustration} alt="reg-illustration" />
      </div>}



  </div>

}

export default Login
