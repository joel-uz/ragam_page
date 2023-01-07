import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import data from '../../data/data_cat.json'

function categoryPage({value}){
    return <div className={styles.main_layout}>
      <div className={styles.Body_page}>
        <h1>Category</h1>
        {value.map((ind) => {
          return (
            <>
            <Link href={`/category/${ind.cattitle}`} className={styles.internallink}>{ind.catid}, {ind.cattitle}</Link>
            <hr />
            </>
          )
        })}
      </div>
    </div>
  }
  
  export default categoryPage

  export async function getStaticProps(){
    const logged_data = data

    return {
      props: {
        value: logged_data.categories
      }
    }
  }