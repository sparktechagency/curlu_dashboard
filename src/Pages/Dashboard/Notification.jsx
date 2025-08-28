import { Modal } from 'antd';
import React, { useState } from 'react'
import { useNotificationsDataQuery, useMarkReadNotificationMutation, useMarkAllNotificationMutation } from '../../Redux/Apis/notificationApis';
import toast from 'react-hot-toast';

const Notification = () => {
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const { data } = useNotificationsDataQuery()
  const [markReadNotification] = useMarkReadNotificationMutation()
  const [markAllNotification] = useMarkAllNotificationMutation()
  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    window.history.pushState(null, "", `?${params.toString()}`);
  }
  const [openAddModel, setOpenAddModel] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({})

  const handleReadAll = async () => {
    await markAllNotification().unwrap().then((res) => {
      toast.success(res?.message)
    })
  }

  const handleRead = async (id) => {
    await markReadNotification(id).unwrap().then((res) => {
      toast.success(res?.message)
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-[#242424] text-2xl font-bold">Notifications</h3>
        <button onClick={handleReadAll} className="text-[#F27405] font-semibold border-2 border-[#F27405] px-6 py-2">
          Read all
        </button>
      </div>
      <div className="flex justify-start items-start flex-col gap-2 py-8 px-3">
        {data?.notification?.map((item) => (
          <div
            className={`flex justify-between items-center w-full ${item?.read_at ? "bg-[#FBFBFB]" : " bg-[#F8F1E6]"
              } p-3 py-5 rounded-lg`}
            key={item?.id}
          >
            <div>
              <div className="flex justify-start items-center gap-8 mb-1 text-[#919191]">
                <h3 className="text-[#555555] font-bold">{item?.message}</h3>
                <p>{item?.created_at?.split('T')?.[0]}</p>
              </div>
              {/* <div className="flex justify-start items-center gap-2 text-[#919191]">
                <h3>{item?.item}</h3>
                <p>{item?.price}</p>
              </div> */}
            </div>
            <button
              onClick={() => {
                setOpenAddModel(true);
                setCurrentNotification(item)
              }}
              className="text-[#F27405] font-medium text-lg"
            >

              View
            </button>
          </div>
        ))}
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={600}
        footer={false}
      >
        <div className="p-5 relative">
          <div>
            <div className="flex justify-start flex-col items-start gap-8 text-[#919191]">
              <h3 className="text-[#555555] font-bold">{currentNotification?.data?.name}</h3>
              <span>Date: {currentNotification?.data?.created_at?.split('T')?.[0]}</span>
            </div>
            <div className="flex justify-start flex-col items-start gap-2 text-[#919191] mt-3">
              <h3>Address: {currentNotification?.data?.address}</h3>
              <p>Message: {currentNotification?.data?.message}</p>
            </div>
            <button
              onClick={() => handleRead(currentNotification?.id)}
              className="text-[#F27405] font-medium text-lg mt-5"
            >
              Mark as read
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notification