import styles from "../styles/front.module.css"
import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu} from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import  {AiOutlineUser,AiFillDashboard} from 'react-icons/ai'
import Image from "next/image"
import image from "../public/ragamflame.svg"
import { Button, Space, Modal} from 'antd';
import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import { useRouter } from "next/router";

function Header() {
  const [toggle, setToggle] = useState(false);
  const {signInclicked,logOut, usercode, signin, setSignin, setToken,setMail,setUsername,} = useContext(LoginContext);

  const router = useRouter()

  const toggleButton = () => {
    setToggle(!toggle);
  };

  const logOutClick  = async ()  =>{
    toggleButton()
    await logOut()
    router.push('/')
  }

  const check = async () => {
    router.push(`https://api.ragam.co.in/api/connect/google`)
  }

  const take = () => {
    router.push('/loginpage')
  }


  return (
    <>
    <header className={styles["header"]}>
      <nav className={styles["navbar"]}>
        <Link href="/">
          <span className={styles["nav-logo"]}><Image src={image} className={styles.logo} alt="example"/></span>
        </Link>
        <div className={styles["nav-menu"]}>
          <Link href="/">
              <span className={styles["nav-link"]}>Home</span>
          </Link>
          <Link href="/workshops">
              <span className={styles["nav-link"]}>Workshops</span>
          </Link>
          <Link href="/events">
            <span className={styles["nav-link"]}>Events</span>
          </Link>
          <Link href="/ragnarok">
            <span className={styles["nav-link"]}>Ragnarok</span>
          </Link>
          {/* <Link href="/sports">
            <span className={styles["nav-link"]}>Sports</span>
          </Link> */}
          {signInclicked&&<Link href="/loginpage">
              <span className={styles["nav-link"]}>Profile</span>
          </Link>}
            {signInclicked&&<Link href="/dashboard">
                <span className={styles["nav-link"]}>Dashboard <AiFillDashboard style={{top:'3.5px',position:'relative'}}/></span>
            </Link>}
          
        </div>
          {!signInclicked? (<Link href="https://api.ragam.co.in/api/connect/google"
          style={{marginRight:'10px',cursor:'pointer'}}>Log In
          </Link>) : (<div>
            <div className={`${styles.above800}`} style={{marginRight:'10px',cursor:'pointer'}} onClick={()=>logOutClick()}>
            Log Out
          </div>
          <Link href={'/loginpage'} className={`${styles.below800}`}><AiOutlineUser/></Link>
          </div>)}
        <div className={styles["flex-row"]}>
          <div className={styles["hamburger"]}>
            {toggle ? (
              <IoMdClose  className={`${styles.color}`}
                onClick={() => {
                  toggleButton();
                }}
                size="30"
              />
            ) : (
              <GiHamburgerMenu className={`${styles.color}`}
                onClick={() => {
                  toggleButton();
                }}
                size="30"
              />
            )}
          </div>
        </div>
      </nav>
      {toggle && (
        <div className={styles["navbar-mobile"]}>
          <div className={styles["nav-menu-mobile"]}>
            {!signInclicked&&<Link href="/" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]} 
              onClick={()=>{
              toggleButton()
              }}>Home</span>
            </Link>}
            {signInclicked&&<Link href="/dashboard" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Dashboard</span>
            </Link>}
            <Link href="/workshops" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Workshops</span>
            </Link>
            {/* <Link href="/events" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Events</span>
            </Link> */}
            <Link href="/ragnarok" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Ragnarok</span>
            </Link>
            {/* <Link href="/sports" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Sports</span>
            </Link> */}
            {signInclicked&&<div className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              logOutClick()
              }}>Log Out</span>
            </div>}
          </div>
        </div>
      )}
    </header>
    </>
  );
}

export default Header
