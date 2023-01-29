import styles from '../styles/footer.module.css'
import {AiFillFacebook, AiFillInstagram,AiFillLinkedin } from 'react-icons/ai'
import Link from "next/link";


function Footer() {
    return <>
    <div className={styles["layout_footer"]}>
        <div>
            <h3 className={`${styles.title} ${styles.font600} ${styles.pady10}`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque voluptatem eaque ipsum. Sint.</h3>
            <p  className={`${styles.desc} ${styles.font300} ${styles.pady10}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis doloribus dolor aspernatur facere.</p>
        </div>
        <div className={`${styles.links}`}>

            <div    className={`${styles["pady10"]} ${styles['marginr40']}`}>
                Follow us
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
                        <AiFillFacebook /> Facebook
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
                        <AiFillInstagram /> Instagram
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
                        <AiFillLinkedin /> Linkedin
                    </Link>
                </div>
            </div>

            <div    className={`${styles.pady10}`}>
                Site
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
                        Home
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
                        Workshops
                    </Link>
                </div>
                <div className={`${styles["font300"]} ${styles.padyb5} ${styles.linkHover}`}>
                    <Link href="#" >
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