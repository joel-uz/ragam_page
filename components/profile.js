import { Button, Form, Input, Select } from 'antd';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";
import styles from "../styles/profile.module.css"
const { Option } = Select;

const layout = {
};
const tailLayout = {

};

const ShowProfile = () => {
  const {username, setUsername, profileComplete,
    mail, setMail, phone, setPhone, district, setDistrict, state, setState, gender,
    setGender, college, setCollege, year, setYear, ref, setRef, signin, token, id,ready, setReady} = useContext(LoginContext);
    
  const [form] = Form.useForm();

  const submitValues = async(username, mail,phone,district,state, gender, college,year,ref) =>{

    const response = await fetch(`https://api.staging.ragam.co.in/api/user/me`, 
    {
     method:'PUT',
     headers:{
      "Content-Type":"application/json",
       Authorization:
           `Bearer ${token}`,
     },
     body: JSON.stringify({
      "name": `${username}`,
      "email": `${mail}`,
      "phone":`${phone}`,
      "college": `${college}`,
      "year":`${year}`,
      "refCode":`${ref}`,
      "state":`${state}`,
      "district":`${district}`,
      "gender":`${gender}`,
    })
    })
    if (response.status===200) {
      setOk(1)
    }
  }

  const [ok,setOk]  = useState(profileComplete())

  const onFinish = (values) => {
    console.log(values);
  };

  const onSubmit = () => {
    submitValues(username, mail,phone,district,state, gender, college,year,ref)
  };


  return (
    <div  className={`${styles.column}`}>
    <Form  className={`${styles.minWidth}`}
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label={<label className={`${styles.label}`}>Name </label>}
        name="Name"
        initialValue={username}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
    placeholder="Name"
    onChange={(event) =>{
        setUsername(event.target.value)
    }}/>
      </Form.Item>
      <Form.Item
        name="Mail"
        label={<label className={`${styles.label}`}>Email </label>}
        initialValue={mail}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
    placeholder="Mail"
    disabled
    onChange={(event) =>{
        setMail(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="Phone"
        label={<label className={`${styles.label}`}>Phone </label>}
        initialValue={phone}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
    placeholder="Phone"
    onChange={(event) =>{
        setPhone(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="gender"
        label={<label className={`${styles.label}`}>Gender </label>}
        initialValue={gender}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
        className={`${styles.selectColor}`}
        dropdownStyle={{ backgroundColor: '#1d1d1e',color:'#eeeeee' }}
          placeholder="Select a option and change input text above"
          allowClear
          onChange={(event) =>{
            setGender(event)
        }}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="College"
        label={<label className={`${styles.label}`}>College </label>}
        initialValue={college}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
    placeholder="College"
    onChange={(event) =>{
        setCollege(event.target.value)
    }}/>
      </Form.Item>

    <Form.Item
        name="Studying year"
        label={<label className={`${styles.label}`}>Year of study </label>}
        initialValue={year}
        rules={[
          {
            required: true,
          },
        ]}
    > 
    <Input type={'text'}
    className={`${styles.mobileInput}`}
    placeholder="Year"
    onChange={(event) =>{
        setYear(event.target.value)
    }}/>
    </Form.Item>

    
      <Form.Item
        name="State"
        label={<label className={`${styles.label}`}>State </label>}
        initialValue={state}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
    placeholder="state"
    onChange={(event) =>{
        setState(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="District"
        label={<label className={`${styles.label}`}>District </label>}
        initialValue={district}
        rules={[
          {
            required: true,
          },
        ]}>
        <Input type={'text'}
        className={`${styles.mobileInput}`}
        placeholder="district"
        onChange={(event) =>{
            setDistrict(event.target.value)
        }}/>
        </Form.Item>
  
      <Form.Item
        name="Ref"
        label={<label className={`${styles.label}`}>Referral code </label>}
        initialValue={ref}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type={'text'}
        className={`${styles.mobileInput}`}
        placeholder="Referral code"
        onChange={(event) =>{
            setState(event.target.value)
        }}/>
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
        {signin&&!ok&&
              <div className={styles.warning}>Please complete your profile</div>
            }
</div>
    );
  }
;
export default ShowProfile;