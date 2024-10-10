import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { GoArrowUpRight, GoSearch } from 'react-icons/go';
import { CiImageOn } from "react-icons/ci";
import { Input } from 'antd';
import { FaLocationArrow } from 'react-icons/fa6';

const Chat = () => {
    const [partnerId, setPartnerId] = useState("");
    const scrollRef = useRef();
    const [keyword, setKeyword] = useState("");
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [partner, setPartner] = useState();



    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messageList]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handlePartner = (patient) => {
        setPartner(patient);
        setPartnerId(patient?._id);
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">

            {/* helmet */}
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Patient Message</h1>

            {/* message read and unread section */}



            {/* message container */}

            <div className='grid grid-cols-12 gap-6 mt-4 h-[76vh] '>

                <div className="col-span-3 w-full bg-[#FCFCFC]  rounded-lg p-4 overflow-y-scroll scroll-bar" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                    <div>
                        <Input
                            prefix={<GoSearch color="#B6C0C8" size={16} />}
                            placeholder="Enter Search..."
                            style={{
                                width: "100%",
                                height: 40,
                                border: "1px solid #E7EBED",
                                outline: "none",
                                borderRadius: 8
                            }}
                            className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
                        />

                        <div className='mt-[14px] grid grid-cols-1 gap-1'>
                            {
                                [...Array(20).keys()]?.map((patient, index) => {
                                    return (
                                        <div onClick={() => handlePartner(patient)} key={index} className={`flex cursor-pointer items-center gap-[10px] ${patient?._id === partnerId ? "bg-[#E7EBED]" : "bg-[#FDFDFD]"}  rounded-lg p-2`}>
                                            <img
                                                src={`https://i.ibb.co/d4RSbKx/Ellipse-980.png`}
                                                style={{ width: 56, height: 56, borderRadius: "100%", border: "2px solid #92A2AE" }}
                                                alt=""
                                            />
                                            <div className='w-full'>
                                                <div className='flex items-center justify-between pb-[6px]'>
                                                    <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>jon doe</h1>
                                                    <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>3:00 PM</p>
                                                </div>
                                                <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>jondoe@gmail.com</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


                <div className='relative h-full w-full col-span-9'>
                    <div className=' h-[76vh] p-6 pb-20 overflow-y-scroll bg-[#FEF1E6]' style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                        {[...Array(50).keys()].map((item, index) => <p className={`${index % 2 == 0 ? `ml-auto bg-[#FFFFFF]` : 'bg-[#E5E5E5]'} py-2 my-1 w-fit px-6 rounded-md`} key={index}>
                            {index % 2 == 0 ? `Lorem ipsum dolor sit amet consectetur.` : 'Lorem ipsum dolor sit amet consectetur.'}
                        </p>)}
                    </div>
                    <div className='absolute w-full p-3 bottom-2 left-[50%] translate-x-[-50%]'>
                        <Input placeholder='Type your message' className='bg-white'
                            style={{
                                borderRadius: '16px'
                            }}
                            suffix={<button className='text-xl p-2 cursor-pointer rounded-full bg-[#F27405] text-white'><FaLocationArrow /></button>}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat; 