import { useRouter } from 'next/router'
import styles from '../../styles/category.module.css'
import Individual_style from '../../styles/eachevent.module.css'
import {Modal,Checkbox } from 'antd'
import Image from 'next/image'
import { fetchData } from '../../components/fetchdata'
import { fetchUserReg } from '../../components/fetchuserRegData'
import coverImage from '../../public/coverimg.jpg'
import Link from 'next/link'
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../contexts/loginContext";
import RegModal from '../../components/RegModal'
import {AiFillLeftCircle, AiOutlineRight,AiOutlineDoubleRight} from "react-icons/ai"
import GuidelinesModal from '../../components/GuidelinesModal'

function IndEventPage({data}){
    const router = useRouter();
    // var regId   =   0
    const back_to = () =>{
        router.replace(`/workshops`)
    }

    const [alreadyReg, setAlreadyReg] = useState(false)
    const [disable, setDisable] = useState(true)
    const [guidelinesModalOpen,setguidelinesModalOpen]  =   useState(false)

    const   workid  =   data.id

    const {profileComplete, username, signin, token, id} = useContext(LoginContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeGuidelinesModal  =   ()  =>{
        setguidelinesModalOpen(false)
    }

    const openGuidelinesModal  =   ()  =>{
        setguidelinesModalOpen(true)
    }

    const onChange = (e) => {
            setDisable(!e.target.checked)
      };
    
    const checkReg = async() => {
        if (token != ''){
            const reg_data = await fetchUserReg(`https://api.staging.ragam.co.in/api/user/getme`, token)
            if(reg_data.registeredWorkshops.find(x=>x.id    === workid))
            {
                setAlreadyReg(true)
            }  
        }
    }

    useEffect(() => {
        checkReg();
    }, [])

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
                    "workshop":workid
                } 
            })
        })
        const   value   =   await response.json()
        return  value.data.id
        
    }
    
    const check = async() => {
        if (disable)
        {
            return;
        }
        if (!signin){
            localStorage.setItem("loginRedirect",true);
            router.push(`https://api.staging.ragam.co.in/api/connect/google`)
            return
        }

        if (!profileComplete()){
            localStorage.setItem("profileRedirect",true);
            router.replace('/loginpage')
            return
        }
        // SubmitData()
        setIsModalOpen(true)
    }

    return <div className={styles.page_layout}>
      <div className={Individual_style.indvidual}>
        <AiFillLeftCircle className={Individual_style.go_back_button}  onClick={back_to}/>
        <div className={Individual_style.eventTitle}>
            {data.attributes.name}
        </div>
        <div className={Individual_style.eventDate}>
            {data.attributes.currRegCount<=120?data.attributes['eventDate1']:data.attributes['eventDate2']}
            <br/>
            {data.attributes.regPrice?`₹${data.attributes.regPrice}`:`₹999`}
        </div>
        <div    className={Individual_style.eventBody}>
            <div    className={Individual_style.eventDescription}>
                {data.attributes.description}
                <div className={Individual_style.guidelines}    onClick={()=>openGuidelinesModal()}>Guidelines for Workshops <AiOutlineRight className={Individual_style.gicon}/></div>
            </div>
            <Image alt="example" src={data.attributes.coverImage.data?data.attributes.coverImage.data:coverImage} className={Individual_style.eventPoster}/>
        </div>
        {!alreadyReg&&
        <>
            <Checkbox onChange={onChange} className={Individual_style.checkbox}>I accecpt the guidelines </Checkbox>
            <span
            onClick={()=>check()}
            className={`${Individual_style.submit} ${disable?Individual_style.submitnotok:Individual_style.submitok}`}>
                Register <AiOutlineDoubleRight  className={Individual_style.gicon}/>
        </span>
        </>}
        <RegModal isModalOpen={isModalOpen} setAlreadyReg={setAlreadyReg} SubmitData={SubmitData} closeModal={closeModal} amount={data.attributes.regPrice}/>
        <GuidelinesModal guidelinesModalOpen={guidelinesModalOpen} closeGuidelinesModal={closeGuidelinesModal}/>
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
    
    const {data} = await fetchData(`https://api.staging.ragam.co.in/api/workshops/${slug}?populate=*`)

    return {
        props:{
            data:data,
        }
    }

}