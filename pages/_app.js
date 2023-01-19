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
      <link rel="shortcut icon" href="../ragam.ico" />
    </Head>
    <Header/>
    <br/>
    <br/>
    <Component {...pageProps} />
    <Footer/>
  </div>
}
