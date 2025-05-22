import React from 'react';
import './DashboardHome.css';
import TotalSellerChart from './TotalSellerChart';
import DailyOverviewChart from './DailyOverviewChart';
import { HiUserGroup } from 'react-icons/hi';
import salon from '../../../assets/salon.png';
import earning from '../../../assets/earning.png';
import TotalSalonstatistics from './TotalSalonstatistics';
import { useDashboardDataQuery } from '../../../Redux/Apis/aboutApis';
import ActiveUserOverview from './ActiveUserOverview';
import AllFeedbacks from '../AllFeedbacks';
function DashboardHome() {
  const { data: dashboardData } = useDashboardDataQuery();
  const data = [
    {
      name: 'Total User',
      count: dashboardData?.total_user,
      icon: <HiUserGroup color="#F27405" size={32} />,
      color: '#F27405',
      bgColor: '#E2F7FC',
      extra: 'Daily user',
      extracount: dashboardData?.daily_user,
    },
    {
      name: 'Total Salon',
      count: dashboardData?.total_salon,
      color: '#734D2C',
      icon: <img src={salon} alt="" />,
      bgColor: '#FFE3C7',
    },
    {
      name: 'Total Seller',
      count: dashboardData?.total_earning.toFixed(2),
      color: '#00B047',
      icon: <img src={earning} alt="" />,
      bgColor: '#FFF3D6',
    },
  ];
  // useEffect(() => {
  //   const osInfo = platform.os;
  //   const browserInfo = platform.name + ' ' + platform.version;
  //   console.log('Operating System:', osInfo);
  //   console.log('Browser Info:', browserInfo)
  // })
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 items-center gap-4">
        {data?.map((item, index) => (
          <div
            className="w-full h-full flex justify-between items-start bg-white rounded-md p-6"
            key={index}
          >
            <div className="flex w-[50%] gap-3 justify-start items-center ">
              <button
                style={{
                  background: item?.bgColor,
                }}
                className="p-2 rounded-full"
              >
                {item?.icon}
              </button>
              <p className="text-lg font-semibold">{item?.name}</p>
            </div>
            <div className="w-[50%]">
              <div className="flex w-[100%] gap-3 justify-end items-center ">
                <p
                  style={{
                    color: item?.color,
                  }}
                  className={`text-2xl font-semibold`}
                >
                  {item?.count}
                </p>
              </div>
              {item?.extra && (
                <div className="flex w-[100%] gap-3 justify-end items-center mt-4">
                  <p>{item?.extra}</p>
                  <p
                    style={{
                      color: 'green',
                    }}
                    className={`text-base`}
                  >
                    {item?.extracount}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 items-center justify-start py-10">
        <div
          className="w-full h-full"
          style={{
            borderRadius: '15px',
            backgroundColor: '#fff',
            padding: '10px 20px 20px 20px',
          }}
        >
          <TotalSellerChart chartData={dashboardData?.app_users} />
        </div>
        <div
          className="w-full h-full"
          style={{
            borderRadius: '15px',
            padding: '20px',
            backgroundColor: '#fff',
          }}
        >
          <DailyOverviewChart chartData={dashboardData?.total_earning_growth} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 items-center justify-start">
        <div
          className="w-full h-full"
          style={{
            borderRadius: '15px',
            padding: '20px',
            backgroundColor: '#fff',
          }}
        >
          <TotalSalonstatistics
            chartData={dashboardData?.total_salon_statistic}
          />
        </div>
        <div
          style={{
            borderRadius: '15px',
            padding: '20px',
            backgroundColor: '#fff',
          }}
          className="w-full h-full overflow-x-scroll bg-white rounded-2xl"
        >
          <ActiveUserOverview chartData={dashboardData?.active_users} />
        </div>
      </div>
      <div>
        <div
          style={{
            marginTop: '20px',
            marginBottom: '15px',
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: '20px',
            borderRadius: '15px',
            padding: '20px',
            backgroundColor: '#fff',
            width: '100%',
          }}
          className="col-span-2"
        >
          <AllFeedbacks head={false} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
