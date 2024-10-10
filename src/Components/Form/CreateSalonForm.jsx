import React, { useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';
const CreateSalonForm = () => {
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [CpasswordInputType, setCPasswordInputType] = useState('password');
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const [image, setImage] = useState({
        idCard: false,
        Kbis: false,
        profile: false
    })
    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className='grid grid-cols-2 gap-2'>
                <Form.Item
                    label="Salon name"
                    name="salonName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Salon name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Salon location"
                    name="salonLocation"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Salon location!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone No."
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone No.!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bank account no."
                    name="bankAccount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Bank account no.!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className='relative'
                    label="Id card"
                    type='file'
                    name="idCard"
                >
                    <label className='flex justify-start items-center gap-2 border w-full py-1 px-2 rounded-md' htmlFor="idCard">
                        {
                            image?.idCard ? <p>{image?.idCard?.name}</p> : <p className='flex justify-start items-center gap-2 w-full '><FaImage /> browse image or pdf file</p>
                        }
                    </label>
                    <Input onInput={(e) => {
                        setImage({ ...image, idCard: e.target.files[0] })
                    }} style={{
                        display: 'none'
                    }} id='idCard' type="file" />
                </Form.Item>
                <Form.Item
                    className='relative'
                    label="Kbis"
                    type='file'
                    name="Kbis"
                >
                    <label className='flex justify-start items-center gap-2 border w-full py-1 px-2 rounded-md' htmlFor="Kbis">
                        {
                            image?.Kbis ? <p>{image?.Kbis?.name}</p> : <p className='flex justify-start items-center gap-2 w-full '><FaImage /> browse image or pdf file</p>
                        }
                    </label>
                    <Input onInput={(e) => {
                        setImage({ ...image, Kbis: e.target.files[0] })
                    }} style={{
                        display: 'none'
                    }} id='Kbis' type="file" />
                </Form.Item>
                <Form.Item
                    className='relative'
                    label="Profile picture"
                    type='file'
                    name="profile"
                >
                    <label className='flex justify-start items-center gap-2 border w-full py-1 px-2 rounded-md' htmlFor="profile">
                        {
                            image?.profile ? <p>{image?.profile?.name}</p> : <p className='flex justify-start items-center gap-2 w-full '><FaImage /> browse image or pdf file</p>
                        }
                    </label>
                    <Input onInput={(e) => {
                        setImage({ ...image, profile: e.target.files[0] })
                    }} style={{
                        display: 'none'
                    }} id='profile' type="file" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <div className='relative'>
                        <Input type={passwordInputType} className='w-full' />
                        {
                            passwordInputType == 'password' ? <button onClick={() => setPasswordInputType('text')} type='button' className='absolute right-2 top-[50%] translate-y-[-50%]'><FaEyeSlash /></button> : <button onClick={() => setPasswordInputType('password')} type='button' className='absolute right-2 top-[50%] translate-y-[-50%]'> <FaEye /></button>
                        }

                    </div>
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="Cpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                    ]}
                >
                    <div className='relative'>
                        <Input type={passwordInputType} className='w-full' />
                        {
                            CpasswordInputType == 'password' ? <button onClick={() => setCPasswordInputType('text')} type='button' className='absolute right-2 top-[50%] translate-y-[-50%]'><FaEyeSlash /></button> : <button onClick={() => setCPasswordInputType('password')} type='button' className='absolute right-2 top-[50%] translate-y-[-50%]'> <FaEye /></button>
                        }

                    </div>
                </Form.Item>
            </div>

            <div className='text-center py-3 pb-6'>
                <button className='w-[60%] py-2 bg-[#F27405] text-white rounded-md'>
                    Submit
                </button>
            </div>
        </Form >
    )
}

export default CreateSalonForm
