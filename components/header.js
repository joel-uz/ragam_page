import styles from "../styles/front.module.css"
import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu} from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image"
import image from "../public/ragamflame.svg"
import { Button, Space, Modal} from 'antd';
import { useContext } from "react";
import { LoginContext } from "../contexts/logincontext";
import { useRouter } from "next/router";

function Header() {
  const [toggle, setToggle] = useState(false);
  const {signInclicked, usercode, signin, setSignin, setToken,setMail,setUsername,} = useContext(LoginContext);

  const router = useRouter()

  const toggleButton = () => {
    setToggle(!toggle);
  };


  const check = async () => {
    router.push(`https://api.staging.ragam.co.in/api/connect/google`)
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
          <Link href="/competitions">
              <span className={styles["nav-link"]}>Competitions</span>
          </Link>
          <Link href="/workshops">
              <span className={styles["nav-link"]}>Workshops</span>
          </Link>
          <Link href="/events">
              <span className={styles["nav-link"]}>Events</span>
          </Link>
          <Link href="/faqs">
              <span className={styles["nav-link"]}>FAQs</span>
          </Link>
          <Link href="/contacts">
              <span className={styles["nav-link"]}>Contacts</span>
          </Link>
        </div>
        <Space className={styles.button}>
          {!signInclicked? (<Button type="primary" block 
          style={{background: "white", borderColor: "orange", color:"black"}} 
          ghost onClick={()=>{
            check();
            }}>Sign In
          </Button>) : (<Button type="primary" block 
          style={{background: "white", borderColor: "orange", color:"black"}} 
          ghost onClick={()=>{
            take();
            }}>Profile
          </Button>)}
        </Space>
        <div className={styles["flex-row"]}>
          <div className={styles["hamburger"]}>
            {toggle ? (
              <IoMdClose
                onClick={() => {
                  toggleButton();
                }}
                size="30"
              />
            ) : (
              <GiHamburgerMenu
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
            <Link href="/" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]} 
              onClick={()=>{
              toggleButton()
              }}>Home</span>
            </Link>
            <Link href="/events" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Events</span>
            </Link>
            <Link href="/workshops" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Workshops</span>
            </Link>
            <Link href="/competitions" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Competitions</span>
            </Link>
            <Link href="/faqs" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>FAQs</span>
            </Link>
            <Link href="/contacts" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  );
}

export default Header
