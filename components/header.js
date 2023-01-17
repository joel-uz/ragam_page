import styles from "../styles/front.module.css"
import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image"
import image from "../public/ragamflame.svg"

function Header() {
  const [toggle, setToggle] = useState(false);

  const toggleButton = () => {
    setToggle(!toggle);
  };

  return (
    <>
    <header className={styles["header"]}>
      <nav className={styles["navbar"]}>
        <Link href="/">
          <span className={styles["nav-logo"]}><Image src={image} className={styles.logo}/></span>
        </Link>
        <div className={styles["nav-menu"]}>
        <Link href="/">
            <span className={styles["nav-link"]}>Home</span>
        </Link>
        <Link href="/category">
            <span className={styles["nav-link"]}>Categories</span>
          </Link>
          <Link href="/category/workshops">
            <span className={styles["nav-link"]}>Workshops</span>
          </Link>
          <Link href="/category/events">
            <span className={styles["nav-link"]}>Events</span>
          </Link>
        </div>
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
            <Link href="/category/events" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Events</span>
            </Link>
            <Link href="/categroy/workshops" className={styles['nav-link-mobile-links']}>
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Workshops</span>
            </Link>
            <Link href="/categroy/competitions" className={styles['nav-link-mobile-links']} >
              <span className={styles["nav-link-mobile"]}
              onClick={()=>{
              toggleButton()
              }}>Competitions</span>
            </Link>
           
          </div>
        </div>
      )}
    </header>
    </>
  );
}

export default Header