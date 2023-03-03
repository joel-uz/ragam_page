import { Collapse, Modal, Image as AntImg, Button, Input } from "antd"
import Image from "next/image";
import styles from "../styles/eachevent.module.css"
import qrimg from "../public/qrimg.jpg"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";
import Team from "./Team";
import Questions from "./Questions";

const RegDetailsModal = ({ type='workshop',payeeData,loadingResponse,setLoadingResponse,isOpen, onClose, amount, refId, messageSuccess, messageError, event, passName }) => {
    // console.log(refId)
    const { token } = useContext(LoginContext)
    const   [utr,setUTR]    =   useState(null)
    const   [utrError,setUtrError]  =   useState(false)
    const [upload, setUpload] = useState(null)
    const upiId = '9207619833@ybl'
    const [user_workshop_detail, set_user_workshop_detail] = useState({})
    const get_user_workshop_detail = async () => {
        const response = await fetch(`https://api.ragam.co.in/api/user-${type}-details/${refId}?populate=*`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "GET"
        })
        return response;
    };
    
    async function setData() {
        // console.log(token, refId)
        if (!token || !refId) {
            return;
        }
        let res_data = await get_user_workshop_detail();
        res_data = await res_data.json();
        // console.log(res_data)
        set_user_workshop_detail(res_data.data);
    }
    useEffect(() => { 
        setData()
    }, [token, refId, isOpen])

    const changeUTR =   (e) =>{
        setUTR(e.target.value)
    }

    const fileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUpload(e.target.files[0])
        }
    }
    const editFileUpload = async () => {
        if(utr?.length!==12)
        {
            setUtrError(true)
            return
        }
        let isnum = /^\d+$/.test(utr);
        if(!isnum)
        {
            setUtrError(true)
            return
        }
        else{
            // console.log('hi bro');
            setUtrError(false)
        }
        if (upload&&!loadingResponse) {
            setLoadingResponse(true)
            const workid = refId
            const reqBody = new FormData();
            reqBody.append("files", upload)
            // reqBody.append("ref", 'api::user-workshop-detail.user-workshop-detail')
            // reqBody.append("refId", `${workid}`)
            // reqBody.append("field", "receipt")
            const response = await fetch(`https://api.ragam.co.in/api/upload`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: reqBody,
                method: "POST"
            })
            const value = await response.json()
            // console.log(value);
            const   receiptId   =   value[0].id
            if (workid && response.status === 200) {

                const   response2    =   await   fetch(`https://api.ragam.co.in/api/user-${type}-details/${workid}`,
                {

                    method:'PUT',
                    headers:{
                    'Content-Type':"application/json",
                    'Authorization': `Bearer ${token}`,
                    },
                    body:   JSON.stringify({
                        "data":{
                            "receipt":{
                                "id":receiptId
                            },
                            "utr":utr
                        }
                    })
                })
                // setAlreadyReg({id: workid})
                const   value2  =   await   response2.json()

                if (response2.status=== 200) {
                    messageSuccess()
                    onClose()
                    setLoadingResponse(false)
                    return
                }

            }
            messageError()
            onClose()
            setLoadingResponse(false)
        }
    }
    // console.log(event)
    return (
        <Modal className={`${styles.modalContainer}`} title={`Registration`} open={isOpen} onOk={onClose}   footer={
            <>
                <Button onClick={()=>onClose()}>Close</Button>
                {/* {user_workshop_detail?.attributes?.verifed == false ?<Button type="primary" onClick={()=>{editFileUpload()}} loading={loadingResponse}>OK</Button>:""} */}
            </>
        } onCancel={onClose}>

            {/* <Collapse defaultActiveKey={['1']} bordered={false} onChange={() => { }}>
                <Collapse.Panel header="Instructions" key="1">
                    <ol className={styles.modalPadding} >
                        <li className={styles.listItemPadding}>Pay an amount of ₹{amount ? amount : `999`} to the UPI ID:                 <span className={styles.highlight}>{payeeData.paymentId}</span>
                        &nbsp;or using the QR Code below
                            <br />
                            <b className={styles.highlight}>{payeeData.name}</b>
                            <br />
                            <Image src={payeeData.qrcode} className={`${styles.qrimg}`} alt={payeeData.paymentId} width={250} height={250}/>
                        </li>
                        {user_workshop_detail?.attributes?.verifed == false ?
                        <li>
                            Reupload your receipt.
                            <br />
                        <input type="file" name="file" id="file" onChange={(e) => fileSelect(e)} />
                        </li>:''}
                        {user_workshop_detail?.attributes?.verifed == false ?
                        <li className={styles.listItemPadding}>
                        Enter UTR number (UPI transaction ID):
                        <Input  className={styles.mobileInput}  type="text" placeholder="UTR number" onChange={(e)=>changeUTR(e)}></Input>
                        <br />
                        {utrError&& <span className={styles.rejected}>Invalid UTR number</span> }
                        </li>:""}
                        <li className={styles.listItemPadding}>Your registration will be verified in 2-3 days
                        </li>
                        <li className={styles.listItemPadding}>In case you face any issues, contact: </li>
                        <ul>
                            <li className={styles.listItemPadding}>Zidan:  9400841439</li>
                        </ul>
                        {user_workshop_detail?.attributes?.verifed == false ?
                        <li className={styles.listItemPadding}>
                            Click OK to resubmit
                        </li>
                        :""}
                    </ol>
                </Collapse.Panel>
            </Collapse> */}
            {/* <p>Username : {name}</p> */}
            <br/>
            {user_workshop_detail?.attributes?.receipt?.data?.attributes?.url?
                <div>
                Receipt : <AntImg src={"https://api.ragam.co.in" + user_workshop_detail?.attributes?.receipt?.data?.attributes?.url}
                    width={200} />
                </div>:
                <></>
            }
            
            <div    className={styles.listItemPadding}>
                Status: {user_workshop_detail?.attributes?.verifed == false ? <span className={styles.rejected}>Rejected</span> : user_workshop_detail?.attributes?.verifed ? <span    className={styles.verified}>Verified</span> : <span    className={styles.notVerified}>Not yet verified</span>}
            </div>
            {type=="event" && user_workshop_detail?.attributes?.event?.data?.attributes?.isTeamEvent &&
            <Team user_event_detail={user_workshop_detail} event={user_workshop_detail?.attributes?.event?.data?.attributes} refetchDetails={setData} passName={passName}/>
            }
            {type=="event" && event?.questionInfo?.length>0 &&
            <Questions user_event_detail={user_workshop_detail} event={event} refetchDetails={setData}/>
            }

        </Modal>
    )
}

export default RegDetailsModal