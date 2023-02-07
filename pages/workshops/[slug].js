import { useRouter } from 'next/router'
import styles from '../../styles/category.module.css'
import Individual_style from '../../styles/eachevent.module.css'
import qrimg from "../../public/qrimg.jpg"
import {Modal,Checkbox,message } from 'antd'
import Image from 'next/image'
import { fetchData } from '../../components/fetchdata'
import { fetchUserReg } from '../../components/fetchuserRegData'
import coverImage from '../../public/posterimg.png'
import Link from 'next/link'
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../contexts/loginContext";
import RegModal from '../../components/RegModal'
import {AiFillLeftCircle, AiOutlineRight,AiOutlineDoubleRight} from "react-icons/ai"
import GuidelinesModal from '../../components/GuidelinesModal'
import RegDetailsModal from '../../components/RegDetailsModal'

function IndEventPage({data=null}){
    const router = useRouter();
    // var regId   =   0
    const back_to = () =>{
        router.replace(`/workshops`)
    }

    const [alreadyReg, setAlreadyReg] = useState(false)
    const [disable, setDisable] = useState(true)
    const [guidelinesModalOpen,setguidelinesModalOpen]  =   useState(false)
    const [messageApi,contextHolder]    =   message.useMessage()
    const [loadingResponse,setLoadingResponse]  =   useState(false)
    const   [payeeData,setPayeeData]    =   useState({
        name:"Rohit Robin Mampilly",
        paymentId:"9207619833@ybl",
        qrcode:qrimg,
    })

    const loadPaymentId =   async   ()  =>  {
        const payeeIdRes   =   await   fetch('https://api.ragam.co.in/api/current-payee')
        const payeeIdObj   =   await   payeeIdRes?.json()
        const payeeId      =   payeeIdObj?.data?.attributes?.payeeId
        const payeeDataRes =   await   fetch(`https://api.ragam.co.in/api/payees/${payeeId}?populate=*`)        
        const   payeeData2  =   await   payeeDataRes.json()
        console.log('payment set');
        setPayeeData(x=>payeeData2?.data?.attributes&&payeeData2?.data?.attributes?.qrcode?.data?{
            name:payeeData2.data.attributes.name,
            qrcode:`https://api.ragam.co.in${payeeData2.data.attributes.qrcode.data[0].attributes.url}`,
            paymentId:  payeeData2.data.attributes.paymentId
        }:x)
    }

    const   workid  =   data.id

    const {profileComplete, name, signin, token, id} = useContext(LoginContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegDetailsOpen, setIsRegDetailsOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeGuidelinesModal  =   ()  =>{
        setguidelinesModalOpen(false)
    }

    const openGuidelinesModal  =   ()  =>{
        setguidelinesModalOpen(true)
    }
    const openRegDetailsModal = () => {
        setIsRegDetailsOpen(true)
    }
    const closeRegDetailsModal = () => {
        setIsRegDetailsOpen(false)
    }

    const onChange = (e) => {
            setDisable(!e.target.checked)
      };
    
    const checkReg = async() => {
        if (token != ''){
            const reg_data = await fetchUserReg(`https://api.ragam.co.in/api/user/getme`, token)
            let user_workshop_detail = reg_data.registeredWorkshops.find(x=>x.id    === workid);
            if(user_workshop_detail)
            {   console.log(user_workshop_detail)
                setAlreadyReg({id: user_workshop_detail.ref_id})
            }  
        }
    }

    const messageSuccess  =  ()  =>  {
        messageApi.open({
            type:'success',
             content:`Registration submitted`
        })
    }

    const messageSuccessRe  =  ()  =>  {
        messageApi.open({
            type:'success',
             content:`Registration resubmitted`
        })
    }

    const messageError  =   ()  =>  {
        messageApi.open({
            type:'error',
            content:'Please try again later'
        })
    }

    useEffect(() => {
        checkReg();
    }, [token])

    useEffect(()    =>{
        if(router.query.refCode    !=null)
        {
            // console.log('Saved in local storage');
            localStorage.setItem('refCode',router.query.refCode)
        }
    },[router.query])

    useEffect(() => {
        loadPaymentId()
    },[])

    const SubmitData = async(refCode="",utr) =>{
        const response = await fetch("https://api.ragam.co.in/api/user-workshop-details",{
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "data":{
                    "user": {"id":id},
                    "workshop":workid,
                    "refCode":  refCode,
                    "utr":utr

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
            router.push(`https://api.ragam.co.in/api/connect/google`)
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
        {contextHolder}
      <div className={Individual_style.indvidual}>
        <AiFillLeftCircle className={Individual_style.go_back_button}  onClick={back_to}/>
        <div className={Individual_style.eventTitle}>
            {data.name}
        </div>
        <div className={Individual_style.eventDate}>
            {data.currRegCount<=120?data['eventDate1']:data['eventDate2']}
            <br/>
            {data.regPrice?`₹${data.regPrice}`:`₹999`}
        </div>
        <div    className={Individual_style.eventBody}>
            <div    className={Individual_style.eventDescription}>
                {data.description}
                <div className={Individual_style.guidelines}    onClick={()=>openGuidelinesModal()}>Guidelines for Workshops <AiOutlineRight className={Individual_style.gicon}/></div>
            </div>
            <Image alt="example" src={data?.posterImage?.url?`https://api.ragam.co.in${data.posterImage.url}`:coverImage}    width={500} height={500} className={Individual_style.eventPoster}/>
        </div>
        {!alreadyReg?
        <>
            <Checkbox onChange={onChange} className={Individual_style.checkbox}>I accept the guidelines </Checkbox>
            <span
            onClick={()=>check()}
            className={`${Individual_style.submit} ${disable?Individual_style.submitnotok:Individual_style.submitok}`}>
                Register <AiOutlineDoubleRight  className={Individual_style.gicon}/>
        </span>
        </>:
        <>
        <span
        onClick={openRegDetailsModal}
        className={`${Individual_style.submit} ${Individual_style.submitok}`}>
            Registration status <AiOutlineDoubleRight  className={Individual_style.gicon}/>
    </span>
    </>
        }
        <RegModal   payeeData={payeeData}   loadingResponse={loadingResponse}   setLoadingResponse={setLoadingResponse}   messageError={messageError}   messageSuccess={messageSuccess} isModalOpen={isModalOpen} setAlreadyReg={setAlreadyReg} SubmitData={SubmitData} closeModal={closeModal} amount={data.regPrice}/>
        <GuidelinesModal guidelinesModalOpen={guidelinesModalOpen} closeGuidelinesModal={closeGuidelinesModal}/>
        <RegDetailsModal    payeeData={payeeData} loadingResponse={loadingResponse}   setLoadingResponse={setLoadingResponse}  isOpen={isRegDetailsOpen} onClose={closeRegDetailsModal} refId={alreadyReg.id} amount={data.regPrice} messageSuccess={messageSuccessRe}   messageError={messageError}/>

      </div>
    </div>
  }
  
export default IndEventPage

// export async function getStaticPaths(){
//     const { data = [] } = await fetchData('https://api.ragam.co.in/api/workshops')

//     var path = []

//     data.forEach(element => {
//         path.push({params:{slug:`${element.id}`}})
//     });

//     return {
//         paths:path,
//         fallback:false
//     }
// }

export async function getServerSideProps(context){
    const {params} = context;
    const {slug} = params;
    
    const {result} = await fetchData(`https://api.ragam.co.in/api/workshops/${slug}?populate=*`);

    return {
        props:{
            data:result?result:null,
        }
    }

}