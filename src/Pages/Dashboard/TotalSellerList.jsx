import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Dropdown, Input, Modal, Select, Slider, Table } from 'antd';
import { FaFileExcel, FaRegFilePdf, FaRegTrashCan, FaUserCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { useBlockUnblockMutation, useGetUserQuery } from '../../Redux/Apis/userApi';
import { imageUrl } from '../../Redux/baseApi';
import { FaSearch } from 'react-icons/fa';
import { CSVDownload, CSVLink } from 'react-csv';
import toast from 'react-hot-toast';
import { TbUserX } from 'react-icons/tb';


const TotalSellerList = () => {
  const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [selectedData, setSelectedData] = useState({})
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const { data: users, refetch, isLoading, isFetching } = useGetUserQuery({ page, location: search })
  const [blockUnblock] = useBlockUnblockMutation()
  const data = users?.data?.map((user, index) => {
    const { name, last_name, email, created_at, address, phone, image, ...rest } = user;
    return {
      key: index + 1 + ((users?.current_page - 1) * users?.per_page),
      name: `${name} ${last_name}`,
      email: email,
      date: new Date(created_at).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),  // Format creation date
      location: address || "Unknown",
      contact: phone || "No contact",
      img: image ? `${imageUrl}${image}` : "https://i.ibb.co/B2xfD8H/images.png",
      rest
    };
  });
  const csvData = users?.data?.map((user, index) => {
    const { name, last_name, email, created_at, address, phone, image, } = user;
    return {
      key: index + 1 + ((users?.current_page - 1) * users?.per_page),
      name: `${name} ${last_name}`,
      email: email,
      date: new Date(created_at).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),  // Format creation date
      location: address || "Unknown",
      contact: phone || "No contact",
      img: image ? `${imageUrl}${image}` : "https://i.ibb.co/B2xfD8H/images.png",
    };
  });

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
  console.log(data)
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
          <GoArrowUpRight onClick={() => { setOpen(true); setSelectedData(record) }} className="text-blue-500 text-2xl cursor-pointer" />
          <button onClick={() => {
            blockUnblock(record?.rest?.id).unwrap()
              .then(res => {
                toast.success(res.message)
              }).catch(err => {
                toast.error(err?.data?.message)
              })
          }} className={`${record?.rest?.user_status == 'inactive'?'text-green-500':'text-red-500'}  text-2xl cursor-pointer`}>
            {
              record?.rest?.user_status == 'inactive' ? <FaUserCheck /> : <TbUserX />
            }

          </button>
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
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All user details</h1>
        <div className='flex justify-end items-center gap-3'>
          <CSVLink data={csvData || []}>
            <button className='text-2xl'>
              <FaFileExcel />
            </button>
          </CSVLink>
          <Input onChange={(e) => setSearch(e.target.value)} suffix={<FaSearch className='text-gray-400' />} placeholder='search by location' />
          {/* <button onClick={() => refetch()} className='p-2 text-lg text-white bg-[#F27405] rounded-md'>
            <TfiReload />
          </button> */}
        </div>
      </div>
      <div>
        <Table
          isLoading={isLoading || isFetching}
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
            <img className='w-20 h-20 rounded-full' src={selectedData?.img || "https://i.ibb.co/B2xfD8H/images.png"} alt={selectedData?.name || "User Image"} />
            <p className='text-base font-semibold'>{selectedData?.name || "Md. Mahmud"}</p>
          </div>
          <div className='flex flex-col justify-start items-start gap-3'>
            <div>
              <p className='text-sm font-semibold mb-1'>Name</p>
              <p className=' text-xs'>{selectedData?.name || "Mr. Mahmud"}</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Email</p>
              <p className=' text-xs'>{selectedData?.email || "mahmud@gmail.com"}</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Address</p>
              <p className=' text-xs'>{selectedData?.location || "76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris"}</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Contact No</p>
              <p className=' text-xs'>{selectedData?.contact || "+099999"}</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Date of birth</p>
              <p className=' text-xs'>{selectedData?.date_of_birth ? new Date(selectedData.date_of_birth).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "17 Dec, 2024"}</p>
            </div>
            <div>
              <p className='text-sm font-semibold mb-1'>Gender</p>
              <p className=' text-xs'>{selectedData?.gender || "Male"}</p>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default TotalSellerList