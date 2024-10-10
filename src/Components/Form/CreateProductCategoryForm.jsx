import React, { useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';

const CreateProductCategoryForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
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
            <div className='text-center py-3 pb-6'>
                <button className='w-[60%] py-2 bg-[#F27405] text-white rounded-md'>
                    Submit
                </button>
            </div>
        </Form >
    )
}

export default CreateProductCategoryForm
