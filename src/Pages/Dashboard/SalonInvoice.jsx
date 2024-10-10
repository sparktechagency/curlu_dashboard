import React, { useState } from 'react';
import { Input, Select, Table, } from 'antd';
import {FaRegFilePdf } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { TfiReload } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
const data = [
    {
        key: "1",
        name: "Tushar",
        service: "Afro hair care",
        Salon: "Babaji Salon",
        Payment: "100€",
        confirmaionDate: "Feb 21, 2023 at 03:05 pm",
        CurluEarning:'100€',
        SalonEarning:'200€',
        orderNo: "11111111",
        img: "https://i.ibb.co/B2xfD8H/images.png",
    },
];


const SalonInvoice = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
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
            title: "Order s.no ",
            dataIndex: "orderNo",
            key: "orderNo",
        },
        {
            title: "Service Orders",
            dataIndex: "service",
            key: "service",
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
            title: "Payment",
            dataIndex: "Payment",
            key: "Payment",
            render: (_, record) => {
                return (<div>
                    <p className='text-black'>{record?.Payment}</p>
                </div>)
            }
        },
        {
            title: "Curlu Earning ",
            dataIndex: "CurluEarning",
            key: "CurluEarning",
            render: (_, record) => {
                return (<div>
                    <p className='text-[#F27405]'>{record?.CurluEarning}</p>
                </div>)
            }
        },
        {
            title: "Salon Earning",
            dataIndex: "SalonEarning",
            key: "SalonEarning",
            render: (_, record) => {
                return (<div>
                    <p className='text-[#00B047]'>{record?.SalonEarning}</p>
                </div>)
            }
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
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Salon Invoice</h1>
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

export default SalonInvoice
