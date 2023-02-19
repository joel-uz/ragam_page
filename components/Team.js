import { Collapse, Modal, Image as AntImg, Button, Input, Popconfirm, message } from "antd"
import Image from "next/image";
import styles from "../styles/eachevent.module.css"
import teamStyles from "../styles/team.module.css"
import qrimg from "../public/qrimg.jpg"
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";

const Team = ({ event = {
    minTeamSize: 1,
    maxTeamSize: 1
},
    user_event_detail = {
        id: null,
        attributes: {
            teamMembers: {
                data: [

                ]
            }
        }
    },
    refetchDetails }
) => {
    const { token, rId } = useContext(LoginContext)
    const { minTeamSize, maxTeamSize } = event;
    const { teamMembers } = user_event_detail.attributes;
    // console.log(event, user_event_detail)
    const [showAdd, setShowAdd] = useState(false);
    const [ragamIdToAdd, setRagamIdToAdd] = useState("");
    const [userToAdd, setUserToAdd] = useState(null);
    const [err, setErr] = useState(null);
    const [AddBTNLoading, setAddBTNLoading] = useState(false);
    const [userFetching, setUserFetching] = useState(false);
    const [messageApi,contextHolder]    =   message.useMessage()

    const onPlusBTN = () => {
        setShowAdd(true)
    }
    const setRagamId = (e) => {

        setRagamIdToAdd(e);
        //check ragamId in team --
        if (e.length === 5) {
            let found = teamMembers.data.find((item) => item.attributes.ragamId === "R23-" + e)
            if (found) {
                setErr("RagamId : R23-" + e + " already present in team");
                return;
            }
            if (!userFetching)
                fetchUserToAdd(e);


        }
        setErr("");
    }
    const fetchUserToAdd = async (ragamId) => {
        setUserFetching(true)
        const response = await fetch(`https://api.staging.ragam.co.in/api/user/findUser?ragamId=R23-${ragamId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "GET"
        })
        let user = await response.json();
        // console.log(user)
        if (user?.error?.status === 404) {
            setErr("User with ragamId R23-" + ragamId + " was not found. Please try again.")
            setUserToAdd(null);
            setUserFetching(false);
            return;

        }
        //error handling
        setUserFetching(false)
        setUserToAdd(user);


    }
    const addTeamMate = async() => {
        setAddBTNLoading(true)
        const newTeam = teamMembers.data.map((member) => { return { id: member.id } });
        newTeam.push({ id: userToAdd.id })
        await updateTeam(newTeam)
        messageSuccess("Teammate added successfully")

    }
    const messageSuccess  =  (msg)  =>  {
        messageApi.open({
            type:'success',
             content:msg
        })
    }
    const removeTeamMate = async(removeid) => {
        // console.log(removeid)
        let newTeam = teamMembers.data.filter((member) => member.id != removeid);
        // console.log(newTeam)
        newTeam = newTeam.map((member) => { return { id: member.id } });
        // console.log(newTeam)
        await updateTeam(newTeam)
        messageSuccess("Teammate removed successfully")

    }

    const updateTeam = async (team) => {
        const response = await fetch(`https://api.staging.ragam.co.in/api/user-event-details/${user_event_detail.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            method: "PUT",
            body: JSON.stringify({ "data": { teamMembers: team } })
        })
        //error / success handling 
        // show messsage?
        let res = await response.json();
        // console.log(res)
        if (res?.error?.status == 400) {
            //show err
            setErr(res.error.message)
            return;
        }
        //show succeess
        setUserToAdd(null);
        setRagamId("");
        setShowAdd(false)
        refetchDetails();


    };
    return (
        <div>
            {contextHolder}
            <div className={teamStyles.team}> Team</div>

            <div>Add members to your team using ragamId.</div>
            {/* <div>Team Name: <Input  className={styles.mobileInput}  type="text" placeholder="Team Name" onChange={setRagamId}></Input></div> */}
            <div className={teamStyles.teamMembers}>
                {teamMembers?.data.map((member) => {
                    return (
                        <div key={member.id} className={teamStyles.teamMember}>
                            <div>
                                {member.attributes.name}
                            </div>
                            <div>
                                {member.attributes.ragamId}
                            </div>
                            <div>
                                {member.attributes.ragamId != rId ?

                                    <Popconfirm
                                        title="Delete teammate"
                                        description={"Are you sure to remove " + member.attributes.ragamId + "?"}
                                        onConfirm={() => removeTeamMate(member.id)}
                                        onCancel={() => { }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button>X</button>
                                    </Popconfirm>
                                    :
                                    <div>
                                        (You)
                                    </div>
                                }
                            </div>
                        </div>
                    )

                })}
            </div>
            <div>
                {teamMembers?.data?.length < maxTeamSize && !showAdd && <div>
                    <button className={teamStyles.addBtn} onClick={onPlusBTN}> + Add member </button>
                </div>
                }
                {showAdd &&
                    <div>
                        Enter RagamID: R23 - <Input className={styles.mobileInput} type="text" placeholder="eg: RTGFF" onChange={(e) => setRagamId(e.target.value)}></Input>
                        {userToAdd && <div>
                            User found with ragamId R23-{ragamIdToAdd}
                            <div> Name: {userToAdd.name} </div>
                            <div> College: {userToAdd.college} </div>

                            {!err && <button className={teamStyles.addBtn} onClick={addTeamMate}> Add to team</button>}
                        </div>
                        }
                        <div>
                            {err}
                        </div>
                    </div>}
                {teamMembers?.data?.length < minTeamSize && <div> 
                    Minimum {minTeamSize} members are required in a team.
                    </div>}
            </div>
        </div>)
};
export default Team;