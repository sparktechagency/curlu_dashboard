import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Input, Modal, Select, Slider, Table } from 'antd';
import { FaRegFilePdf, FaRegTrashCan, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';

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

const TotalSellerList = () => {
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
      title: "Date",
      dataIndex: "date",
      key: "date",
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
  const onSelect = (newValue) => {
    const date = newValue.format('MMM-DD-YYYY')
    setValue(date);
    const params = new URLSearchParams(window.location.search);
    params.set('date', date);
    window.history.pushState(null, "", `?${params.toString()}`);
  };
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
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Total Seller List</h1>
        <div className='flex justify-end items-center gap-3'>
          <button className='text-2xl'>
            <FaRegFilePdf />
          </button>
          <Select className='min-w-44'
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
        width={500}
      >
        <div className='p-6'>
          <div className='flex justify-center items-center flex-col py-5 gap-4'>
            <img className='w-20 h-20 rounded-full' src="https://i.ibb.co/B2xfD8H/images.png" alt="" />
            <p className='text-base font-semibold'>Md. Mahmud</p>
          </div>
          <div className='flex flex-col justify-start items-start gap-3'>
            <div>
              <p className='text-sm font-semibold mb-1'>Name</p>
              <p className=' text-xs'>Mr. Mahmud</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Email</p>
              <p className=' text-xs'>mahmud@gmail.com</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Address</p>
              <p className=' text-xs'>76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Contact No</p>
              <p className=' text-xs'>+099999</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Date of birth</p>
              <p className=' text-xs'>+17 dec, 2024</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Gender</p>
              <p className=' text-xs'>Male</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TotalSellerList