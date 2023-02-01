import styles from '../styles/profile.module.css'
import RegCard from './RegCard'
import Link from 'next/link'

const RegisteredTable = ({data}) => {
    const   category    =   Object.keys(data)[0]
  return (
    <div>
        <div className={`${styles.regContainer}`}>
        <h2 className={`${styles.regHead}`}>{`Registered ${category}`}</h2>
        <div   className={styles.cardsLayout}>
            {data[category].length>0    &&   data[category].map(element => 
                        <RegCard key={element.id} data={element} category={category}/>
                        )
                    }
        </div>
            {data[category].length===0  &&  <div> <span className={styles.nothing}>Nothing here 🫠</span> <br /><br /> Hurry up, go register for some <Link className={styles.link} href={category.toLowerCase()}>{category}</Link>!</div> }
        </div>
    </div>
  )
}

export default RegisteredTable