import styles from '../../styles/category.module.css'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import EventListItem from '../../components/EventListItem'


function EventPage(){

  const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/workshops?populate=*`, fetchData)
  
  if (data === undefined){
    // return (<>
    // {isLoading && <p>loading</p>}
    // {error && JSON.stringify(error)}
    // </>)
  }
  else{
    const ref = data.data
    return <div >
      <h1 className={styles.titlePage}>WORKSHOPS</h1>
    {data && <div className={styles.page_layout}>
      <div className={styles.card_layout}>
      {ref?.map((each) =>{
        return(
          <EventListItem  key={each.id} each={each}/>
        )
      })}
      </div>
    </div>}
    </div>
  }
  
}
  
export default EventPage

