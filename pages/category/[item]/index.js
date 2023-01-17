import styles from '../../../styles/category.module.css'
import Link from 'next/link'
import data from '../../../data/data.json'
import { Card } from 'antd'
import { fetchData } from '../../../components/fetchdata'
import useSWR from 'swr'


function EventPage({name}){

  const { data, isLoading, error } = useSWR(`https://api.staging.ragam.co.in/api/${name}`, fetchData)
  var name_cat =''

  if(name === 'competitions') {name_cat = 'title'}else{name_cat = 'name'}

  if (data === undefined){
    return (<>
    {isLoading && <p>loading</p>}
    {error && JSON.stringify(error)}</>)
  }
  else{
    const ref = data.data
    return <div className={styles.main_layout}>
    {data && <div>
      <h1 className={styles.title}>{name}</h1>
      {ref.map((each) =>{
        return(
          <div className={styles.site_card_eventpage} key={each.id}>
            <Card hoverable
              title={each.id}
              bordered={true}
              style={{
                  width: 300,
                }}
            >
            <Link href={`/category/${name}/${each.id}`} className={styles.internallink}> {each.attributes[`${name_cat}`]}</Link>
          </Card>
          </div>
        )
      })}
    </div>}
    </div>
  }
  
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
      }
    }
  }