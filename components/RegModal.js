import { Modal } from "antd"
import styles from  "../styles/eachevent.module.css"
import qrimg   from "../public/coverimg.jpg"
import Image from "next/image"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext,useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const RegModal = ({isModalOpen,closeModal,amount,SubmitData,setAlreadyReg}) => {
    const {token}   =   useContext(LoginContext)
    const [upload, setUpload] = useState(null)
    const upiId  =   'rrmampily@oksbi'

    const fileSelect=(e) =>{
        if (e.target.files&&e.target.files[0]) {
            setUpload(e.target.files[0])
        }
    }
    const fileUpload    =   async   ()  =>  {
        if (upload) {
            const workid    =   await   SubmitData()
            const   reqBody =   new FormData();
            reqBody.append("files",upload)
            reqBody.append("ref",'api::user-workshop-detail.user-workshop-detail')
            reqBody.append("refId",`${workid}`)
            reqBody.append("field","receipt")
            const   response    =   await   fetch(`https://api.staging.ragam.co.in/api/upload`,{
                headers:{
                    'Authorization':  `Bearer ${token}`,
                },
                body:reqBody,
                method:"POST"
            })
            const   value   =   await response.json()
            console.log(value);
            if (workid&&response.status===200) {
                setAlreadyReg(true)
                closeModal()
                
            }
        }
    }

  return (
    <Modal className={`${styles.modalContainer}`} title={`Registration`} open={isModalOpen} onOk={fileUpload} onCancel={closeModal}>
        {/* <p>Username : {username}</p> */}
        <h2>
            Instructions:
        </h2>
        <ol className={styles.modalPadding}>
            <li className={styles.listItemPadding}>Pay an amount of ₹{amount?amount:`999`} to the UPI ID: <span className={styles.highlight}>{upiId}</span> or using the QR Code below
            <br />
            <Image src={qrimg}  className={`${styles.qrimg}`}  alt={`${upiId}`}/>
            </li>
            <li className={styles.listItemPadding}>Upload the screenshot of the payment below
                <br />
                <input type="file" name="file" id="file" onChange={(e)=>fileSelect(e)}/>
            </li>
            <li className={styles.listItemPadding}>Click OK to complete registration</li>
        </ol>
    </Modal>
  )
}

export default RegModal