import React, { useEffect, useState } from 'react'
import { Calendar, Dropdown, Form, Input, Button, Checkbox, Space, } from 'antd';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa6';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../Redux/Apis/categoryApis';
import toast from 'react-hot-toast';
import { MakeFormData } from '../../Util/MakeFormData';

const CreateSalonCategoryFrom = ({ create, setOpenAddSalon, setSelectedCategory, selectedCategory }) => {
    const [form] = Form.useForm()
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [image, setImage] = useState({
        idCard: false,
        Kbis: false,
        profile: false
    })
    const onFinish = (values) => {
        if (create) {
            if (!image?.idCard) {
                return toast.error('Please select a service Image')
            }
            values.category_image = image?.idCard
            const formData = MakeFormData(values)
            createCategory(formData).unwrap()
                .then((res) => {
                    setOpenAddSalon(false)
                    setSelectedCategory({})
                    form.resetFields()
                    toast.dismiss()
                    toast.success(res?.message)
                })
                .catch((err) => {
                    toast.dismiss()
                    toast.error(err?.data?.message || 'Something Went Wrong')
                    console.log(err);
                });
        } else {
            if (image?.idCard) {
                values.category_image = image?.idCard
            }
            values._method = 'PUT'
            const formData = MakeFormData(values)
            updateCategory({ id: selectedCategory?.id, data: formData }).unwrap()
                .then((res) => {
                    setOpenAddSalon(false)
                    setSelectedCategory({})
                    form.resetFields()
                    toast.dismiss()
                    toast.success(res?.message)
                })
                .catch((err) => {
                    toast.dismiss()
                    toast.error(err?.data?.message || 'Something Went Wrong')
                    console.log(err);
                });
        }

    };
    useEffect(() => {
        form.setFieldsValue({
            category_name: selectedCategory?.name,
            // category_image:selectedCategory?.img
        })
    }, [selectedCategory?.id])
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item className=''
                label="Name"
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
            <Form.Item
                className='relative'
                label="Image"
                type='file'
            // name="category_image"
            >
                <label className='flex justify-start items-center gap-2 border w-full py-3 px-2 rounded-md overflow-hidden' htmlFor="idCard">
                    {
                        image?.idCard ? <p>{image?.idCard?.name}</p> : selectedCategory?.img ? <p className=''>{selectedCategory?.img?.split('/').pop()}</p> : <p className='flex justify-start items-center gap-2 w-full '><FaImage /> browse image    </p>
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
