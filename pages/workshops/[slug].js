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
import {AiFillLeftCircle, AiOutlineRight,AiOutlineDoubleRight} from "react-icons/ai"

function IndEventPage({data}){
    const route = useRouter()
    const back_to = () =>{
        route.replace(`/workshops`)
    }
    const [alreadyReg, setAlreadyReg] = useState(false)
    const [userreg, setUserReg] = useState(false)
    const [disable, setDisable] = useState(true)
    const [checkbox, setCheckbox] = useState(true)
    const [workid, setWorkid] = useState(data.id)
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
        const response = await fetch("https://api.staging.ragam.co.in/api/user-workshop-details?populate=*",{
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "data":{
                    "user": {"id":id},
                    "workshop":workid
                } 
            })
        })
        console.log(response)
        setIsModalOpen(true)

    }
    
    const check = async() => {
        if (!signin){
    router.push(`https://api.staging.ragam.co.in/api/connect/google`)
        }

        if (!profile){
            router.replace('/loginpage')
        }
        if (signin && profile){
            if (checkbox){
                console.log(workid)
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
        <AiFillLeftCircle className={Individual_style.go_back_button}  onClick={back_to}/>
        <div className={Individual_style.eventTitle}>
            {data.attributes.name}
        </div>
        <div    className={Individual_style.eventBody}>
            <div    className={Individual_style.eventDescription}>
                {data.attributes.description}
                <div className={Individual_style.guidelines}><Link href={'/'}>Guidelines for Workshops <AiOutlineRight className={Individual_style.gicon}/></Link></div>
            </div>
            <Image alt="example" src={coverImage} className={Individual_style.eventPoster}/>
        </div>
        <Checkbox onChange={onChange} className={Individual_style.checkbox}>I accecpt the guidelines </Checkbox>
        <span
         onClick={()=>check()}
         className={Individual_style.submit}   
            >Register <AiOutlineDoubleRight  className={Individual_style.gicon}/>
        </span>
        
        <Modal title={text} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Username : {username}</p>
        </Modal>
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