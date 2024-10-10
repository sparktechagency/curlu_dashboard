import React, { useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, Select, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';

const CreateProductFrom = ({setOpen}) => {
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
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item className=''
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your product name!',
                    },
                ]}
            >
                <Input className='py-3' />
            </Form.Item>
            <Form.Item className=''
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please select your Category!',
                    },
                ]}
            >
                <Select className='w-full h-[40px]'
                    onChange={handleChange}
                    showSearch
                    placeholder="Hair style"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        { value: '1', label: 'Jack' },
                        { value: '2', label: 'Lucy' },
                        { value: '3', label: 'Tom' },
                    ]}
                />
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
            <Form.Item className=''

                label="Include link"
                name="link"
                rules={[
                    {
                        required: true,
                        message: 'Please input your product link!',
                    },
                ]}
            >
                <Input placeholder='product link' type='url' className='py-3' />
            </Form.Item>
            <Form.Item className=''
                label="Details"
                name="details"
                rules={[
                    {
                        required: true,
                        message: 'Please input your product link!',
                    },
                ]}
            >
                <TextArea placeholder='Details' style={{
                    resize: 'none',
                    height: '100px'
                }} className='py-3 resize-none' />
            </Form.Item>
            <div className='text-center py-3 pb-6'>
                <button onClick={()=>setOpen(false)} className='w-[60%] py-2 bg-[#F27405] text-white rounded-md'>
                    Submit
                </button>
            </div>
        </Form >
    )
}

export default CreateProductFrom
