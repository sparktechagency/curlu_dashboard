import { Layout, Badge, } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import LogoText from "../../assets/logo-text.png";
import { HiLogout } from "react-icons/hi";
import { LuUser, LuUserPlus } from "react-icons/lu";
import { TbCategoryMinus, TbShoppingCartDollar } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiNotification2Line, RiChat1Line, RiCopperDiamondLine } from "react-icons/ri";
const { Header, Sider, Content } = Layout;
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFileInvoiceDollar, FaFire, FaRuler, FaStore } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosChatbubbles, IoMdNotificationsOutline } from "react-icons/io";
const Dashboard = () => {
  const [dropdown, setDropdown] = useState(false)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/login');
    window.location.reload();
  }

  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard size={24} />,
    },
    {
      title: "All user details",
      path: "/seller-list",
      icon: <LuUser size={24} />,
    },
    {
      title: "Salons Details",
      path: "/salons-setails",
      icon: <FaStore size={24} />,
    },
    {
      title: "Salons Services",
      path: "/salons-services",
      icon: <FaFire size={24} />,
    },
    {
      title: "Services Category",
      path: "/services-category",
      icon: <FaRuler size={24} />,
    },
    {
      title: "Manage E-Shop",
      path: "/manage-shop",
      icon: <TiShoppingCart size={24} />,
    },
    {
      title: "E-Shop Category",
      path: "/product-category",
      icon: <TbCategoryMinus size={24} />,
    },
    {
      title: "Orders Transaction",
      path: "/orders-transaction",
      icon: <TbShoppingCartDollar size={24} />,
    },
    {
      title: "Make Admin",
      path: "/make-admin",
      icon: <LuUserPlus size={24} />,
    },
    {
      title: "Chat",
      path: "/chat",
      icon: <IoIosChatbubbles size={24} />,
    },
    {
      title: "Salon Invoice",
      path: "/salon-invoice",
      icon: <FaFileInvoiceDollar size={24} />,
    },
    {
      title: "Notifications",
      path: "/notification",
      icon: <IoMdNotificationsOutline size={24} />,
    },
  ];
  const settingOptions = [
    {
      title: "Slider Setting",
      path: "/slider-setting",
    },
    {
      title: "Manage Haircut offers",
      path: "/manage-haircut-offers",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
    {
      title: "FAQ",
      path: "/faq",
    },
    {
      title: "Privacy Policy",
      path: "/privacy",
    },
    {
      title: "Terms & Condition",
      path: "/terms-condition",
    },
  ]
  return (
    <Layout style={{ height: "100vh", width: "100vw"}}>
      <Sider
        width="233px"
        trigger={null}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          overflowY: "hidden",
          zIndex: 2,
          backgroundColor: "white",
          overflowY:'scroll'
        }}
      >

        <div className="mt-4 mb-6" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img
            src={LogoText}
            width="80%"
          />
        </div>


        <ul className="px-4"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "100%",
            marginTop: 0
          }}
        >
          {linkItems.map((item, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                position: "relative",
                paddingLeft: "4px",
                display: "flex",
                alignItems: "center",
                transition: '.5s'
              }}
            >
              {
                item.path === pathname
                  ?
                  <div style={{ backgroundColor: "#F27405", position: "absolute", left: -10, top: 0, width: "8px", height: "100%", borderRadius: "0 10px 10px 0" }}></div>
                  :
                  null

              }
              <Link className={`${item.path === pathname ? "bg-[#F27405] text-[#FFFFFF]" : 'text-[#F27405]'} py-2 rounded hover:bg-[#F27405] hover:text-[#FFFFFF] w-full px-2`}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto  0 auto 0",
                  gap: "10px"
                }}
              >
                <div style={{ height: "24px", }}>{item.icon}</div>
                <div style={{ fontSize: "14px", textAlign: "center", height: "fit-content" }}>{item.title}</div>
              </Link>
            </li>

          ))}

          <li onClick={() => {
            setDropdown(!dropdown)
          }}
            style={{
              width: "100%",
              height: "34px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              paddingLeft: '4px'
            }}
          >
            {
              dropdown
                ?
                <div style={{ backgroundColor: "#FBFBFB", position: "absolute", left: 0, top: 0, width: "6px", height: "38px", borderRadius: "0 10px 10px 0" }}></div>
                :
                null

            }
            <div style={{
              width: "100%",
              marginTop: 0,
              height: "38px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "47px",
              gap: "14px",
              color: "#F2F2F2",
              cursor: "pointer",
              padding: '12px 12px',
              borderRadius: '4px',
              position: "relative",
              backgroundColor: dropdown ? "#F27405" : '',
              color: dropdown ? "#fff" : '#F27405',
            }}>
              <IoSettingsOutline size={24} />

              <p style={{ fontSize: "15px", textAlign: "center", }}>Settings</p>
              {
                dropdown
                  ?
                  <MdKeyboardArrowDown className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
                  :
                  <MdKeyboardArrowRight className="absolute top-[50%] right-0 translate-y-[-50%]" size={24} />
              }
            </div>
            {
              dropdown
              &&
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "40px",
                  width: '100%',
                  paddingLeft:'4px',
                  zIndex: '100'
                }}
              >
                {
                  settingOptions?.map((item, index) => <Link key={index} to={item?.path} style={{
                    textAlign: 'center',
                    color:  item.path === pathname ? "#FBFBFB" : '#f27405',
                    width: '100%',
                    backgroundColor: item.path === pathname ? "#f27405" : '#FBFBFB',
                    display: 'block',
                    padding: '7px 0px',
                    borderRadius:'4px',
                  }}>
                    <p>{item?.title}</p>
                  </Link>)
                }
              </div>
            }


          </li>

          <li
            style={{
              width: "100%",
              left: "0",
              position: "absolute",
              bottom: "53px",
            }}
          >

            <div onClick={handleLogOut} style={{ display: "flex", width: "fit-content", margin: "0 auto 0 auto", alignItems: "center", gap: "14px", cursor: "pointer", justifyContent: "center" }}>
              <div style={{ color: "#6A6D7C", fontSize: "14px" }}>Logout</div>
              <HiLogout color="#6A6D7C" size={24} />
            </div>
          </li>

        </ul>

      </Sider>
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: "#FFF",
            display: "flex",
            justifyContent: "end",
            paddingRight: "60px",
            paddingLeft: "270px"
          }}
        >
          <div
            style={{
              width: "280px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              justifyContent: "end"
            }}
          >

            <Badge color="#C30303" count={5}>
              <Link to="/notification" >
                <RiNotification2Line color="#6A6A6A" size={24} />
              </Link>
            </Badge>
            <div onClick={()=>navigate('/profile')} className="border cursor-pointer"
              style={{
                width: "170px",
                height: "42px",
                background: "#FFFFFF",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px"
              }}
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLotvhr2isTRMEzzT30Cj0ly77jFThGXr0ng&usqp=CAU" style={{ width: "30px", height: "30px", borderRadius: "100%" }} alt="" />
              <h2 style={{ color: "black", fontSize: "10px" }}>DR. Jim ahhmed</h2>
            </div>
          </div>
        </Header>

        <Content
          style={{
            marginTop: "90px",
            marginBottom: "20px",
            marginLeft: "255px",
            marginRight: "40px",
            overflow: "auto",
            padding: "20px"
          }}
        >
          <Outlet />
        </Content>
      </Layout>


    </Layout>
  );
};
export default Dashboard;
