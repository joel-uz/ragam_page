import styles from '../../styles/category.module.css'
import Link from 'next/link'
import { Card } from 'antd'
import { fetchData } from '../../components/fetchdata'
import useSWR from 'swr'
import Image from 'next/image'
import coverImage from '../../public/coverimg.jpg'


function EventPage(){

  const { data, isLoading, error } = useSWR(`https://api.staging.ragam.co.in/api/events`, fetchData)
  
  if (data === undefined){
    return (<>
    {isLoading && <p>loading</p>}
    {error && JSON.stringify(error)}</>)
  }
  else{
    const ref = data.data
    return <div className={styles.page_layout}>
    {data && <div>
      <h1 className={styles.title}>EVENTS</h1>
      <div className={styles.card_layout}>
        {ref.map((each) =>{
          var tempDate = new Date(each.attributes['eventDate']);
          var formattedDate = [tempDate.getDate(),tempDate.getMonth() + 1, tempDate.getFullYear()].join('/');

            return(
            <div className={styles.site_card_eventpage} key={each.id}>
            <Link href={`/events/${each.id}`} className={styles.internallink}>
                <Card hoverable
                bordered={false}
                title={each.attributes['name']}
                style={{
                    width: 300,
                    }}
                cover={<Image alt="example" src={coverImage} layout='responsive' width='300' height='230' />}
                className={styles.card}
                >
                <p className={styles.desc}>{each.attributes['description']}</p>
                <h3 className={styles.date}>{formattedDate}</h3>
                </Card>
            </Link>
            </div>
            )
        })}
      </div>
    </div>}
    </div>
  }
  
}
  
export default EventPage

