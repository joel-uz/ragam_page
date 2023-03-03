import styles from '../../../styles/category.module.css'
import Link from "next/link"
import { fetchData } from '../../../components/fetchdata'
import useSWR from 'swr'
import {useRouter}  from 'next/router'
import  {useEffect} from  'react'
import EventListItem from '../../../components/EventListItem'

const EventsList = () => {

    const router  = useRouter()
    var   routePath   =   router.asPath.split('/')
    routePath.shift()
    routePath.shift()
    routePath=routePath.join()
    const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/categories/${routePath}?populate[events][populate][0]=coverImage`, fetchData)
    useEffect(()    =>{
      if(router.query.refCode    !=null)
      {
          localStorage.setItem('refCode',router.query.refCode)
      }
  },[router.query])
    if (data === undefined){
      return (<>
      {/* {isLoading && <p>loading</p>}
      {error && JSON.stringify(error)} */}
      </>)
    }
    else{
      const ref = data.data.attributes.events.data
      return <div >
        <h1 className={styles.titlePage}>{data.data.attributes.name.toUpperCase()} EVENTS</h1>
      {data && <div className={styles.page_layout}>
        <div className={styles.card_layout}>
        {ref?.map((each) =>{
          return(
            <EventListItem  type={`events/${routePath}`}  key={each.id} each={each}/>
          )
        })}
        </div>
      </div>}
      </div>
    }
    
}

export default EventsList