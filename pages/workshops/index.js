import styles from '../../styles/category.module.css'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import EventListItem from '../../components/EventListItem'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function EventPage(){

  const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/workshops?populate=*`, fetchData)
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
    const ref = data.data;
    
    ref.sort(function(a, b){
      if(a.attributes.regClosed != b.attributes.regClosed)
        return (a.attributes.regClosed?1:-1);
      return b.id - a.id;
    });

  
    return <div >
      <h1 className={styles.titlePage}>WORKSHOPS</h1>
    {data && <div className={styles.page_layout}>
      <div className={styles.card_layout}>
      {ref?.map((each) =>{
        return(
          <EventListItem  key={each.id} type={`workshops`} each={each}/>
        )
      })}
      </div>
    </div>}

    </div>
  }
  
}
  
export default EventPage

