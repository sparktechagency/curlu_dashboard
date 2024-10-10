import React, { useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';

const CreateSalonCategoryFrom = () => {
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
                <Form.Item className=''
                    label="Name"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Salon name!',
                        },
                    ]}
                >
                    <Input className='py-3' />
                </Form.Item>
                <Form.Item
                    className='relative'
                    label="Image"
                    type='file'
                    name="image"
                >
                    <label className='flex justify-start items-center gap-2 border w-full py-3 px-2 rounded-md' htmlFor="idCard">
                        {
                            image?.idCard ? <p>{image?.idCard?.name}</p> : <p className='flex justify-start items-center gap-2 w-full '><FaImage /> browse image    </p>
                        }
                    </label>
                    <Input onInput={(e) => {
                        setImage({ ...image, idCard: e.target.files[0] })
                    }} style={{
                        display: 'none'
                    }} id='idCard' type="file" />
                </Form.Item>

            <div className='text-center py-3 pb-6'>
                <button className='w-[60%] py-2 bg-[#F27405] text-white rounded-md'>
                    Submit
                </button>
            </div>
        </Form >
    )
}
export default CreateSalonCategoryFrom
