import { Modal,Input } from "antd"
import styles from "../styles/eachevent.module.css"
import qrimg from "../public/qrimg.jpg"
import Image from "next/image"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const RegModal = ({messageError,messageSuccess, isModalOpen, closeModal, amount, SubmitData, setAlreadyReg }) => {
    const { token } = useContext(LoginContext)
    const [upload, setUpload] = useState(null)
    const   [refCode,setRefCode]    =   useState(null)
    // const [loading, setLoading] = useState(false)
    var loading =   false
    const upiId = '9207619833@ybl'

    

    const fileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUpload(e.target.files[0])
        }
    }

    const changeRefCode    =   (e) =>{
        setRefCode(e.target.value)
    }
    const fileUpload = async () => {
        if (upload&&!loading) {
            loading =   true
            const workid = await SubmitData(refCode)
            const reqBody = new FormData();
            reqBody.append("files", upload)
            reqBody.append("ref", 'api::user-workshop-detail.user-workshop-detail')
            reqBody.append("refId", `${workid}`)
            reqBody.append("field", "receipt")
            const response = await fetch(`https://api.ragam.co.in/api/upload`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: reqBody,
                method: "POST"
            })
            const value = await response.json()
            console.log(value);
            if (workid && response.status === 200) {
                messageSuccess()
                setAlreadyReg({ id: workid })
                closeModal()
                // loading =   false

            }
            else{
                messageError()
                loading =   false
                closeModal()
            }
        }
    }

    useEffect(()=>{
        setRefCode(localStorage.getItem('refCode'))
    },[])

    return (
        <Modal className={`${styles.modalContainer}`} title={`Registration`} open={isModalOpen} onOk={fileUpload} onCancel={closeModal}>
            {/* <p>Username : {name}</p> */}
            <h2>
                Instructions:
            </h2>
            <ol className={styles.modalPadding}>
                <li className={styles.listItemPadding}>Pay an amount of ₹{amount ? amount : `999`} to the UPI ID: <span className={styles.highlight}>{`${upiId}`}</span>
                    &nbsp;or using the QR Code below:
                    <br />
                    <b  className={styles.highlight}>Rohit Robin Mampilly</b> <br />
                    <Image src={qrimg} className={`${styles.qrimg}`} alt={`${upiId}`} />
                </li>
                <li className={styles.listItemPadding}>Upload the screenshot of the payment below
                    <br />
                    <input type="file" name="file" id="file" onChange={(e) => fileSelect(e)} />
                </li>
                <li>
                    Enter referral code: <span>
                        <Input  className={styles.mobileInput}  type="text" placeholder="Referral Code" onChange={(e)=>changeRefCode(e)} defaultValue={refCode}></Input>
                    </span>
                </li>
                <li className={styles.listItemPadding}>Click OK to complete registration</li>
            </ol>
        </Modal>
    )
}

export default RegModal