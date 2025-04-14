import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { InputField } from '../Auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URI}/api/user/login`, {
        email,
        password
      });

      console.log('Login successful:', response.data);

      // Example: Save token if returned
      localStorage.setItem('token', response.data.token);

      // Navigate to dashboard/home page after login
      navigate('/me'); // Change path as needed
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid email or password');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 flex items-center justify-center px-4 sm:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 bg-opacity-50 backdrop-blur rounded-3xl shadow-xl"
        >
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-t from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Login
            </h1>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <InputField
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
              />
              <InputField
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
              />

              <div className="flex justify-between items-center">
                <Link
                    to="/forgot-password"
                    className="text-gray-400 hover:underline hover:text-blue-400 text-sm"
                    aria-label="Forgot password"
                >
                  Forgot your password?
                </Link>
              </div>

              <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
                  aria-label="Login button"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </motion.button>
            </form>
          </div>

          <div className="px-4 sm:px-6 py-4 bg-gray-900 bg-opacity-50 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-white hover:underline" aria-label="Sign up">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
  );
};

export default Login;
