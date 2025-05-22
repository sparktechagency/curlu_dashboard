import React, { useMemo, useState } from 'react';
import { DatePicker, Modal, Select, Table } from 'antd';
import { FaArrowLeft, FaBatteryEmpty, FaStar } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGetAllFeedbackQuery,
  useGetSalonListQuery,
} from '../../Redux/Apis/feedbackApis';
import { generateImage } from '../../Redux/baseApi';
const AllFeedbacks = ({ head = true }) => {
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get('page') || 1
  );
  const [filters, setFilters] = useState({
    page: 1,
    salon_id: '',
    date: '',
  });
  const {
    data: feedbackData,
    isLoading: feedbackLoading,
    refetch,
  } = useGetAllFeedbackQuery({
    date: filters.date,
    salon_id: filters.salon_id,
    page: page,
  });
  const { data: salonOptions, isLoading: salonOptionsLoading } =
    useGetSalonListQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const feedbackTableSourceData =
    feedbackData?.data?.data.map((item, index) => ({
      key: index + 1,
      name: item?.user?.name,
      img: generateImage(item?.user?.image),
      Salon:
        item?.salon?.user?.name + ' ' + item?.salon?.user?.last_name || 'N/A',
      FeedbackDate: new Date(item?.created_at).toLocaleDateString(),
      Comments: item?.comment,
      Review: item?.rating,
      fullItem: item,
    })) || [];

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'username',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={record?.img}
            alt=""
          />
          <p>{record?.name?.slice(0, 7)}</p>
        </div>
      ),
    },
    {
      title: 'Salon',
      dataIndex: 'Salon',
      key: 'Salon',
      render: (_, record) => <p>{record?.Salon}</p>,
    },
    {
      title: 'Feedback Date',
      dataIndex: 'FeedbackDate',
      key: 'FeedbackDate',
      render: (_, record) => <p>{record?.FeedbackDate}</p>,
    },
    {
      title: 'Comments',
      dataIndex: 'Comments',
      key: 'Comments',
      render: (_, record) => <p>{record?.Comments?.slice(0, 40)}...</p>,
    },
    {
      title: 'Review',
      dataIndex: 'Review',
      key: 'Review',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <FaStar className="text-yellow-500" />
          <p>{record?.Review}/5</p>
        </div>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'printView',
      key: 'printView',
      render: (_, record) => (
        <GoArrowUpRight
          onClick={() => {
            setSelectedFeedback(record?.fullItem);
            setOpen(true);
          }}
          className="text-blue-500 text-lg cursor-pointer"
        />
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    window.history.pushState(null, '', `?${params.toString()}`);
  };
  const handleChange = (value) => {
    setFilters({ salon_id: value });
  };
  const onChange = (date, dateString) => {
    setFilters({ date: dateString });
  };

  const salonOption = salonOptions?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  return (
    <div
      style={{
        height: 'fit-content',
        borderRadius: '8px',
        background: 'white',
        padding: '15px 24px 0 24px',
      }}
    >
      <div
        className=""
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          justifyContent: 'space-between',
        }}
      >
        {head ? (
          <>
            <div className="flex justify-start items-center gap-2">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="bg-gray-100 p-1 text-xl rounded-md"
              >
                <FaArrowLeft />
              </button>
              <h1
                style={{ fontSize: '20px', fontWeight: 600, color: '#2F2F2F' }}
              >
                All Feedbacks
              </h1>
            </div>
            <div className="flex justify-end items-center">
              <DatePicker className="mr-2 h-9" onChange={onChange} />
              <Select
                className="mr-2 h-9"
                placeholder="please select salon"
                style={{ width: 150 }}
                onChange={handleChange}
                options={salonOption}
                loading={salonOptionsLoading}
              />
              <button
                onClick={() => {
                  setFilters({
                    page: 1,
                    salon_id: '',
                    date: '',
                  });
                  refetch();
                }}
                className="p-2 text-lg text-white bg-[#F27405] rounded-md"
              >
                <TfiReload />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-between rounded-md bg-white">
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#2F2F2F' }}>
              Recent Feedbacks
            </h1>
            <Link to={'/all-feedback'}>
              <button className="cursor-pointer text-[#4289FF] underline">
                View all
              </button>
            </Link>
          </div>
        )}
      </div>
      <Table
        scroll={{ x: 1500 }}
        columns={columns}
        loading={feedbackLoading}
        dataSource={feedbackTableSourceData}
        locale={{
          emptyText: (
            <div className="h-48 flex items-center justify-center">
              <h1 className="text-red-400">
                'No Feedback available for this salon'
              </h1>
            </div>
          ),
        }}
        pagination={{
          pageSize: 10,
          defaultCurrent: parseInt(page),
          onChange: handlePageChange,
        }}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={800}
      >
        {selectedFeedback ? (
          <div className="p-6">
            <p className="text-[#F27405] text-lg">Feedback Details</p>
            <div className="grid grid-cols-2 mt-6 border-b pb-4">
              <div className="w-full">
                <p className="font-semibold">User</p>
                <div className="flex justify-start items-start gap-2 mt-4">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={generateImage(selectedFeedback?.user?.image)}
                    alt={selectedFeedback?.user?.name || 'User'}
                  />
                  <div>
                    <p className="text-base text-[#F27405] font-semibold">
                      {selectedFeedback?.user?.name}{' '}
                      {selectedFeedback?.user?.last_name}
                    </p>
                    <p className="my-1">{selectedFeedback?.user?.email}</p>
                    <p className="my-1">{selectedFeedback?.user?.address}</p>
                    <p>{selectedFeedback?.user?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <p className="font-semibold">Salon</p>
                <div className="flex justify-start items-start gap-2 mt-4">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={generateImage(selectedFeedback?.salon?.user?.image)}
                    alt={selectedFeedback?.salon?.user?.name || 'Salon'}
                  />
                  <div>
                    <p className="text-base text-[#734D2C] font-semibold">
                      {selectedFeedback?.salon?.user?.name}{' '}
                      {selectedFeedback?.salon?.user?.last_name}
                    </p>
                    <p className="my-1">
                      {selectedFeedback?.salon?.user?.email}
                    </p>
                    <p className="my-1">
                      {selectedFeedback?.salon?.user?.address}
                    </p>
                    <p>{selectedFeedback?.salon?.user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-start items-center gap-3">
                <p className="font-medium text-base whitespace-nowrap">
                  Rating :
                </p>
                <div className="flex justify-start items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <p>{selectedFeedback?.rating}/5</p>
                </div>
              </div>
              <p>
                <span className="font-medium text-base">Comment : </span>
                {selectedFeedback?.comment}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default AllFeedbacks;
