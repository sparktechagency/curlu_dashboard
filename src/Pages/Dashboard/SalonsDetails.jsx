import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  Dropdown,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Table,
  Button,
  Checkbox,
  Image,
  Popconfirm,
} from 'antd';
import {
  FaFileExcel,
  FaPlus,
  FaRegFilePdf,
  FaRegTrashCan,
  FaStar,
  FaUserCheck,
} from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import {
  useBlockUnblockMutation,
  useGetSalonQuery,
} from '../../Redux/Apis/salonApis';
import { generateImage, imageUrl } from '../../Redux/baseApi';
import { CSVLink } from 'react-csv';
import { TbUserX } from 'react-icons/tb';
import toast from 'react-hot-toast';

const SalonsDetails = () => {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search).get('date') ||
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  );
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
    date: '',
  });

  const [searchBy, setSearchBy] = useState('');
  const [open, setOpen] = useState(false);
  const [openAddSalon, setOpenAddSalon] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [location, setLocation] = useState('');
  const {
    data: salons,
    refetch,
    isLoading,
    isFetching,
  } = useGetSalonQuery({ page: filters.page, location });
  const [blockUnblock] = useBlockUnblockMutation();
  const data = salons?.data?.map((salon, index) => {
    const {
      user,
      created_at,
      id,
      experience,
      salon_type,
      salon_description,
      id_card,
      iban_number,
      kbis,
      cover_image,
      ...rest
    } = salon;
    const { name, last_name, email, address, phone, image, ...userRest } = user;
    return {
      key: index + 1,
      name: `${name} ${last_name}`,
      email: email,
      date: new Date(created_at).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }), // Format creation date
      location: address || 'Unknown',
      contact: phone || 'No contact',
      img: image
        ? `${imageUrl}${image}`
        : 'https://i.ibb.co/B2xfD8H/images.png',
      cover_image: cover_image
        ? `${imageUrl}${cover_image}`
        : 'https://i.ibb.co/CBvrNxh/Rectangle-5252.png',
      rest: {
        id,
        experience,
        salon_type,
        salon_description,
        id_card,
        iban_number,
        kbis,
        ...userRest,
        ...rest,
      },
    };
  });
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Salon',
      dataIndex: 'name',
      key: 'username',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <Image
            className="!w-10 !h-10 !rounded-full !object-cover"
            src={record?.img}
            alt=""
          />
          <p>{record?.name}</p>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'ACTION',
      dataIndex: 'printView',
      key: 'printView',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <GoArrowUpRight
            onClick={() => {
              setOpen(true);
              setSelectedData(record);
            }}
            className="text-blue-500 text-2xl cursor-pointer"
          />
          <Popconfirm
            placement="topRight"
            title={`Are you sure you want to ${record?.rest?.is_blocked === 1 ? "unblock" : "block"} this user?`}
            description={''}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              blockUnblock(record?.rest?.id)
                .unwrap()
                .then((res) => {
                  refetch();
                  toast.success(res.message);
                })
                .catch((err) => {
                  toast.error(err?.data?.message);
                });
            }}
          >
            <button
              className={`${record?.rest?.is_blocked === 1
                ? 'text-red-500'
                : 'text-green-500'
                }  text-2xl cursor-pointer`}
            >
              {record?.rest?.is_blocked === 1 ? (
                <FaUserCheck />
              ) : (
                <TbUserX />
              )}
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  const handleChange = (value) => { };
  const csvData = salons?.data?.map((salon, index) => {
    const {
      user,
      created_at,
      id,
      experience,
      salon_type,
      salon_description,
      id_card,
      iban_number,
      kbis,
      cover_image,
      ...rest
    } = salon;
    const { name, last_name, email, address, phone, image, ...userRest } = user;
    return {
      key: index + 1,
      name: `${name} ${last_name}`,
      email: email,
      date: new Date(created_at).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }), // Format creation date
      location: address || 'Unknown',
      contact: phone || 'No contact',
      img: image
        ? `${imageUrl}${image}`
        : 'https://i.ibb.co/B2xfD8H/images.png',
      cover_image: cover_image
        ? `${imageUrl}${cover_image}`
        : 'https://i.ibb.co/CBvrNxh/Rectangle-5252.png',
    };
  });
  const isPdf = selectedData?.rest?.kbis?.toLowerCase().endsWith('.pdf');

  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
      }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#2F2F2F' }}>
          All salon list
        </h1>
        <div className="flex justify-end items-center gap-3">
          <CSVLink data={csvData || []}>
            <button className="text-2xl">
              <FaFileExcel />
            </button>
          </CSVLink>
          <Select
            placeholder="search by"
            onChange={(value) => setSearchBy(searchBy)}
            className="min-w-44 h-[40px]"
            options={[
              { label: 'name', value: 'name' },
              { label: 'email', value: 'email' },
              { label: 'location', value: 'location' },
            ]}
          />
          <Input
            className="h-[40px]"
            onChange={(e) => setLocation(e.target.value)}
            showSearch
            placeholder="location"
          />
          <button
            onClick={() => setOpenAddSalon(true)}
            className="flex justify-start items-center gap-2 text-white p-2 rounded-md bg-[#734D2C] whitespace-nowrap"
          >
            <FaPlus />
            Add Salon
          </button>
          <button
            onClick={refetch}
            className="p-2 text-lg text-white bg-[#F27405] rounded-md"
          >
            <TfiReload />
          </button>
        </div>
      </div>
      <div>
        <Table
          scroll={{ x: 1500 }}
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            current: filters.page,
            total: data?.length || 0,
            onChange: handlePageChange,
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
          <div className="flex justify-center items-center flex-col gap-4">
            <img
              className="w-full h-[150px]"
              src={
                selectedData?.rest?.cover_image ||
                'https://i.ibb.co/CBvrNxh/Rectangle-5252.png'
              }
              alt="Cover"
            />
            <div className="flex justify-center items-center flex-col gap-2 -mt-16">
              <div className="w-20 h-20 rounded-full relative">
                <img
                  className="w-full h-full rounded-full"
                  src={
                    selectedData?.img || 'https://i.ibb.co/B2xfD8H/images.png'
                  }
                  alt="Profile"
                />
                <button className="text-xl text-blue-500 absolute right-0 bottom-0">
                  <RiVerifiedBadgeFill />
                </button>
              </div>
              <p className="text-base font-semibold">
                {selectedData?.name || 'User Name'}
              </p>
              <div className="flex justify-start items-center gap-2">
                <FaStar className="text-yellow-500" />
                <p>4.5/5</p>{' '}
                {/* You may update this with real ratings if available */}
              </div>
              <p>
                Total earning: {selectedData?.rest?.total_earning || '2000€'}
              </p>{' '}
              {/* Assuming `total_earning` is a field */}
            </div>
          </div>
          <div className="grid grid-cols-2 justify-start items-start gap-3 p-6">
            <div>
              <p className="text-sm font-semibold mb-1">Salon Name</p>
              <p className="text-xs">{selectedData?.name || 'Mr. Mahmud'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <p className="text-xs">
                {selectedData?.email || 'mahmud@gmail.com'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className="text-xs">
                {selectedData?.location ||
                  '76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Contact No</p>
              <p className="text-xs">{selectedData?.contact || '+099999'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Experience</p>
              <p className="text-xs">
                {selectedData?.rest?.experience || '5 years'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Salon Type</p>
              <p className="text-xs">
                {selectedData?.rest?.salon_type || 'All'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Bank Account No.</p>
              <p className="text-xs">
                {selectedData?.rest?.iban_number || '321656295461'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">About</p>
              <p className="text-xs">
                {selectedData?.rest?.salon_description ||
                  'No description available'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Id Card</p>
              {/* <div className="pr-12 w-full h-[150px]">
                <img
                  className="w-full h-full object-contain"
                  src={generateImage(selectedData?.rest?.id_card)}
                  alt="Id Card"
                />
                <a
                  href={generateImage(selectedData?.rest?.id_card)}
                  download={true}
                >
                  <Button type="primary">Download ID Card</Button>
                </a>
              </div> */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={generateImage(selectedData?.rest?.id_card)}
                  alt="ID Card"
                  style={{ maxWidth: '100%', height: '150px' }}
                />

                <a
                  href={generateImage(selectedData?.rest?.id_card)}
                  download
                  target="_blank"
                  className="underline text-blue-500"
                >
                  Download ID card
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Kbis</p>
              {/* <div className="pr-12 w-full h-[150px]">
                <h1>
                  {typeof(selectedData?.rest?.kbis) === 'number'
                    ? selectedData?.rest?.kbis
                    : ''}
                </h1>
                <img
                  className="w-full h-full object-contain"
                  src={`${imageUrl}${selectedData?.rest?.kbis}`}
                  alt="Kbis"
                />
              </div> */}
              <div className="pr-12 w-full h-[150px] max-h-[150px]">
                {isPdf ? (
                  <>
                    <iframe
                      src={generateImage(selectedData?.rest?.kbis)}
                      title="Kbis PDF"
                      className="w-full h-full"
                      style={{ border: 'none' }}
                    />
                    <a
                      href={generateImage(selectedData?.rest?.kbis)}
                      download
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      Download KBIS
                    </a>
                  </>
                ) : (
                  // your non-PDF display here
                  <div>
                    <h1>{selectedData?.rest?.kbis}</h1>
                    {/* optionally an image */}
                  </div>
                )}
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
        <div className="bg-white p-6 rounded-md">
          <p className="text-[#F27405] text-lg font-medium">Add Salon</p>
          <CreateSalonForm closeModal={() => setOpenAddSalon(false)} />
        </div>
      </Modal>
    </div>
  );
};
export default SalonsDetails;
