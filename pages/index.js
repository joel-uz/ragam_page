import styles from '../styles/Home.module.css'
import useFetch from '../components/fetchdata'

function Home(){
  const {data} = useFetch('https://api.staging.ragam.co.in/api/faqs')
  console.log(data)
  return <div className={styles.main_layout}>
    <div className={styles.Body_page}>
      <h1 className={styles.white}>hleoo</h1>
    </div>
  </div>
}

export default Home
