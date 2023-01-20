import { useRouter } from 'next/router'
import styles from '../../styles/category.module.css'
import Individual_style from '../../styles/eachevent.module.css'
import { Card } from 'antd'
import Image from 'next/image'
import { fetchData } from '../../components/fetchdata'
import coverImage from '../../public/coverimg.jpg'
import Link from 'next/link'

function IndEventPage({data}){
    const route = useRouter()
    const back_to = () =>{
        route.replace(`/workshops`)
    }
    const { Meta } = Card;
    return <div className={styles.page_layout}>
      <div className={Individual_style.indvidual}>
        <Card hoverable style={{
        width: 400,
        fontSize:15,
        }}
        >
        <Meta title= {data.attributes.name} description={data.attributes.description} />
        </Card>
        <div className={Individual_style.right_side}>
            <Image alt="example" src={coverImage} layout='responsive' width='300' height='230' />
            <div className={Individual_style.buttons}>
                <span className={Individual_style.guidelines}><Link href={'/'}>Guidelines for the workshop--</Link></span>
                <button className={Individual_style.register}>REGISTER</button>
            </div>
        </div>
      </div>
      <div className={Individual_style.back_button}>
        <button onClick={back_to} className={Individual_style.go_back_button}>GO BACK</button>
      </div>
    </div>
  }
  
export default IndEventPage

export async function getStaticPaths(){
    const { meta } = await fetchData('https://api.staging.ragam.co.in/api/workshops')

    var path = []

    const size = meta.pagination.total

    for (var i=1;i<size+1;i++){
        path.push({params:{slug:`${i}`}})
    }

    return {
        paths:path,
        fallback:false
    }
}

export async function getStaticProps(context){
    const {params} = context
    const {slug} = params
    const {data} = await fetchData(`https://api.staging.ragam.co.in/api/workshops/${slug}`)

    return {
        props:{
            data:data
        }
    }

}