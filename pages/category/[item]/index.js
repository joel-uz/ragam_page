import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import data from '../../../data/data.json'

function EventPage({name,about}){

  return <div className={styles.main_layout}>
    <div className={styles.Body_page}>
      <h1>{name}</h1>
      {
        about.map((terms)=>{
          return(
            <>
            <Link href={`/category/${name}/${terms.id}`}> {terms.id} --- {terms.title}</Link>
            <hr />
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
    console.log(refined)

    return {
      props:{
        name:item,
        about:refined,
      }
    }
  }