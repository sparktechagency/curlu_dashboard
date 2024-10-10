import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Form, Input, Modal, Select, Slider, Table, Button, Checkbox, } from 'antd';
import { FaPlus, FaRegFilePdf, FaRegTrashCan, FaStar, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
const data = [
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        location: "Banasree",
        contact: '5489156454745',
        img: "https://i.ibb.co/B2xfD8H/images.png",
    },
];
const SalonsDetails = () => {
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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div className='flex justify-start items-center gap-2'>
                    <GoArrowUpRight onClick={() => { setOpen(true) }} className="text-blue-500 text-2xl cursor-pointer" />
                    <FaUserCheck onClick={() => { }} className="text-green-500 text-2xl cursor-pointer" />
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
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All salon list</h1>
                <div className='flex justify-end items-center gap-3'>
                    <button className='text-2xl'>
                        <FaRegFilePdf />
                    </button>
                    <Select className='min-w-44 h-[40px]'
                        onChange={handleChange}
                        showSearch
                        placeholder="location"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Jack',
                            },
                            {
                                value: '2',
                                label: 'Lucy',
                            },
                            {
                                value: '3',
                                label: 'Tom',
                            },
                        ]}
                    />
                    <button onClick={() => setOpenAddSalon(true)} className='flex justify-start items-center gap-2 text-white p-2 rounded-md bg-[#734D2C]'>
                        <FaPlus />
                        Add Salon
                    </button>
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
                width={700}
            >
                <div>
                    <div className='flex justify-center items-center flex-col gap-4'>
                        <img className='w-full h-[150px]' src="https://i.ibb.co/CBvrNxh/Rectangle-5252.png" alt="" />
                        <div className='flex justify-center items-center flex-col gap-2 -mt-16'>
                            <div className='w-20 h-20 rounded-full relative'>
                                <img className='w-full h-full rounded-full' src="https://i.ibb.co/B2xfD8H/images.png" alt="" />
                                <button className='text-xl text-blue-500 absolute right-0 bottom-0'>
                                    <RiVerifiedBadgeFill />
                                </button>
                            </div>
                            <p className='text-base font-semibold'>Md. Mahmud</p>
                            <div className="flex justify-start items-center gap-2">
                                <FaStar className="text-yellow-500" />
                                <p>4.5/5</p>
                            </div>
                            <p>Total earning : 2000€</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 justify-start items-start gap-3 p-6'>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Salon Name</p>
                            <p className=' text-xs'>Mr. Mahmud</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Email</p>
                            <p className=' text-xs'>mahmud@gmail.com</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Location</p>
                            <p className=' text-xs'>76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Contact No</p>
                            <p className=' text-xs'>+099999</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Experience</p>
                            <p className=' text-xs'>5 year</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Salon type</p>
                            <p className=' text-xs'>All</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Bank Account no.</p>
                            <p className=' text-xs'>321656295461</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>About</p>
                            <p className=' text-xs'>dui. at tortor. nisi vitae Nullam adipiscing malesuada faucibus sit lacus orci Nam ac convallis. amet, elit. Donec elit massa nisl. hendrerit lorem. nec nisi</p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Id card</p>
                            <div className='pr-12 w-full h-[150px]'>
                                <img className='w-full h-full object-contain' src="https://i.ibb.co/LJHCZzZ/1600w-vj-I1-KIbwj8o.webp" alt="" />
                            </div>
                        </div>
                        <div>
                            <p className='text-sm font-semibold mb-1'>Kbis</p>
                            <div className='pr-12 w-full h-[150px]'>
                                <img className='w-full h-full object-contain' src="https://i.ibb.co/LJHCZzZ/1600w-vj-I1-KIbwj8o.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                open={openAddSalon}
                onCancel={() => setOpenAddSalon(false)}
                centered
                footer={false}
                width={700}
            >
                <div className='bg-white p-6 rounded-md'>
                    <p className='text-[#F27405] text-lg font-medium'>Add Salon</p>
                    <CreateSalonForm />
                </div>
            </Modal>
        </div>
    )
}
export default SalonsDetails
