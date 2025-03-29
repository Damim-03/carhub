import { Routes, Route } from "react-router-dom"
import { Home } from '../Home'
import { EmailVerification, ForgotPassword, Login, ResetPassword, Signup } from '../pages/Auth'
import ProductDetails from "../pages/Products/pages/ProductDetails";
import Product from '../pages/Products/pages/Product'
import MercedesHome from '../pages/Car_Models/Mercedes/MercedesHome'
import {FilterProps, ProductProps} from "../Types/Type"
import Cars from "../pages/Dashboard/pages/Cars";
import ProductCard from "../pages/Home/ProductCard";
import About from "../pages/AboutUS/About";
import Index from "../pages/Dashboard/pages/Index.tsx";
import Overwrite from "../pages/Dashboard/pages/Overwrite.tsx";
import Sales from "../pages/Dashboard/pages/Sales.tsx";
import Users from "../pages/Dashboard/pages/Users.tsx";
import Customers from "../pages/Dashboard/pages/Customers.tsx";
import Orders from "../pages/Dashboard/pages/Orders.tsx";

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
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/email-verification" element={<EmailVerification />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>

        <Routes>
            <Route path={'/Me'} element={<Index />}/>
            <Route path={'/overwrite'} element={<Overwrite />}/>
            <Route path={'/sales'} element={<Sales />}/>
            <Route path={'/users'} element={<Users />}/>
            <Route path={'/customers'} element={<Customers />}/>
            <Route path={'/orders'} element={<Orders />}/>
            <Route path={'/Cars'} element={<Cars />}/>
        </Routes>

      <Routes>
          <Route path="/vehicles" element={<ProductCard />} />
          <Route path="/product-details" element={<ProductDetails searchParams={searchParams} />} />
          <Route path="/Product" element={<Product product={product} />} />
          <Route path="/aboutus" element={<About />} />
      </Routes>

      <Routes>
        <Route path="/Mercedes" element={<MercedesHome />} />
      </Routes>
    </>
  )
}

export default App
