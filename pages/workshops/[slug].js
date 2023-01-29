import { useRouter } from 'next/router'
import styles from '../../styles/category.module.css'
import Individual_style from '../../styles/eachevent.module.css'
import { Card, Space, Button, Modal,Checkbox } from 'antd'
import Image from 'next/image'
import { fetchData } from '../../components/fetchdata'
import { fetchUserReg } from '../../components/fetchuserRegData'
import coverImage from '../../public/coverimg.jpg'
import Link from 'next/link'
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../contexts/loginContext";

function IndEventPage({data}){
    const route = useRouter()
    const back_to = () =>{
        route.replace(`/workshops`)
    }
    const [alreadyReg, setAlreadyReg] = useState(false)
    const [userreg, setUserReg] = useState(false)
    const [disable, setDisable] = useState(true)
    const [checkbox, setCheckbox] = useState(true)
    var text =''

    const {profile, username, signin, token, id} = useContext(LoginContext);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (e) => {
        console.log(e.target.checked)
        if (e.target.checked){
            setCheckbox(true)
            if (!alreadyReg){
                setDisable(false)
            }
        }
        else{
            setDisable(true)
        }
      };
    
    const checkReg = async() => {
        if (token != ''){
            const reg_data = await fetchUserReg('https://api.staging.ragam.co.in/api/users/me?populate[registeredWorkshops][populate][0]=workshop', token)
            console.log(await reg_data)
            if (await reg_data.registeredWorkshops != []){
                const workshops = await reg_data.registeredWorkshops
                workshops.map(async (each) => {
                    console.log()
                    if (each.workshop != null)
                    {
                        const name = await each.workshop.name
                        if (name === data.attributes.name){
                            setAlreadyReg(true)  
                            setDisable(true) 
                        }
                        else{
                            setUserReg(true)
                        }
                    }
                })
            }  
        }
        
    }

    checkReg();

    if (alreadyReg){
        text = "User Registered Already"
    }
    if (userreg){
        text = "User Registered Successfully"
    }

    const SubmitData = async() =>{
        const response = await fetch("https://api.staging.ragam.co.in/api/user-workshop-details",{
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "data":{
                    "user": {"id":id},
                    "workshop":data.attributes.id
                } 
            })
        })
        console.log(response)
        setIsModalOpen(true)

    }
    
    const check = async() => {
        if (!signin){
            const resp = await fetch('https://api.staging.ragam.co.in/strapi-google-auth/init')
            const url = await resp.json()
            router.push(`${url['url']}`)
        }

        if (!profile){
            router.replace('/loginpage')
        }
        if (signin && profile){
            if (checkbox){
                SubmitData()
            }
            else{
                text = 'tick checkbox'
                setIsModalOpen(true)
            }
        }
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
                        }} disabled={disable}>Register
                    </Button>
                    <Modal title={text} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Username : {username}</p>
                    </Modal>
                </Space>
                <Checkbox onChange={onChange}>I accecpt the guidelines</Checkbox>
            </div>
            <p>{text}</p>
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
            data:data,
        }
    }

}