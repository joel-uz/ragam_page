import Link from 'next/link'
import styles from '../../styles/Home.module.css'

function categoryPage(){
    return <div className={styles.main_layout}>
      <div className={styles.Body_page}>
        <h1>Category</h1>
        <Link href={'/category/events'}>Click here for events</Link>
      </div>
    </div>
  }
  
  export default categoryPage