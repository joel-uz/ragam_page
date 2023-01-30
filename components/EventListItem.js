import styles from '../styles/category.module.css'
import Link from 'next/link'
import coverImage from '../public/coverimg.jpg'
import { Card } from 'antd'
import  {AiOutlineDoubleRight} from 'react-icons/ai'
import Image from 'next/image'
const EventListItem = ({each}) => {
  return (
        <Link href={`/workshops/${each.id}`}  key={each.id} className={styles.internallink}>
            <div className={styles.card}>
                <h3 className={`${styles.title}`}>{`${each.attributes['name']}`}</h3>
                <Image alt="example" src={coverImage} className={styles.cardImage}/> 
                {/* <div className={`${styles.bottom}`}> */}
                    <h3 className={styles.date}>{each.attributes['eventDate1']}</h3>
                    <div    className={styles.read}>
                        <AiOutlineDoubleRight className={styles.readIcon}/>
                    {/* </div> */}
                </div>  
            </div>
        </Link>
  )
}

export default EventListItem