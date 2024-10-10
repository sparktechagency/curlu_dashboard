import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Form, Input, Modal, Select, Slider, Table, Button, Checkbox, } from 'antd';
import { FaCircle, FaPlus, FaRegFilePdf, FaRegTrashCan, FaStar, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import { MdCheckCircleOutline } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { IoClose, IoTimeOutline } from 'react-icons/io5';
import { GiBackwardTime } from 'react-icons/gi';
const data = [
    {
        key: "1",
        name: "Tushar",
        service: "Afro hair care",
        Salon: "Babaji Salon",
        price: "100€",
        date: "18 Jul, 2023",
        confirmaionDate: "Feb 21, 2023 at 03:05 pm",
        location: "Banasree",
        Status: 'upcoming',
        Status: 'past',
        img: "https://i.ibb.co/B2xfD8H/images.png",
    },
];

const OrdersTransection = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState(false)
    const items = [
        {
            label: "Car",
            key: "Car",
        },
        {
            label: "Bike",
            key: "Bike",
        },
        {
            label: "Cycle",
            key: "Cycle",
        },
    ];

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
            title: "User",
            dataIndex: "name",
            key: "username",
            render: (_, record) => (<div className="flex justify-start items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={record?.img} alt="" />
                <p>{record?.name}</p>
            </div>)
        },
        {
            title: "Salon",
            dataIndex: "Salon",
            key: "Salon",
        },
        {
            title: "Service Orders",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Booking Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Order confirmaion Date",
            dataIndex: "date",
            key: "date",
            render: (_, record) => {
                return (<div>
                    <p className='text-[#D93D04]'>{record?.confirmaionDate}</p>
                </div>)
            }
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_, record) => {
                return (<div>
                    <p className='text-[#00B047]'>{record?.price}</p>
                </div>)
            }
        },
        {
            title: "Status",
            dataIndex: "price",
            key: "price",
            render: (_, record) => {
                return (<div className={`${record?.Status == 'past' ? 'text-[#00B047] ' : 'text-[#F27405]'} flex justify-start items-center gap-2 capitalize`}>
                    <FaCircle />
                    <p>{record?.Status}</p>
                </div>)
            }
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <GoArrowUpRight onClick={() => { setOpen(true) }} className="text-blue-500 text-2xl cursor-pointer" />
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
                    <Select className='min-w-44 h-[40px]'
                        onChange={handleChange}
                        showSearch
                        placeholder="Price type"
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
                    dataSource={data}
                    pagination={{
                        pageSize: 10,
                        defaultCurrent: parseInt(page),
                        onChange: handlePageChange
                    }}
                />
            </div>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
                width={800}
            >
                <div className='p-6'>
                    <p className="text-[#F27405] text-lg">Transection Deatails</p>
                    <div className="grid grid-cols-2 mt-6 border-b pb-4">
                        <div className="w-full">
                            <p className="font-semibold">User</p>
                            <div className="flex justify-start items-start gap-2 mt-4">
                                <img className="w-20 h-20 rounded-full" src="https://i.ibb.co/B2xfD8H/images.png" alt="" />
                                <div>
                                    <p className="text-base text-[#F27405] font-semibold">Mr. Mahmud</p>
                                    <p className="my-1">mahmud@gmail.com</p>
                                    <p className="my-1">76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris</p>
                                    <p>+099999</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="font-semibold">Salon</p>
                            <div className="flex justify-start items-start gap-2 mt-4">
                                <img className="w-20 h-20 rounded-full" src="https://i.ibb.co/B2xfD8H/images.png" alt="" />
                                <div>
                                    <p className="text-base text-[#734D2C] font-semibold">Babaji Salon</p>
                                    <p className="my-1">mahmud@gmail.com</p>
                                    <p className="my-1">76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris</p>
                                    <p>+099999</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 border-b border-b-[#F27405] pb-4">
                        <div className='grid grid-cols-3  my-2'>
                            <p className="font-semibold col-span-2">Order details</p>
                            <div className={`text-[#F27405] flex justify-end items-center gap-2 capitalize`}>
                                <FaCircle />
                                <p>past</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <p>#11111111</p>
                            <p className="flex justify-center items-center gap-1"><GiBackwardTime className="text-lg" />10 may, 2024</p>
                            <p className="flex justify-end items-center gap-1 text-[#F27405]"><IoTimeOutline className="text-lg" />10 may, 2024-10:00 Am</p>
                        </div>
                    </div>
                    <div className="mt-4 border-b border-b-[#F27405] pb-4">
                        <div className="grid grid-cols-2 mt-2 gap-4">
                            <p className="flex justify-start items-center gap-1">Nottes</p>
                            <p className="flex justify-end items-center gap-1 ">80€</p>
                            <p className="flex justify-start items-center gap-1">Tissages</p>
                            <p className="flex justify-end items-center gap-1 ">80€</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="grid grid-cols-2 mt-2 gap-3">
                            <p className="flex justify-start items-center gap-1">Total</p>
                            <p className="flex justify-end items-center gap-1 ">200€</p>
                            <p className="flex justify-start items-center gap-1 text-[#00B047]">Salon earning</p>
                            <p className="flex justify-end items-center gap-1 text-[#00B047]">80€</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default OrdersTransection
