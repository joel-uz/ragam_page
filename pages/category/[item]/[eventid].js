import { useRouter } from 'next/router'
import styles from '../../../styles/category.module.css'
import styles_chg from '../../../styles/eachevent.module.css'
import data from '../../../data/data.json'
import { Card } from 'antd'

function IndEventPage({req_data, name}){
    const route = useRouter()
    const back_to = () =>{
        route.replace(`/category/${name}`)
    }
    const { Meta } = Card;
    return <div className={styles.main_layout}>
      <div className={styles_chg.indvidual}>
        <Card hoverable style={{
        width: 240,
        }}
        >
        <Meta title= {req_data.title} description={req_data.desc} />
        </Card>
        <button onClick={back_to} className={styles_chg.button}>GO BACK</button>
      </div>
    </div>
  }
  
export default IndEventPage

export async function getStaticPaths(){
    const newdata = data
    const names = Object.getOwnPropertyNames(newdata)

    var path = []
    for (var i=0;i<names.length;i++){
        const specific_data = newdata[names[i]]
        {specific_data.map((each) => {
            return(
                path.push({params:{eventid:`${each.id}`,item:names[i]}})
            )
        })}
    }
    return {
        paths:path,
        fallback:false
    }
}

export async function getStaticProps(context){
    const {params} = context
    const event_num = params.eventid
    console.log(params)
    const name = params.item
    const ref_data = data[`${name}`]
    const val = ref_data.find((specific) => specific.id.toString() === event_num.toString())

    return {
        props:{
            req_data:val,
            name: name
        }
    }

}