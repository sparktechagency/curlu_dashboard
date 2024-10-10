import { Col, Row } from "antd";
import React from "react";
import "./DashboardHome.css";
import TotalSellerListTable from "../../../Components/Dashboard/TotalSellerListTable";
import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { HiUserGroup } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { TbDatabaseDollar } from "react-icons/tb";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import salon from '../../../assets/salon.png'
import earning from '../../../assets/earning.png'
import TotalSalonstatistics from "./TotalSalonstatistics";
function DashboardHome() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  const data = [
    {
      name: "Total User",
      count: "20.10K",
      icon: <HiUserGroup color="#F27405" size={32} />,
      color: "#F27405",
      bgColor: "#E2F7FC",
      extra: 'Daily user',
      extracount: 200
    },
    {
      name: "Total Salon",
      count: "320",
      color: "#734D2C",
      icon: <img src={salon} alt="" />,
      bgColor: "#FFE3C7"
    },
    {
      name: "Total Seller",
      count: "120",
      color: '#00B047',
      icon: <img src={earning} alt="" />,
      bgColor: "#FFF3D6"
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-3 items-center gap-4">
        {
          data?.map((item, index) => <div className="w-full h-full flex justify-between items-start bg-white rounded-md p-6" key={index}>
            <div className="flex w-[50%] gap-3 justify-start items-center ">
              <button style={{
                background: item?.bgColor
              }} className="p-2 rounded-full">
                {item?.icon}
              </button>
              <p className="text-lg font-semibold">{item?.name}</p>
            </div>
            <div className="w-[50%]">
              <div className="flex w-[100%] gap-3 justify-end items-center ">
                <p style={{
                  color: item?.color
                }} className={`text-2xl font-semibold`}>{item?.count}</p>
              </div>
              {
                item?.extra && <div className="flex w-[100%] gap-3 justify-end items-center mt-4">
                  <p>{item?.extra}</p>
                  <p style={{
                    color: 'green'
                  }} className={`text-base`}>{item?.extracount}</p>
                </div>
              }

            </div>
          </div>)
        }
      </div>
      <div className="grid grid-cols-2 gap-6 items-center justify-start py-10">
        <div className="w-full h-full"
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            padding: "10px 20px 20px 20px"
          }}
        >
          <TotalSellerChart />
        </div>
        <div className="w-full h-full" style={{ borderRadius: "15px", padding: "20px", backgroundColor: "#fff" }}>
          <DailyOverviewChart />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 items-center justify-start">
        <div className="w-full h-full" style={{ borderRadius: "15px", padding: "20px", backgroundColor: "#fff" }}>
          <TotalSalonstatistics />
        </div>
        <div className="w-full h-full overflow-x-scroll bg-white rounded-2xl">
        <TotalSellerListTable />
      </div>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "15px", display: "grid", gridTemplateColumns: "auto auto auto", gap: "20px" }} >
      </div>
    </div>
  );
}

export default DashboardHome;
