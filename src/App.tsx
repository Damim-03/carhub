import { Routes, Route } from "react-router-dom"
import { Home } from '../Home'
import { EmailVerification, ForgotPassword, Login, ResetPassword, Signup } from '../pages/Auth'
import HomeDash from '../pages/Dashboard/pages/HomeDash'
import HomePage from '../pages/Home/HomePage'
import Product from '../pages/Products/Product'
import MercedesHome from '../pages/Car_Models/Mercedes/MercedesHome'
import { FilterProps } from "../Types/Type"

const App = () => {

  const searchParams: FilterProps = {
    manufacturer: "",
    year: 0,
    model: "",
    limit: 0,
    fuel: ""
  };

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
         <Route path="/HomePage" element={<HomePage searchParams={searchParams} />} />
         <Route path="/Product" element={<Product product={Product} />} />
         <Route path="/dashboard" element={<HomeDash />}/>
      </Routes>

      <Routes>
        <Route path="/Mercedes" element={<MercedesHome />} />
        <Route />
        <Route />
      </Routes>
    </>
  )
}

export default App
