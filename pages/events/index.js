import styles from '../../styles/category.module.css'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import EventListItem from '../../components/EventListItem'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function EventPage(){

  const { data, isLoading, error } = useSWR(`https://api.staging.ragam.co.in/api/categories?populate=*`, fetchData)
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
    const ref = data.data
    return <div >
      <h1 className={styles.titlePage}>EVENT CATEGORIES</h1>
    {data && <div className={styles.page_layout}>
      <div className={styles.card_layout}>
      {ref?.filter(x=>x.attributes['name']!=='Sports'&&x.attributes['name']!=='Ragnarok').map((each) =>{
        return(
          <EventListItem  type={'events'}  key={each.id} each={each}/>
        )
      })}
      </div>
    </div>}
    </div>
  }
  
}
  
export default EventPage

