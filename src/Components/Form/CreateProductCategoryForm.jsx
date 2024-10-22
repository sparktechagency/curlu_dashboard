import React, { useEffect, useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';
import { useCreateShopCategoryMutation, useUpdateShopCategoryMutation } from '../../Redux/Apis/shopCategory';
import toast from 'react-hot-toast';

const CreateProductCategoryForm = ({ closeModal, formFor, selectedData, setSelectedData }) => {
    const [form] = Form.useForm()
    const [create, { isLoading: isCreating }] = useCreateShopCategoryMutation()
    const [update, { isLoading: isUpdating }] = useUpdateShopCategoryMutation()

    const onFinish = (values) => {
        if (formFor === 'add') {
            create(values).unwrap().then(res => {
                closeModal()
                form.resetFields()
                toast.dismiss()
                toast.success(res?.message)
            }).catch(err => {
                toast.dismiss()
                toast.error(err?.data?.message)
            })
        } else {
            values._method = 'PUT';
            update({ id: selectedData?.id, data: values }).unwrap().then(res => {
                closeModal()
                form.resetFields()
                toast.dismiss()
                toast.success(res?.message)
                setSelectedData({})
            }).catch(err => {
                toast.dismiss()
                toast.error(err?.data?.message)
            })
        }
    };
    useEffect(() => {
        if (selectedData) {
            form.setFieldsValue(selectedData)
        }
    }, [selectedData])
    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item className=''
                label="Category Name"
                name="category_name"
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
                <button disabled={isUpdating || isCreating} className='w-[60%] py-2 bg-[#F27405] text-white rounded-md'>
                    {(isUpdating || isCreating) ? 'Loading Please Wait' : 'Submit'}
                </button>
            </div>
        </Form >
    )
}

export default CreateProductCategoryForm
