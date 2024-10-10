import { Button, Modal, Table, } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FiEye, } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegTrashCan, FaStar } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
import { GoArrowUpRight } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
const data = [
  {
    key: "1",
    name: "Tushar",
    img: "https://i.ibb.co/B2xfD8H/images.png",
    Salon: "Babaji Salon",
    FeedbackDate: "8/16/13",
    Review: 5,
  },
  {
    key: "2",
    name: "Tushar",
    img: "https://i.ibb.co/B2xfD8H/images.png",
    Salon: "Babaji Salon",
    FeedbackDate: "8/16/13",
    Review: 5,
  },
];

const TotalSellerListTable = () => {
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [open, setOpen] = useState();
  const dropdownRef = useRef();
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
      title: "Name",
      dataIndex: "name",
      key: "username",
      render: (_, record) => (<div className="flex justify-start items-center gap-2">
        <img className="w-10 h-10 rounded-full" src={record?.img} alt="" />
        <p>{record?.name?.slice(0, 7)}..</p>
      </div>)
    },
    {
      title: "Salon",
      dataIndex: "Salon",
      key: "Salon",
      render: (_, record) => <p>{record?.Salon?.slice(0, 8)}..</p>
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen("");
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ height: "fit-content", borderRadius: "8px", background: "white", padding: "15px 24px 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Total Review List</h1>
        <Link to="/all-feedback">
          <p style={{ color: "#F27405", fontSize: "12px", textDecoration: "underline" }}>VIEW ALL</p>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
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

};
export default TotalSellerListTable;
