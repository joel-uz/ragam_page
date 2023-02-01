import { Collapse, Modal, Image as AntImg } from "antd"
import Image from "next/image";
import styles from "../styles/eachevent.module.css"
import qrimg from "../public/coverimg.jpg"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const RegDetailsModal = ({ isOpen, onClose, amount, refId }) => {
    // console.log(refId)
    const { token } = useContext(LoginContext)
    const [upload, setUpload] = useState(null)
    const upiId = 'rrmampily@oksbi'
    const [user_workshop_detail, set_user_workshop_detail] = useState({})
    const get_user_workshop_detail = async () => {
        const response = await fetch(`https://api.staging.ragam.co.in/api/user-workshop-details/${refId}?populate[0]=receipt`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "GET"
        })
        return response;
    };
    useEffect(() => {
        async function setData() {
            if (!token || !refId) {
                return;
            }
            let res_data = await get_user_workshop_detail();
            res_data = await res_data.json();
            set_user_workshop_detail(res_data.data);
        }
        setData()

    }, [token, refId,isOpen])
    const fileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUpload(e.target.files[0])
        }
    }
    const fileUpload = async () => {
        if (upload) {
            const workid = refId
            const reqBody = new FormData();
            reqBody.append("files", upload)
            reqBody.append("ref", 'api::user-workshop-detail.user-workshop-detail')
            reqBody.append("refId", `${workid}`)
            reqBody.append("field", "receipt")
            const response = await fetch(`https://api.staging.ragam.co.in/api/upload`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: reqBody,
                method: "POST"
            })
            const value = await response.json()
            console.log(value);
            if (workid && response.status === 200) {
                // setAlreadyReg({id: workid})
                onClose()

            }
        }
    }

    return (
        <Modal className={`${styles.modalContainer}`} title={`Registration`} open={isOpen} onOk={fileUpload} onCancel={onClose} style={{overflow:"scroll"}}>

            <Collapse defaultActiveKey={['1']} onChange={() => { }}>
                <Collapse.Panel header="Instructions" key="1">
                    <ol className={styles.modalPadding} >
                        <li className={styles.listItemPadding}>Pay an amount of ₹{amount ? amount : `999`} to the UPI ID: <span className={styles.highlight}>{upiId}</span> or using the QR Code below
                            <br />
                            <Image src={qrimg} className={`${styles.qrimg}`} alt={`${upiId}`} />
                        </li>
                        <li className={styles.listItemPadding}>Upload the screenshot of the payment below
                            <br />
                            <input type="file" name="file" id="file" onChange={(e) => fileSelect(e)} />
                        </li>
                        <li className={styles.listItemPadding}>Click OK to complete registration</li>
                    </ol>
                </Collapse.Panel>
            </Collapse>
            {/* <p>Username : {username}</p> */}
            <div>
                Reciept : <AntImg src={"https://api.staging.ragam.co.in" + user_workshop_detail?.attributes?.receipt?.data?.attributes?.url}
                width={200} />
            </div>
            <div>
                Status: {user_workshop_detail?.verified === false ? "Rejected" : user_workshop_detail?.verified ? "Verified" :"Not yet verified"}
            </div>

        </Modal>
    )
}

export default RegDetailsModal