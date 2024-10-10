import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Notification from "./Pages/Dashboard/Notification";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";
import PrivateRoute from "./routes/PrivateRoute";
import Package from "./Pages/Dashboard/Package";
import EditPackage from "./Pages/Dashboard/EditPackage";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import Profile from "./Pages/Dashboard/Profile";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SellerDetails from "./Pages/Dashboard/SellerDetails";
import Emails from "./Pages/Dashboard/Emails";
import SellerProductList from "./Pages/Dashboard/SellerProductList";
import TotalSellerList from "./Pages/Dashboard/TotalSellerList";
import TopSellerList from "./Pages/Dashboard/TopSellerList";
import AllFeedbacks from "./Pages/Dashboard/AllFeedbacks";
import SalonsDetails from "./Pages/Dashboard/SalonsDetails";
import SalonsServices from "./Pages/Dashboard/SalonsServices";
import ServicesCategory from "./Pages/Dashboard/ServicesCategory";
import ManageShop from "./Pages/Dashboard/ManageShop";
import ProductCategory from "./Pages/Dashboard/ProductCategory";
import OrdersTransection from "./Pages/Dashboard/OrdersTransection";
import SalonInvoice from "./Pages/Dashboard/SalonInvoice";
import SliderSetting from "./Pages/Dashboard/SliderSetting";
import ManageHaircutoffers from "./Pages/Dashboard/ManageHaircutoffers";
import About from "./Pages/Dashboard/About";
import FAQ from "./Pages/Dashboard/FAQ";
import PrivacyPolicy from "./Pages/Dashboard/PrivacyPolicy";
import Terms from "./Pages/Dashboard/Terms";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import Chat from "./Pages/Dashboard/Chat";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> }>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/all-feedback" element={<AllFeedbacks />} />
              <Route path="/salons-setails" element={<SalonsDetails />} />
              <Route path="/salons-services" element={<SalonsServices />} />
              <Route path="/services-category" element={<ServicesCategory />} />
              <Route path="/manage-shop" element={<ManageShop />} />
              <Route path="/product-category" element={<ProductCategory />} />
              <Route path="/orders-transaction" element={<OrdersTransection />} />
              <Route path="/salon-invoice" element={<SalonInvoice />} />
              <Route path="/slider-setting" element={<SliderSetting />} />
              <Route path="/manage-haircut-offers" element={<ManageHaircutoffers />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms-condition" element={<Terms />} />
              <Route path="/package" element={<Package />} />
              <Route path="/edit-package" element={<EditPackage />} />
              <Route path="/make-admin" element={<MakeAdmin />} />
              <Route path="/profile" element={<AdminProfile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/setting-change-password" element={<ChangePassword />} />
              <Route path="/settings-profile" element={<Profile />} />
              <Route path="/seller-list" element={<TotalSellerList  />} />
              <Route path="/seller-details/:id" element={<SellerDetails />} />
              <Route path="/seller-product-list" element={<SellerProductList />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/top-seller-list" element={<TopSellerList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
