import { Routes, Route } from "react-router-dom"
import { Home } from '../Home'
import { EmailVerification, ForgotPassword, Login, ResetPassword, Signup } from '../pages/Auth'
import ProductDetails from '../pages/Products/pages/ProductDetails.tsx'
import Product from '../pages/Products/pages/Product.tsx'
import MercedesHome from '../pages/Car_Models/Mercedes/MercedesHome'
import { FilterProps } from "../Types/Type"
import Cars from "../pages/Dashboard/pages/Cars.tsx";
import ProductCard from "../pages/Products/pages/ProductCard.tsx";

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
          <Route path="/ShowCars" element={<ProductCard />} />
         <Route path="/ProductDetails" element={<ProductDetails searchParams={searchParams} />} />
         <Route path="/Product" element={<Product product={Product} />} />
      </Routes>

      <Routes>
        <Route path="/Mercedes" element={<MercedesHome />} />
        <Route path="/Cars" element={<Cars />}/>
        <Route />
      </Routes>
    </>
  )
}

export default App
