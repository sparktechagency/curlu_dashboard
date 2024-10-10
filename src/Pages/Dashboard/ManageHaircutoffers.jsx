import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Form, Input, Modal, Select, Slider, Table, Button, Checkbox, } from 'antd';
import { FaEye, FaPlus, FaRegFilePdf, FaRegTrashCan, FaStar, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import { MdCheckCircleOutline } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
const data = [
    {
        key: "1",
        name: "Tushar",
        hairStyle: "Afro hair care",
        price: "100€",
        date: "18 Jul, 2023  4:30pm",
        location: "Banasree",
        contact: '5489156454745',
        img: "https://i.ibb.co/B2xfD8H/images.png",
    },
];


const ManageHaircutoffers = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState(false)
    const [openAddSalon, setOpenAddSalon] = useState(false)
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
            title: "Hair Style",
            dataIndex: "hairStyle",
            key: "hairStyle",
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
                <div className='flex justify-start items-center gap-2 text-green-500'>
                    Active
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
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Manage Haircut offers</h1>
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
                    <button className='p-2 text-lg text-white bg-[#F27405] rounded-md'>
                        <FaEye />
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
        </div>
    )
}

export default ManageHaircutoffers
