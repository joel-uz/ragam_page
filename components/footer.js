import styles from '../styles/footer.module.css'
import {AiFillFacebook, AiFillInstagram,AiFillLinkedin } from 'react-icons/ai'
import Link from "next/link";


function Footer() {
    return <>
    <div className={styles["layout_footer"]}>
        <div>
            <h3 className={`${styles.title} ${styles.font600} ${styles.pady10}`}>Ragam, South India’s largest Institute cultural fest.</h3>
            <p  className={`${styles.desc} ${styles.font300} ${styles.pady10}`}>Igniting the flames of passion, since 1987. A soul gratifying experience.</p>
        </div>
        <div className={`${styles.links}`}>

            <div    className={`${styles["pady10"]} ${styles['marginr40']}`}>
                Follow us
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="https://www.facebook.com/Ragam.nitc/" target={`_blank`} >
                        <AiFillFacebook /> Facebook
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="https://instagram.com/ragam_nitc?igshid=YmMyMTA2M2Y="  target={`_blank`}>
                        <AiFillInstagram /> Instagram
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="https://www.linkedin.com/company/ragam-nit-calicut/?viewAsMember=true"  target={`_blank`}>
                        <AiFillLinkedin /> Linkedin
                    </Link>
                </div>
            </div>

            <div    className={`${styles.pady10}`}>
                Site
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="/" >
                        Home
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="/workshops" >
                        Workshops
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="/#faq" >
                        FAQs
                    </Link>
                </div>
            </div>
        </div>
        <div    className={`${styles['copyright']}  ${styles.font300}`}>
            &copy; Ragam 2023
        </div>
    </div>
    </>
}

export default Footer