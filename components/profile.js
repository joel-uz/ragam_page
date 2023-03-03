import { Button, Form, Input, Select,message } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/loginContext";
import styles from "../styles/profile.module.css"
const { Option } = Select;

const layout = {
};
const tailLayout = {

};

const ShowProfile = () => {
  const { name, setUsername, profileComplete,
    mail, setMail, phone, setPhone, district, setDistrict, state, setState, gender,
    setGender, college, setCollege, year, setYear, ref, setRef, signin, token, id, ready, setReady, rId, setRId } = useContext(LoginContext);

  const [messageApi,  contextHolder]  = message.useMessage()
  const fetchUser = async (_token) => {
    const res = await fetch(`https://api.staging.ragam.co.in/api/user/getme`, {
      headers: {
        'Authorization': `Bearer ${_token}`
      }
    });
    const value = await res.json()
    setRId(value.ragamId);
    // console.log("valueee", value)
    return value;
  }
  const [form] = Form.useForm();
  const router = useRouter();
  const submitValues = async (name, mail, phone, district, state, gender, college, year, ref) => {
    if (!profileComplete()) {
      return
    }
    const response = await fetch(`https://api.staging.ragam.co.in/api/user/me`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": `${name}`,
          "email": `${mail}`,
          "phone": `${phone}`,
          "college": `${college}`,
          "year": `${year}`,
          "refCode": `${ref}`,
          "state": `${state}`,
          "district": `${district}`,
          "gender": `${gender}`,
        })
      })
    if (response.status === 200) {
      setOk(1);
      fetchUser(token);
      messageApi.open({
        type:'success',
        content:'Profile updated'
      })
      let redirect = localStorage.getItem("profileRedirect");
      if (profileComplete() && redirect) {
        //snackbar -> profile successfull
        localStorage.removeItem("profileRedirect");
        router.push("/");
      }
      // if (profileComplete()) {
      //   let redirect = localStorage.getItem("loginRedirect");
      //   if (checkProfile(user_details.user) && redirect) {
      //     //snackbar -> login successfull
      //     localStorage.removeItem("loginRedirect");
      //     router.push("/");
      //   }
      // }
    }
    else{
      messageApi.open({
        type:'error',
        content:'Please try again later'
      })
    }
  }

  const [ok, setOk] = useState(profileComplete())

  const onFinish = (values) => {
    console.log(values);
  };

  const onSubmit = () => {
    submitValues(name, mail, phone, district, state, gender, college, year, ref)
  };


  return (
    <div className={`${styles.column}`}>
      {contextHolder}
      <Form className={`${styles.minWidth}`}
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
          initialValue={name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type={'text'}
            className={`${styles.mobileInput}`}
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value)
            }} />
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
            onChange={(event) => {
              setMail(event.target.value)
            }} />
        </Form.Item>

        <Form.Item
          name="RagamId"
          label={<label className={`${styles.label}`}>Ragam Id </label>}
          initialValue={rId}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input type={'text'}
            className={`${styles.mobileInput}`}
            placeholder="RagamId"
            disabled
           />
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
            onChange={(event) => {
              setPhone(event.target.value)
            }} />
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
            dropdownStyle={{ backgroundColor: '#1d1d1e', color: '#eeeeee' }}
            placeholder="Select a option and change input text above"
            allowClear
            onChange={(event) => {
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
            onChange={(event) => {
              setCollege(event.target.value)
            }} />
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
            onChange={(event) => {
              setYear(event.target.value)
            }} />
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
            onChange={(event) => {
              setState(event.target.value)
            }} />
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
            onChange={(event) => {
              setDistrict(event.target.value)
            }} />
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
            onChange={(event) => {
              setState(event.target.value)
            }} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {signin && !ok &&
        <div className={styles.warning}>Please complete your profile</div>
      }
    </div>
  );
}
  ;
export default ShowProfile;