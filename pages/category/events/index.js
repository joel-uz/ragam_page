import styles from '../../../styles/Home.module.css'
import Link from 'next/link'

function EventPage(){
    return <div className={styles.main_layout}>
      <div className={styles.Body_page}>
        <h1>Events</h1>
        <Link href={'/category/events/1'}><h3>Event1</h3></Link>
        <Link href={'/category/events/2'}><h3>Event2</h3></Link>
        <Link href={'/category/events/3'}><h3>Event3</h3></Link>
      </div>
    </div>
  }
  
  export default EventPage