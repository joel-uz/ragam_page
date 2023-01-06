import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'

function IndEventPage({data}){
    const route = useRouter()
    const back_to = () =>{
        route.replace('/category/events')
    }
    return <div className={styles.main_layout}>
      <div className={styles.Body_page}>
        <h1>Events</h1>
        <h3>Showing data for Event {data}</h3>
        <button onClick={back_to}>GO BACK</button>
      </div>
    </div>
  }
  
export default IndEventPage

export async function getStaticPaths(){
    return {
        paths:[
            {params:{eventid:'1'}},
            {params:{eventid:'2'}},
            {params:{eventid:'3'}}
        ],
        fallback:false
    }
}

export async function getStaticProps(context){
    const {params} = context
    const value = params.eventid

    return {
        props:{
            data: value,
        }
    }

}