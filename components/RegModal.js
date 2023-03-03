import { Modal, Input, Button } from "antd"
import styles from "../styles/eachevent.module.css"
import qrimg from "../public/qrimg.jpg"
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CopyOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const RegModal = ({ type = 'workshop', payeeData, loadingResponse, setLoadingResponse, messageError, messageSuccess, isModalOpen, closeModal, amount, SubmitVerifiedData, SubmitData, setAlreadyReg, commonPayment=false, commonPaymentVerified, passName="", passPage, insiderSlug, insiderMerchantId,ragamId }) => {

    const router = useRouter();
    const { token } = useContext(LoginContext)
    const [upload, setUpload] = useState(null)
    const [refCode, setRefCode] = useState(null)
    const [utr, setUTR] = useState(null)
    const [utrError, setUtrError] = useState(false)
    // const [loading, setLoading] = useState(false)
    var loading = false
    // const upiId = '9207619833@ybl'
    // const   [payee,setPayee]  =   useState(1)



    const fileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUpload(e.target.files[0])
        }
    }

    const changeRefCode = (e) => {
        setRefCode(e.target.value)
    }

    const changeUTR = (e) => {
        setUTR(e.target.value)
    }
    const fileUpload = async () => {
        if (utr?.length !== 12) {
            setUtrError(true)
            return
        }
        let isnum = /^\d+$/.test(utr);
        if (!isnum) {
            setUtrError(true)
            return
        }
        else {
            // console.log('hi bro');
            setUtrError(false)
        }
        if (upload && !loadingResponse) {
            setLoadingResponse(true)
            const workid = await SubmitData(refCode, utr)
            const reqBody = new FormData();
            reqBody.append("files", upload)
            reqBody.append("ref", `api::user-${type}-detail.user-${type}-detail`)
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
            // console.log(value);
            if (workid && response.status === 200) {
                messageSuccess()
                setAlreadyReg({ id: workid })
                closeModal()
                // loading =   false
                setLoadingResponse(false)
            }
            else {
                messageError()
                // loading =   false
                setLoadingResponse(false)
                closeModal()
            }
        }
    }

    const registerVerifiedEvent = async () => {

        if (!loadingResponse) {
            setLoadingResponse(true)
            const workid = await SubmitVerifiedData(refCode)

            if (workid) {
                messageSuccess()
                setAlreadyReg({ id: workid })
                closeModal()
                // loading =   false
                setLoadingResponse(false)
            }
            else {
                messageError()
                // loading =   false
                setLoadingResponse(false)
                closeModal()
            }
        }
    }

    const goToPassPage = () => {

        let slug;

        if (passName == "Ragam Pass")
            slug = 27;

        else if (passName == "Kalolsavam Pass")
            slug = 28;

        router.push({ pathname: "/events/18/[slug]", query: { slug: slug } })
    }




    useEffect(() => {
        setRefCode(localStorage.getItem('refCode'))
    }, [])
    

    useEffect(() => {

        if(isModalOpen && commonPayment==false && passName==""){
            insiderEmbed.init({
                "mountId": "insider-embed",
                "eventSlug": insiderSlug,
                "frameHeight":400,
                "merchantId": insiderMerchantId,
                "redirectURL": window.location.href
              });
        }
        
    }, [isModalOpen])

    return (
        <>
        <Modal className={`${styles.modalContainer}`} title={`Registration`} open={isModalOpen} onOk={fileUpload} onCancel={closeModal}
            footer={
                commonPayment ? commonPaymentVerified ?
                    <>
                        <Button onClick={() => closeModal()}>Close</Button>
                        <Button onClick={() => registerVerifiedEvent()} type="primary" loading={loadingResponse}>Register</Button>
                    </> :
                    <>
                        <Button onClick={() => closeModal()}>Close</Button>
                    </>
                    : (passName != "" && !passPage) ?
                        <>
                            <Button onClick={() => closeModal()}>Close</Button>
                            <Button onClick={() => goToPassPage()} type="primary" loading={loadingResponse}>Get {passName}</Button>
                        </> :
                        <>
                            <Button onClick={() => closeModal()}>Close</Button>
                            {/* <Button onClick={() => fileUpload()} type="primary" loading={loadingResponse}>OK</Button> */}
                        </>

            }
        >
            { }
            {commonPayment ? commonPaymentVerified ?
                <>
                    <p>
                        You have already registered for {passName} or an event under {passName}. Therefore no additional fee is applicable to register for this event. Click the register button below to complete your registration.

                    </p>
                    <br />
                    <p>Enter referral code: <span>
                        <Input className={styles.mobileInput} type="text" placeholder="Referral Code" onChange={(e) => changeRefCode(e)} defaultValue={refCode}></Input>
                    </span></p>
                </> :
                <p>
                    You have already registered for {passName} or an event under {passName}. Please wait till we verify that, so that you could register for this event free of cost.
                </p>
                : (passName != "" && !passPage) ?
                    <p>
                        This event comes under {passName}. Please register for {passName} first and then you could register for this event free of cost.
                    </p> :
                    <>
                    <h2>
                        Instructions:
                    </h2>
                    <ol className={styles.modalPadding}>
                         {/* <li className={styles.listItemPadding}>Log in to paytm insider <a className={styles.hyperlink} href="https://insider.in/online" target="_blank" onClick={()=>closeModal()}>here</a> in a different tab using the same email id used to log in to Ragam website</li> */}
                         <li className={styles.listItemPadding}>Complete your registration below</li>
                         <li className={styles.listItemPadding}>You may be redirected to paytm insider website during checkout. In that case, you can complete your registration there and come back to check your status</li>
                         <li className={styles.listItemPadding}>Once the payment is done, check <Link className={styles.hyperlink} href="../../dashboard">dashboard</Link> to view all your registrations</li>
                         <li className={styles.listItemPadding}>Make sure that the Ragam Id is given correctly.
                         <br />
                         Your Ragam Id is {ragamId} <a className={styles.hyperlink} onClick={()=>{navigator.clipboard.writeText(ragamId)}}><CopyOutlined/></a></li>
                         <br />
                     </ol>
                    <div id="insider-embed" className={`${styles.insiderIframe}`}></div>
                    </>
                    
                // <>
                //     <h2>
                //         Instructions:
                //     </h2>
                //     <ol className={styles.modalPadding}>
                //         <li className={styles.listItemPadding}>Pay an amount of ₹{amount} to the UPI ID: <span className={styles.highlight}>{payeeData.paymentId}</span>
                //             &nbsp;or using the QR Code below:
                //             <br />
                //             <b className={styles.highlight}>{payeeData.name}</b> <br />
                //             <Image src={payeeData.qrcode} className={`${styles.qrimg}`} alt={payeeData.paymentId} height={250} width={250} />
                //         </li>
                //         <li className={styles.listItemPadding}>Upload the screenshot of the payment containing <b className={styles.highlight}>UTR number or UPI transaction ID</b> below:
                //             <br />
                //             <input type="file" name="file" id="file" onChange={(e) => fileSelect(e)} />
                //         </li>
                //         <li className={styles.listItemPadding}>
                //             Enter UTR number (UPI transaction ID):
                //             <Input className={styles.mobileInput} type="text" placeholder="UTR number" onChange={(e) => changeUTR(e)}></Input>
                //             <br />
                //             {utrError && <span className={styles.rejected}>Invalid UTR number</span>}
                //         </li>
                //         <li>
                //             Enter referral code: <span>
                //                 <Input className={styles.mobileInput} type="text" placeholder="Referral Code" onChange={(e) => changeRefCode(e)} defaultValue={refCode}></Input>
                //             </span>
                //         </li>
                //         <li className={styles.listItemPadding}>Click OK to complete registration</li>
                //     </ol>
                // </>

            }
        </Modal>
        </>
    )
}

export default RegModal