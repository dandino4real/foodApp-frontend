import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react';
import Register from "./pages/Register/Register"
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login"
import Restaurant from './pages/Restaurant/Restaurant';
import OTP from './pages/OTP/OTP';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard/VendorDashboard';
import DataProvider from "./context/authcontext";
import {ToastContainer} from 'react-toastify'
import {ProtectAdminRoute} from './context/ProtectRoute';
import {ProtectVendorRoute} from './context/ProtectRoute';

function App() {
  return (
    <React.Fragment>
       <DataProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurant/:vendorId" element={<Restaurant />} />
            <Route path="/otp" element={<OTP />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/admin/dashboard" element={< ProtectAdminRoute>
              <AdminDashboard />
            </ProtectAdminRoute>
         
            } />
            <Route path="/vendor/dashboard" element={<ProtectVendorRoute>
              <VendorDashboard/>
            </ProtectVendorRoute>
          } />
          </Routes>
      </Router>
    </DataProvider>
    </React.Fragment>
  );
}

export default App;
