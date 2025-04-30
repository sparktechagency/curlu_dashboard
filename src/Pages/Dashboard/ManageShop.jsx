import React, { useState } from 'react';
import { Modal, Table, Button, Image } from 'antd';
import { FaPlus, FaRegFilePdf, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useUpdateProductMutation, useGetProductsQuery, useDeleteProductMutation } from '../../Redux/Apis/manageEshopApis';
import CreateProductForm from '../../Components/Form/CreateProductForm';
import { generateImage } from '../../Redux/baseApi';
import { CSVLink } from 'react-csv';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';

const ManageShop = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [openModal, setOpenModal] = useState(false);
    const [editProductData, setEditProductData] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    // Fetch products
    const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery(page);
    const [deleteProduct] = useDeleteProductMutation();
    // Transform data for table
    const transformedData = productsData?.data?.map((item, index) => ({
        key: index + 1 + ((productsData?.current_page - 1) * productsData?.per_page),
        id: item.id,
        name: item.product_name,
        category: item.shop_category_id,
        product_details: item?.product_details,
        product_link: item?.product_link,
        img: generateImage(item.product_image),
        created_at: new Date(item.created_at).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    }));

    const handleDeleteConfirm = (id) => {
        setProductIdToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(productIdToDelete).unwrap();
            Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to delete the product.", "error");
        }
        setDeleteModalVisible(false);
    };

    const handleEditProduct = (product) => {
        setEditProductData(product);
        setOpenModal(true);
    };

    const columns = [
        { title: "S.No", dataIndex: "key", key: "key" },
        {
            title: "Product Image",
            dataIndex: "img",
            key: "img",
            render: (img) => (
                <div className="flex justify-start items-center gap-2">
                    <Image className="!w-10 !h-10 !object-cover !rounded-full" src={img} alt="Product" />
                </div>
            )
        },
        { title: "Product Name", dataIndex: "name", key: "name" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Date", dataIndex: "created_at", key: "created_at" },
        {
            title: "ACTION",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div className='flex justify-start items-center gap-2'>
                    <FaEdit onClick={() => handleEditProduct(record)} className="text-[#F25C05] text-2xl cursor-pointer" />
                    <MdDelete onClick={() => handleDeleteConfirm(record.id)} className="text-[#F25C05] text-2xl cursor-pointer" />
                </div>
            )
        }
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <div className='mb-6 flex justify-between items-center'>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All E-Shop Products</h1>
                <div className='flex justify-end items-center gap-3'>
                    <CSVLink data={transformedData || []}>
                        <button className='text-2xl'>
                            <BsFileEarmarkExcelFill />
                        </button>
                    </CSVLink>
                    <button
                        onClick={() => setOpenModal(true)}
                        className='flex justify-start items-center gap-2 text-white p-2 rounded-md bg-[#F27405]'
                    >
                        <FaPlus /> Add Product
                    </button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={transformedData || []}
                loading={isProductsLoading}
                pagination={{
                    pageSize: productsData?.per_page,
                    current: parseInt(page),
                    onChange: handlePageChange,
                    total: productsData?.total
                }}
            />
            <Modal
                open={openModal}
                onCancel={() => { setOpenModal(false); setEditProductData(null); }}
                centered
                footer={null}
                width={500}
            >
                <CreateProductForm
                    closeModal={() => { setOpenModal(false); setEditProductData(null); }}
                    initialValues={editProductData}
                />
            </Modal>
            <Modal
                centered
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                width={400}
                footer={null}
            >
                <div className="p-6 text-center">
                    <p className="text-[#F27405] text-center font-semibold">Are you sure?</p>
                    <p className="pt-4 pb-12 text-center">Do you want to delete this product?</p>
                    <Button type="primary" danger onClick={handleDeleteProduct}>Confirm</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageShop;
