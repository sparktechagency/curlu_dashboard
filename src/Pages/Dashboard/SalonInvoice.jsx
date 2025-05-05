import React, { useState } from 'react';
import { Input, Table, DatePicker } from 'antd';
import { TfiReload } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useGetSalonInvoiceQuery } from '../../Redux/Apis/transitionApis';
import { generateImage } from '../../Redux/baseApi';

const SalonInvoice = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    search: '',
  });

  const { data, isLoading, refetch } = useGetSalonInvoiceQuery({
    search: filters.search,
  });

  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Salon',
      dataIndex: 'salon',
      key: 'salon',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src={
              generateImage(record.salon?.image) || 'https://placehold.co/400'
            }
            alt={record.salon?.name}
          />
          <p>{record.salon?.name || 'Unknown'}</p>
        </div>
      ),
    },
    {
      title: 'Order No',
      dataIndex: 'payment_detail',
      key: 'orderNo',
      render: (_, record) => record.invoice_number || 'N/A',
    },
    {
      title: 'Service Orders',
      dataIndex: 'service',
      key: 'service',
      render: (_, record) => record.service?.service_name || 'N/A',
    },
    {
      title: 'Order Confirmation Date',
      dataIndex: 'order_confirmation_date',
      key: 'order_confirmation_date',
      render: (_, record) => (
        <div>
          <p className="text-[#D93D04]">
            {new Date(record.confirmation_date).toLocaleString()}
          </p>
        </div>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (_, record) => (
        <div>
          <p className="text-black">{`${record.payment}€`}</p>
        </div>
      ),
    },
    {
      title: 'Curlu Earning',
      dataIndex: 'curlu_earning',
      key: 'curlu_earning',
      render: (_, record) => (
        <div>
          <p className="text-[#F27405]">{`${record.curlu_earning}€`}</p>
        </div>
      ),
    },
    {
      title: 'Salon Earning',
      dataIndex: 'salon_earning',
      key: 'salon_earning',
      render: (_, record) => (
        <div>
          <p className="text-[#00B047]">{`${record.salon_earning}€`}</p>
        </div>
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
          Salon Invoice
        </h1>
        <div className="flex justify-end items-center gap-3">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <DatePicker
              className="min-w-44 h-[40px]"
              placeholder="Search by date"
              onChange={onChange}
            />
            <Input
              className="min-w-44 !h-[40px]"
              value={filters.search}
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
                width: '100%',
                height: '100%',
                fontSize: '14px',
              }}
              size="middle"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
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
            current: page,
            total: data?.length || 0,
            onChange: handlePageChange,
          }}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default SalonInvoice;
