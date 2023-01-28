import { Button, Form, Input, Select } from 'antd';
import { useContext } from "react";
import { LoginContext } from "../contexts/logincontext";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ShowProfile = () => {
  const {username, setUsername, setProfile, profile,
    mail, setMail, phone, setPhone, district, setDistrict, state, setState, gender,
    setGender, college, setCollege, year, setYear, ref, setRef, signin, token, id} = useContext(LoginContext);

  const [form] = Form.useForm();

  const submitValues = async(username, mail,phone,district,state, gender, college,year,ref,id) =>{
    const response = await fetch(`https://api.staging.ragam.co.in/api/users/${id}`, 
    {
     method:'PUT',
     headers:{
       Authorization:
           `Bearer ${token}`,
     },
     body: JSON.stringify({
      "username": {username},
      "email": {mail},
      "phone":{phone},
      "college": {college},
      "year":{year},
      "refCode":{ref},
      "state":{state},
      "district":{district},
      "gender":{gender},
    })
    })

    const data = await response.json()
    console.log(data);
  }

  const getPrevData = async() => {
    const response = await fetch(`https://api.staging.ragam.co.in/api/users/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log(data, '===');
  }

  const prev_data = getPrevData();
  
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = () => {
    submitValues(username, mail,phone,district,state, gender, college,year,ref,id)
    setProfile(true)
    
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="Name"
        label="Name"
        initialValue={username}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="Name"
    defaultValue={username}
    onChange={(event) =>{
        setUsername(event.target.value)
    }}/>
      </Form.Item>
      <Form.Item
        name="Mail"
        label="Mail"
        initialValue={mail}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="Mail"
    defaultValue={mail}
    onChange={(event) =>{
        setMail(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="Phone"
        label="Phone Nmuber"
        initialValue={phone}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="Phone"
    onChange={(event) =>{
        setPhone(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        initialValue={gender}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
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
        label="College"
        initialValue={college}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="College"
    onChange={(event) =>{
        setCollege(event.target.value)
    }}/>
      </Form.Item>

    <Form.Item
        name="Studying year"
        label="Year of study :"
        initialValue={year}
        rules={[
          {
            required: true,
          },
        ]}
    > 
    <Input type={'text'}
    placeholder="Year"
    onChange={(event) =>{
        setYear(event.target.value)
    }}/>
    </Form.Item>

    
      <Form.Item
        name="State"
        label="State"
        initialValue={state}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="state"
    onChange={(event) =>{
        setState(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="District"
        label="District"
        initialValue={district}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="District"
    onChange={(event) =>{
        setDistrict(event.target.value)
    }}/>
      </Form.Item>

      <Form.Item
        name="Ref"
        label="Referral Code"
        initialValue={ref}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input type={'text'}
    placeholder="Ref"
    onChange={(event) =>{
        setRef(event.target.value)
    }}/>
      </Form.Item>
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{marginRight:'4px'}} onClick={onSubmit}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ShowProfile;