import { motion } from 'motion/react';
import React, { useState } from 'react'
import {InputField} from '../Auth';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLoginSignup } from '../Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {

  }

  return(
    <>
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 
      via-blue-900 to-emerald-900 flex items-center justify-center 
      relative overflow-hidden px-4 sm:px-8 bg-mercedes"
>
  <NavbarLoginSignup />
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
    bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur rounded-3xl 
    shadow-xl overflow-hidden"
  >
    <div className="p-6 sm:p-8">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold mb-4 sm:mb-6 text-center bg-gradient-to-t 
        from-green-400 to-emerald-500 text-transparent bg-clip-text"
      >
        Create Account
      </h2>
      <form onSubmit={handleLogin} className="space-y-10">
        <InputField
          icon={Mail}
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <Link
            className="text-gray-400 hover:underline hover:text-blue-400 flex justify-between items-center"
            to={"/forgot-password"}
          >
          <p>
            Forgot your password?{" "}
          </p>
          </Link>
        <motion.button
          className="mt-4 sm:mt-5 w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Log In
        </motion.button>
      </form>
    </div>
    <div className="px-4 sm:px-6 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
      <p className="text-sm text-gray-400 text-center">
        Already Have an account?{" "}
        <Link
          className="text-white hover:underline"
          to={"/register"}
        >
          Login
        </Link>
      </p>
    </div>
  </motion.div>
</div>
    </>
  )
}

export default Login