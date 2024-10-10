import { DatePicker, Modal, Select, Table } from 'antd'
import React, { useState } from 'react'
import { FaArrowLeft, FaStar } from 'react-icons/fa6';
import { GiBackwardTime } from 'react-icons/gi';
import { GoArrowUpRight } from 'react-icons/go';
import { IoTimeOutline } from 'react-icons/io5';
import { TfiReload } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom'
const data = [
    {
        key: "1",
        name: "Tushar",
        img: "https://i.ibb.co/B2xfD8H/images.png",
        Salon: "Babaji Salon",
        FeedbackDate: "8/16/13",
        Comments: 'the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        Review: 5,
    },
    {
        key: "2",
        name: "Tushar",
        img: "https://i.ibb.co/B2xfD8H/images.png",
        Salon: "Babaji Salon",
        FeedbackDate: "8/16/13",
        Comments: 'the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        Review: 5,
    },
];
const AllFeedbacks = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "username",
            render: (_, record) => (<div className="flex justify-start items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={record?.img} alt="" />
                <p>{record?.name?.slice(0, 7)}</p>
            </div>)
        },
        {
            title: "Salon",
            dataIndex: "Salon",
            key: "Salon",
            render: (_, record) => <p>{record?.Salon}</p>
        },
        {
            title: "Feedback Date",
            dataIndex: "FeedbackDate",
            key: "FeedbackDate",
            render: (_, record) => <p>{record?.FeedbackDate}</p>
        },
        {
            title: "Comments",
            dataIndex: "Comments",
            key: "Comments",
            render: (_, record) => <p>{record?.Comments?.slice(0, 40)}...</p>
        },
        {
            title: "Review",
            dataIndex: "Review",
            key: "Review",
            render: (_, record) => (<div className="flex justify-start items-center gap-2">
                <FaStar className="text-yellow-500" />
                <p>{record?.Review}/5</p>
            </div>)
        },

        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (<GoArrowUpRight onClick={() => setOpen(true)} className="text-blue-500 text-lg cursor-pointer" />),
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
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const handleLocationChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div style={{ height: "fit-content", borderRadius: "8px", background: "white", padding: "15px 24px 0 24px" }}>
            <div className='' style={{ display: "flex", alignItems: "center", marginBottom: "30px", justifyContent: "space-between" }}>
                <div className='flex justify-start items-center gap-2'>
                    <button onClick={() => {
                        navigate(-1)
                    }} className='bg-gray-100 p-1 text-xl rounded-md'>
                        <FaArrowLeft />
                    </button>
                    <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All Feedbacks</h1>
                </div>
                <div className='flex justify-end items-center'>
                    <DatePicker className='mr-2 h-9' onChange={onChange} />
                    <Select className='mr-2 h-9'
                        defaultValue="salon"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                        ]}
                    />
                    <button className='p-2 text-lg text-white bg-[#F27405] rounded-md'>
                        <TfiReload />
                    </button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 4,
                    defaultCurrent: parseInt(page),
                    onChange: handlePageChange
                }}
            />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
                width={800}
            >
                <div className='p-6'>
                    <p className="text-[#F27405] text-lg">Feedback Deatails</p>
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
                        <p className="font-semibold">Order details</p>
                        <div className="grid grid-cols-3 mt-2">
                            <p>#11111111</p>
                            <p className="flex justify-start items-center gap-1"><GiBackwardTime className="text-lg" />10 may, 2024</p>
                            <p className="flex justify-start items-center gap-1 text-[#F27405]"><IoTimeOutline className="text-lg" />10 may, 2024-10:00 Am</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-start items-center gap-3">
                            <p className="font-medium text-base whitespace-nowrap">Rating        :</p>
                            <div className="flex justify-start items-center gap-2">
                                <FaStar className="text-yellow-500" />
                                <p>4.5/5</p>
                            </div>
                        </div>
                        <p><span className="font-medium text-base">Comment :  </span>dui. at tortor. nisi vitae Nullam adipiscing malesuada faucibus sit lacus orci Nam ac convallis. amet, elit. Donec elit massa nisl. hendrerit lorem. nec nisi</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AllFeedbacks
