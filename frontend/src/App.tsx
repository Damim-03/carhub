import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Home } from '../Home'
import { EmailVerification, ForgotPassword, Login, ResetPassword, Signup } from '../pages/Auth'
import MercedesHome from '../pages/Car_Models/Mercedes/MercedesHome'
import {FilterProps, ProductProps} from "../Types/Type"
import ProductCard from "../pages/Home/ProductCard";
import About from "../pages/AboutUS/About";
import {Overwrite, Cars, Orders, Sales, Users, Customers, Dashboard} from "../pages/Dashboard/pages";
import {Product, ProductDetails} from "../pages/Products/pages";
import PaymentGateway from "../pages/PaymentGatway/pages/PaymentGateway";
import Me from "../pages/Dashboard/pages/Me.tsx";


const App = () => {

  const searchParams: FilterProps = {
    manufacturer: "",
    year: 0,
    model: "",
    limit: 0,
    fuel: ""
  };

  const product: ProductProps = {
      index: 0,
      title: "",
      value: "",
      image: "",
      link : "",
      product: "",
  }

  return (
    <>
        <Routes>

            {/* Public Routes */}
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/email-verification" element={<EmailVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected (Private) Routes */}
            <Route>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/me" element={<Me />} />
                <Route path="/overwrite" element={<Overwrite />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/users" element={<Users />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/product-details" element={<ProductDetails searchParams={searchParams} />} />
                <Route path="/product" element={<Product product={product} />} />
                <Route path="/payment-process" element={<PaymentGateway />} />
            </Route>

            {/* Open to everyone */}
            <Route path="/vehicles" element={<ProductCard />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/mercedes" element={<MercedesHome />} />

        </Routes>
    </>
  )
}

export default App
