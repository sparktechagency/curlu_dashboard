import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FaImage } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { useGetShopCategoriesQuery } from '../../Redux/Apis/shopCategory';
import { useCreateProductMutation, useUpdateProductMutation } from '../../Redux/Apis/manageEshopApis';

const CreateProductForm = ({ closeModal, initialValues = {} }) => {
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [image, setImage] = useState(null);
    const [form] = Form.useForm()
    const { data: shopCategory, isFetching, isLoading } = useGetShopCategoriesQuery({
        page: 1,
        per_page: 99999999
    });

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('product_name', values.name);
        formData.append('shop_category_id', values.category);
        if (image) formData.append('product_image', image);
        formData.append('product_link', values.product_link);
        formData.append('product_details', values.product_details);
        try {
            if (initialValues?.id) {
                formData.append('_method', 'PUT');
                await updateProduct({
                    id: initialValues?.id,
                    data: formData
                }).unwrap();
                closeModal();
            } else {
                await createProduct(formData).unwrap();
                closeModal();
            }
        } catch (error) {

            Swal.fire("Error!", error?.data?.message, "error");
        }
    };
    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [form, initialValues])
    return (
        <Form form={form} layout='vertical' className='p-3' onFinish={onFinish} autoComplete="off" >
            <p className='text-[#F27405] text-3xl'>{initialValues?.id ? 'Edit' : 'Add'} E-Shop products</p>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                <Input className='py-3' />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
                <Select placeholder="Select Category" className='w-full h-[40px]'>
                    {
                        shopCategory?.data?.map(item => <Select.Option key={item?.id} value={item?.id}>{item?.category_name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item label="Image" name="image">
                <label className='flex items-center gap-2 border w-full py-3 px-2 rounded-md' htmlFor="productImage">
                    <FaImage />
                    <span>{image ? image.name : 'Browse image'}</span>
                </label>
                <input
                    type="file"
                    id="productImage"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: 'none' }}
                />
            </Form.Item>
            <Form.Item label="Product Link" name="product_link" rules={[{ required: true, message: 'Please input product link!' }]}>
                <Input type='url' placeholder='Product link' className='py-3' />
            </Form.Item>
            <Form.Item label="Details" name="product_details" rules={[{ required: true, message: 'Please input product details!' }]}>
                <TextArea placeholder='Details' style={{ resize: 'none', height: '100px' }} />
            </Form.Item>
            <Button type="primary" style={{
                background: '#F27405'
            }} htmlType="submit" className="w-full mt-4">
                {initialValues?.id ? 'Update Product' : 'Add Product'}
            </Button>
        </Form>
    );
};

export default CreateProductForm;

