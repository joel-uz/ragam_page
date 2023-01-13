import styles from '../../../styles/category.module.css'
import Link from 'next/link'
import data from '../../../data/data.json'
import { Card } from 'antd'

function EventPage({name,about}){
  
  return <div className={styles.main_layout}>
    <h1 className={styles.title}>{name}</h1>
    <div className={styles.event_page}>
      {
        about.map((terms)=>{
          return(
            <>
            <div className={styles.site_card_eventpage}>
              <Card hoverable
              title={terms.id}
              bordered={true}
              style={{
                width: 300,
              }}
              >
                 <Link href={`/category/${name}/${terms.id}`} className={styles.internallink}> {terms.title}</Link>
              </Card>
            </div>
            </>
          )
        })
      }
    </div>
  </div>
  }
  
export default EventPage

export async function getStaticPaths(){
  return {
      paths:[
          {params:{item:'workshops'}},
          {params:{item:'events'}},
          {params:{item:'proshows'}},
          {params:{item:'competitions'}}
        ],
      fallback:false
  }
}

  export async function getStaticProps(context){
    const {params} = context
    const {item} = params
    const logged_data = data
    const refined = logged_data[`${item}`]

    return {
      props:{
        name:item,
        about:refined,
      }
    }
  }