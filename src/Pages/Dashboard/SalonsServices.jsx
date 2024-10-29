import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Form, Input, Modal, Select, Slider, Table, Button, Checkbox, } from 'antd';
import { FaPlus, FaRegFilePdf, FaRegTrashCan, FaStar, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import { MdCheckCircleOutline } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useGetSalonServicesQuery } from '../../Redux/Apis/salonApis';
import { generateImage } from '../../Redux/baseApi';
import { useGetCategoriesQuery } from '../../Redux/Apis/categoryApis';
const data = [
    {
        key: "1",
        name: "Tushar",
        service: "Afro hair care",
        serviceName: "Afro hair care",
        price: "100€",
        date: "18 Jul, 2023  4:30pm",
        location: "Banasree",
        contact: '5489156454745',
        img: "https://i.ibb.co/B2xfD8H/images.png",
    },
];

const SalonsServices = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState(false)
    const [openAddSalon, setOpenAddSalon] = useState(false)
    const { data: salonServices } = useGetSalonServicesQuery({ page })
    const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery({ page, per_page: 99999999 });
    const transformedData = salonServices?.data?.map((item, i) => ({
        key: i + 1 + ((salonServices?.current_page - 1) * salonServices?.per_page),
        id: item?.id,
        name: item?.salon?.user?.name,
        service: item?.service_name,
        serviceName: item?.service_name,
        price: `${item?.price}€`,
        service_status: item?.service_status,
        date: new Date(item?.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        location: item?.salon?.user?.address,
        contact: item?.salon?.user?.phone,
        img: generateImage(item?.service_image)
    }));
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Salon",
            dataIndex: "name",
            key: "username",
            render: (_, record) => (<div className="flex justify-start items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={record?.img} alt="" />
                <p>{record?.name}</p>
            </div>)
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Service catagory",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Service name",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div className='flex justify-start items-center gap-2 text-green-500 cursor-pointer'>
                    {record?.service_status}
                    <MdCheckCircleOutline onClick={() => { }} className=" text-2xl cursor-pointer" />
                </div>
            ),
        },
    ];
    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px"
        }}>
            <div className='mb-6 flex justify-between items-center'

            >
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Salons Services</h1>
                <div className='flex justify-end items-center gap-3'>
                    <button className='text-2xl'>
                        <FaRegFilePdf />
                    </button>
                    <div
                        style={{
                            width: "300px",
                            height: "39px",
                            borderRadius: "8px"
                        }}
                    >
                        <Input
                            placeholder="Search..."
                            prefix={<FiSearch size={14} color="#868FA0" />}
                            suffix={<IoClose size={14} color="#2B2A2A" />}
                            style={{
                                width: "100%",
                                height: "100%",
                                fontSize: "14px"
                            }}
                            size="middle"
                        />
                    </div>
                    <Select className='min-w-44 h-[40px]'
                        onChange={handleChange}
                        showSearch
                        placeholder="Salon Type"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />
                    <Select className='min-w-44 h-[40px]'
                        onChange={handleChange}
                        showSearch
                        placeholder="Service type"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={categoriesData?.data?.map(item => ({
                            label: item?.category_name,
                            value: item?.id
                        }))}
                    />
                    <Select className='min-w-44 h-[40px]'
                        onChange={handleChange}
                        showSearch
                        placeholder="Action"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />
                    <button className='p-2 text-lg text-white bg-[#F27405] rounded-md'>
                        <TfiReload />
                    </button>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={transformedData || []}
                    pagination={{
                        pageSize: 10,
                        defaultCurrent: parseInt(page),
                        onChange: handlePageChange
                    }}
                />
            </div>
        </div>
    )
}
export default SalonsServices
