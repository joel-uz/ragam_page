import styles from '../../../styles/category.module.css'
import Link from 'next/link'
import { Card } from 'antd'
import { fetchData } from '../../../components/fetchdata'
import useSWR from 'swr'
import Image from 'next/image'
import coverImage from '../../../public/coverimg.jpg'


function EventPage({name}){

  const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/${name}`, fetchData)
  var name_cat =''

  if(name === 'competitions') {name_cat = 'title'}else{name_cat = 'name'}

  if (data === undefined){
    return (<>
    {/* {isLoading && <p>loading</p>}
    {error && JSON.stringify(error)} */}
    </>)
  }
  else{
    const ref = data.data
    return <div className={styles.main_layout}>
    {data && <div>
      <h1 className={styles.title}>{name}</h1>
      {ref.map((each) =>{
        return(
          <div className={styles.site_card_eventpage} key={each.id}>
          <Link href={`/category/${name}/${each.id}`} className={styles.internallink}>
            <Card hoverable
              title={each.attributes[`${name_cat}`]}
              bordered={false}
              style={{
                  width: 300,
                }}
              cover={<Image alt="example" src={coverImage} layout='responsive' width='300' height='230' />}
              className={styles.card}
            >
              <p className={styles.desc}>{each.attributes['description']}</p>
            </Card>
          </Link>
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

    return {
      props:{
        name:item,
      }
    }
  }