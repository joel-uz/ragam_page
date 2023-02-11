import { Collapse, Modal, Image as AntImg, Button, Input, Popconfirm, message } from "antd"
import Image from "next/image";
import styles from "../styles/eachevent.module.css"
import questionStyles from "../styles/questions.module.css"
import qrimg from "../public/qrimg.jpg"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const Questions = ({ event,
    user_event_detail,
    refetchDetails }
) => {
    const { token, rId } = useContext(LoginContext)
    const { questionInfo } = event;
    const { userResponses: userResponsesString } = user_event_detail?.attributes || "";
    const [userResponsesObj, setuserResponsesObj] = useState({});
    useEffect(() => {
        if(!userResponsesString)
        setuserResponsesObj({})
        else
        setuserResponsesObj(JSON.parse(userResponsesString))
    }, [userResponsesString, user_event_detail])
    // console.log(event, user_event_detail)
    const [submitLoading, setSubmitLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()

    const onAnswerChange = (qId, val) => {
        let newObj = {
            ...userResponsesObj,
            [qId]: val
        }
        // console.log(newObj)
        setuserResponsesObj(newObj);

    }
    const messageSuccess  =  (msg)  =>  {
        messageApi.open({
            type:'success',
             content:msg
        })
    }
    const updateAns = async (team) => {
        if(submitLoading)
        return;
        setSubmitLoading(true)
        const response = await fetch(`https://api.staging.ragam.co.in/api/user-event-details/${user_event_detail.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            method: "PUT",
            body: JSON.stringify({ "data": { userResponses: JSON.stringify(userResponsesObj) } })
        })
        //error / success handling 
        // show messsage?
        let res = await response.json();
        // console.log(res)
        if (res?.error?.status == 400) {
            //show err
            setErr(res.error.message)
            setSubmitLoading(false)
            return;
        }
        //show succeess
        messageSuccess("Submitted successfully")
        refetchDetails();
        setSubmitLoading(false)


    };
    return (
        <div>
            {contextHolder}
            <div className={questionStyles.head}> Questions</div>

            {/* <div>Fill required details for .</div> */}
            {/* <div>Team Name: <Input  className={styles.mobileInput}  type="text" placeholder="Team Name" onChange={setRagamId}></Input></div> */}
            <div className={questionStyles.questions}>
                {questionInfo?.map((question) => {
                    return (
                        <div className={questionStyles.question}>
                        <div>
                            {question.question}
                        </div>
                        <Input className={styles.mobileInput} onChange={(e)=>{onAnswerChange(question.id, e.target.value)}} value={userResponsesObj[question.id] || ""}>

                        </Input>
                        </div>
                    )
                })}
            </div>

            <button className={questionStyles.submitbtn} onClick={updateAns}> Submit </button>
        </div>)
};
export default Questions;