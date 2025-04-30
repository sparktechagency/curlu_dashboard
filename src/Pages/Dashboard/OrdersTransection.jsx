import React, { useState } from 'react';
import { Image, Input, Modal, Select, Table } from 'antd';
import { FaCircle } from 'react-icons/fa6';
import { TfiReload } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useGetTransitionQuery } from '../../Redux/Apis/transitionApis';
import { generateImage, imageUrl } from '../../Redux/baseApi';

const OrdersTransection = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
  });
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data, isLoading, error, refetch } = useGetTransitionQuery(filters);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const columns = [
    {
      title: 'S.No',
      key: 'id',
      render: (_, __, index) => filters.page * 10 - 10 + index + 1,
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <Image
            className="!w-10 !h-10 !object-cover !rounded-full"
            src={
              generateImage(record?.user?.image) || 'https://placehold.co/400'
            }
            alt={record?.user?.name || 'Unknown'}
          />
          <p>{record?.user?.name || 'Unknown'}</p>
        </div>
      ),
    },
    {
      title: 'Salon',
      key: 'salon_name',
      render: (_, record) => record?.salon?.name || 'Unknown',
    },
    {
      title: 'Service Orders',
      key: 'service',
      render: (_, record) => record?.service?.name || 'N/A',
    },
    {
      title: 'Order Confirmation Date',
      key: 'confirmation_date',
      render: (_, record) => (
        <p className="text-[#D93D04]">
          {new Date(record?.confirmation_date).toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Price',
      key: 'price',
      render: (_, record) => <p>{record?.service?.price} €</p>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <div
          className={`${
            record?.status !== 'pending' ? 'text-[#00B047]' : 'text-[#F27405]'
          } flex justify-start items-center gap-2 capitalize`}
        >
          <FaCircle />
          <p>{record?.status}</p>
        </div>
      ),
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => (
        <button
          className="text-blue-500 text-2xl"
          onClick={() => {
            setSelectedRecord(record);
            setOpen(true);
          }}
        >
          Details
        </button>
      ),
    },
  ];
  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
      }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#2F2F2F',
          }}
        >
          Salon Services
        </h1>
        <div className="flex justify-end items-center gap-3">
          <Input
            value={filters?.search}
            placeholder="Search..."
            prefix={<FiSearch size={14} color="#868FA0" />}
            suffix={
              <IoClose
                onClick={() => handleSearch('')}
                size={14}
                color="#2B2A2A"
              />
            }
            style={{
              width: '300px',
              height: '39px',
              fontSize: '14px',
            }}
            size="middle"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            className="min-w-44 h-[40px]"
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Status"
            options={[
              { value: 'pending', label: 'pending' },
              { value: 'completed', label: 'completed' },
            ]}
          />
          <button
            className="p-2 text-lg text-white bg-[#F27405] rounded-md"
            onClick={refetch}
          >
            <TfiReload />
          </button>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data?.data?.data || []}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            current: filters.page,
            total: data?.length || 0,
            onChange: handlePageChange,
          }}
          rowKey={(record) => record.id}
        />
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={800}
      >
        {selectedRecord && (
          <div className="p-6">
            <h2 className="text-[#F27405] text-lg mb-4">Transaction Details</h2>
            <p>
              <strong>User:</strong> {selectedRecord.user?.name || 'Unknown'}
            </p>
            <p>
              <strong>Salon:</strong> {selectedRecord.salon?.name || 'Unknown'}
            </p>
            <p>
              <strong>Service:</strong> {selectedRecord.service?.name || 'N/A'}
            </p>
            <p>
              <strong>Order Confirmation Date:</strong>{' '}
              {new Date(
                selectedRecord?.order_confirmation_date
              ).toLocaleString()}
            </p>
            <p>
              <strong>Payment:</strong> {selectedRecord?.service?.price} €
            </p>
            <p>
              <strong>Status:</strong> {selectedRecord?.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersTransection;
