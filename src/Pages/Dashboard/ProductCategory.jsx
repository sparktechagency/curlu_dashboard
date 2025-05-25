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
} from 'antd';
import {
  FaPlus,
  FaRegFilePdf,
  FaRegTrashCan,
  FaStar,
  FaUserCheck,
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CreateSalonCategoryFrom from '../../Components/Form/CreateSalonCategoryFrom';
import CreateProductCategoryForm from '../../Components/Form/CreateProductCategoryForm';
import {
  useDeleteShopCategoryMutation,
  useGetShopCategoriesQuery,
} from '../../Redux/Apis/shopCategory';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { imageUrl } from '../../Redux/baseApi';

const ProductCategory = () => {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search).get('date') ||
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
  );
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get('page') || 1
  );
  const [open, setOpen] = useState(false);
  const [deleteShopCategory] = useDeleteShopCategoryMutation();
  const [openAddSalon, setOpenAddSalon] = useState(false);
  const [formFor, setFormFor] = useState('add');
  const [selectedData, setSelectedData] = useState({});
  const {
    data: shopCategory,
    isFetching,
    isLoading,
  } = useGetShopCategoriesQuery({ page });
  const data = shopCategory?.data?.map((item, i) => {
    return {
      key: i + 1 + (shopCategory?.current_page - 1) * shopCategory?.per_page,
      category_name: item?.category_name,
      category_image: item?.category_image
        ? `${imageUrl}${item?.category_image}`
        : 'https://placehold.co/600x400/000000/FFFFFF.png',
      id: item?.id,
    };
  });
  const handleDelete = () => {
    deleteShopCategory(selectedData?.id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Product category name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Product category Image',
      dataIndex: 'category_image',
      key: 'category_image',
      render: (_, record) => (
        <Image
          src={record?.category_image}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          alt=""
        />
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'printView',
      key: 'printView',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <FaEdit
            onClick={() => {
              setOpenAddSalon(true);
              setFormFor('update');
              setSelectedData(record);
            }}
            className="text-[#F25C05] text-2xl cursor-pointer"
          />
          <MdDelete
            onClick={() => {
              setOpen(true);
              setSelectedData(record);
            }}
            className="text-[#F25C05] text-2xl cursor-pointer"
          />
        </div>
      ),
    },
  ];
  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    window.history.pushState(null, '', `?${params.toString()}`);
  };
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
          E-Shop Categories
        </h1>
        <div className="flex justify-end items-center gap-3">
          <CSVLink data={data || []}>
            <button className="text-2xl">
              <BsFileEarmarkExcelFill />
            </button>
          </CSVLink>
          <button
            onClick={() => {
              setOpenAddSalon(true);
              setFormFor('add');
              setSelectedData({});
            }}
            className="flex justify-start items-center gap-2 text-white p-2 rounded-md bg-[#F27405]"
          >
            <FaPlus />
            Add Category
          </button>
        </div>
      </div>
      <div>
        <Table
          scroll={{ x: 1500 }}
          loading={isFetching || isLoading}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: shopCategory?.per_page || 12,
            defaultCurrent: parseInt(page),
            total: shopCategory?.total || 0,
            onChange: handlePageChange,
          }}
        />
      </div>
      <Modal
        open={openAddSalon}
        onCancel={() => setOpenAddSalon(false)}
        centered
        footer={false}
        width={500}
      >
        <div className="bg-white p-6 rounded-md">
          <p className="text-[#F27405] text-lg font-medium">
            {' '}
            {formFor === 'add' ? 'Add' : 'Update'} E-Shop Category
          </p>
          <CreateProductCategoryForm
            formFor={formFor}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            closeModal={() => setOpenAddSalon(false)}
          />
        </div>
      </Modal>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#F27405] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={() => handleDelete()}
            className="bg-[#F27405] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCategory;
