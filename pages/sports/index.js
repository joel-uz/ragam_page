import styles from '../../styles/category.module.css'
import Link from 'next/link'
import { Card } from 'antd'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import Image from 'next/image'
import coverImage from '../../public/coverimg.jpg'
import {useRouter}  from 'next/router'
import  {useEffect} from  'react'
import EventListItem from '../../components/EventListItem'
const SportsPage = () => {

    const { data, isLoading, error } = useSWR(`https://api.ragam.co.in/api/sports?populate=*`, fetchData)
    const router  = useRouter()
    useEffect(()    =>{
      console.log(router.pathname);
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
      const ref = data.data
      return <div >
        <h1 className={styles.titlePage}>SPORTS</h1>
      {data && <div className={styles.page_layout}>
        <div className={styles.card_layout}>
        {ref?.map((each) =>{
          return(
            <EventListItem  type={'sports'}  key={each.id} each={each}/>
          )
        })}
        </div>
      </div>}
      </div>
    }
    
}

export default SportsPage