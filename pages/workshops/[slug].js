import { useRouter } from 'next/router'
import styles from '../../styles/category.module.css'
import Individual_style from '../../styles/eachevent.module.css'
import { Card, Space, Button, Modal } from 'antd'
import Image from 'next/image'
import { fetchData } from '../../components/fetchdata'
import coverImage from '../../public/coverimg.jpg'
import Link from 'next/link'
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/loginContext";

function IndEventPage({data}){
    const route = useRouter()
    const back_to = () =>{
        route.replace(`/workshops`)
    }

    const {profile, username, signin} = useContext(LoginContext);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const check = async() => {
        if (!signin){
            const resp = await fetch('https://api.staging.ragam.co.in/strapi-google-auth/init')
            const url = await resp.json()
            router.push(`${url['url']}`)
        }

        {!profile ? router.replace('/loginpage'): setIsModalOpen(true)}
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
                <Space className={Individual_style.register}>
                    <Button type="primary" block 
                    style={{background: "white", borderColor: "orange", color:"black"}} 
                    ghost onClick={()=>{
                        check();
                        }}>Register
                    </Button>
                    <Modal title="User Registered Successfully" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Username : {username}</p>
                    </Modal>
                </Space>
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