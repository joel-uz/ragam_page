import Footer from "../components/footer";
import Header from "../components/header";
import '../styles/globals.css'
import styles from "../styles/Home.module.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <div className={styles.main_layout}>
    <Head>
      <title>RAGAM &apos; 23</title>
      <meta name='description' content='About Ragam' />
<<<<<<< HEAD
      <link rel="shortcut icon" href="/ragam.ico" />
=======
      <link rel="shortcut icon" href="../ragam.ico" />
>>>>>>> 72e8464ace772db6be20847301712572f5c9614e
    </Head>
    <Header/>
    <br/>
    <br/>
    <Component {...pageProps} />
    <Footer/>
  </div>
}
