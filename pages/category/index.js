import Link from 'next/link'
import styles from '../../styles/category.module.css'
import data from '../../data/data_cat.json'
import { Card } from 'antd'

function categoryPage({value}){
    return <div className={styles.main_layout}>
      <h1 className={styles.title}>Category</h1>
      <div className={styles.Body_page}>
        {value.map((ind) => {
          return (
            <>
            <div className={styles.site_card_catergorypage}>
              <Card hoverable
              title={ind.catid}
              bordered={true}
              style={{
                width: 300,
              }}
              >
                <Link href={`/category/${ind.cattitle}`} className={styles.internallink}> {ind.cattitle}</Link>
              </Card>
            </div>
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