import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { GoSearch } from 'react-icons/go';
import { Input, Spin } from 'antd';
import { FaLocationArrow } from 'react-icons/fa6';
import {
  useGetChatListQuery,
  useGetMessageQuery,
  useSendMessageMutation,
} from '../../Redux/Apis/chatApis';
import { generateImage } from '../../Redux/baseApi';
import { useSocket } from '../../Context/Context';
const Chat = () => {
  const [tab, setTab] = useState('USER'); //PROFESSIONAL
  const [message, setMessage] = useState('');
  const scrollRef = useRef();
  const [keyword, setKeyword] = useState('');
  const { data } = useGetChatListQuery({ search: keyword, role_type: tab });
  const [partnerId, setPartnerId] = useState(
    data?.chat_list?.[0]?.receiver?.id
  );
  const { data: chat, isLoading } = useGetMessageQuery({
    receiver_id: partnerId || data?.chat_list?.[0]?.receiver?.id,
  });
  console.log(chat)
  const [send] = useSendMessageMutation();

  const { socket } = useSocket();

  const [allChats, setAllChats] = useState(chat || []);
  useEffect(() => {
    if (data) {
      setPartnerId(data?.chat_list?.[0]?.receiver?.id);
    }
  }, [data]);
  useEffect(() => {
    if (chat) {
      setAllChats(chat);
    }
  }, [chat]);

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  const handlePartner = (patient) => {
    setPartnerId(patient?.receiver?.id);
  };

  useEffect(() => {
    const handleNewMessage = (data) => {
      setAllChats([...allChats, data]);
    };
    if (socket) {
      socket?.on('private-message', handleNewMessage);
    }
    return () => {
      socket?.off('private-message', handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">
      {/* helmet */}
      <h1
        className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}
      >
        Patient Message
      </h1>

      {/* message read and unread section */}

      {/* message container */}

      <div className="grid grid-cols-12 gap-6 mt-4 h-[76vh] ">
        <div
          className="col-span-3 w-full bg-[#FCFCFC]  rounded-lg p-4 overflow-y-scroll scroll-bar"
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          }}
        >
          <div className="flex justify-start items-center gap-3 mb-3">
            <button
              onClick={() => setTab('USER')}
              className={`${tab == 'USER' ? 'text-orange-500 underline' : ''}`}
            >
              user
            </button>
            <button
              onClick={() => setTab('PROFESSIONAL')}
              className={`${
                tab == 'PROFESSIONAL' ? 'text-orange-500 underline' : ''
              }`}
            >
              professional
            </button>
          </div>
          <div>
            <Input
              onChange={(e) => setKeyword(e.target.value)}
              prefix={<GoSearch color="#B6C0C8" size={16} />}
              placeholder="Enter Search..."
              style={{
                width: '100%',
                height: 40,
                border: '1px solid #E7EBED',
                outline: 'none',
                borderRadius: 8,
              }}
              className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
            />

            <div className="mt-[14px] grid grid-cols-1 gap-1">
              {data?.chat_list?.map((patient, index) => {
                return (
                  <div
                    onClick={() => handlePartner(patient)}
                    key={index}
                    className={`flex cursor-pointer items-center gap-[10px] ${
                      patient?.receiver?.id === partnerId
                        ? 'bg-[#E7EBED]'
                        : 'bg-[#FDFDFD]'
                    }  rounded-lg p-2`}
                  >
                    <img
                      src={generateImage(patient?.receiver?.image)}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '100%',
                        border: '2px solid #92A2AE',
                      }}
                      alt=""
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between pb-[6px]">
                        <h1 className="text-[#12354E] poppins-medium  text-sm leading-5">
                          {patient?.receiver?.name}
                          {patient?.receiver?.last_name}
                        </h1>
                        <p className="text-[#8B8B8B] poppins-regular  text-sm leading-5">
                          {moment(patient?.created_at).format('LT')}
                        </p>
                      </div>
                      <p className="text-[#8B8B8B] poppins-regular  text-sm leading-5">
                        {patient?.receiver?.email}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative h-full w-full col-span-9">
          <div
            className=" h-[76vh] p-6 pb-20 overflow-y-scroll bg-[#FEF1E6]"
            style={{
              boxShadow:
                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
            }}
          >
            {isLoading ? (
              <div className="w-full h-full flex  justify-center items-center">
                <Spin size="large" />
              </div>
            ) : (
              Array.isArray(allChats) &&
              allChats?.map((item, index) => (
                <p
                  className={`${
                    partnerId == item?.receiver_id
                      ? `ml-auto bg-[#FFFFFF]`
                      : 'bg-[#E5E5E5]'
                  } py-2 my-1 w-fit px-6 rounded-md`}
                  key={index}
                >
                  {item?.message}
                </p>
              ))
            )}
          </div>
          <div className="absolute w-full p-3 bottom-2 left-[50%] translate-x-[-50%]">
            <Input
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              value={message}
              className="bg-white"
              style={{
                borderRadius: '16px',
              }}
              suffix={
                <button
                  onClick={() => {
                    send({ receiver_id: partnerId, message })
                      .unwrap()
                      .then(() => {
                        setMessage('');
                        socket.emit('private-message', {
                          receiverId: '23', // partnerId,
                          message,
                        });
                      });
                  }}
                  className="text-xl p-2 cursor-pointer rounded-full bg-[#F27405] text-white"
                >
                  <FaLocationArrow />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
