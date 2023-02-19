import styles from '../../styles/category.module.css'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import EventListItem from '../../components/EventListItem'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function EventPage(){

  const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/categories/7?populate[events][populate][0]=coverImage`, fetchData)
  const router  = useRouter()
  useEffect(()    =>{
    if(router.query.refCode    !=null)
    {
        // console.log('Saved in local storage');
        localStorage.setItem('refCode',router.query.refCode)
    }
},[router.query])
  
  if (data === undefined){
    // return (<>
    // {isLoading && <p>loading</p>}
    // {error && JSON.stringify(error)}
    // </>)
  }
  else{
    const ref = data.data.attributes.events.data
    return <div >
      <h1 className={styles.titlePage}>RAGNAROK (ONLINE)</h1>
      <h4 className={styles.subtitlePage}>(Open to all. Not only for college students)</h4>
    {data && <div className={styles.page_layout}>
      <div className={styles.card_layout}>
      {ref?.map((each) =>{
        return(
          <EventListItem  type={'events/7/'}  key={each.id} each={each}/>
        )
      })}
      </div>
    </div>}
    </div>
  }
  
}
  
export default EventPage

