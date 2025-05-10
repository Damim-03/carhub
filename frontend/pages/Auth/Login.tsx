import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { InputField } from '../Auth';

import video1 from '../../public/The BMW M3 Competition _ lost soul _ 4K.mp4';
import video2 from '../../public/White Knight; GT-R R35 _ 4K.mp4';
import video3 from '../../public/2025 Mercedes AMG S63e _ SLIDE Edit 4K.mp4';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string>(video1);

  const navigate = useNavigate();

  // Array of background videos
  const backgroundVideos = [video1, video2, video3];

  // Set a random video on component mount
  useEffect(() => {
    const randomVideo = backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
    setCurrentVideo(randomVideo);
  }, []); // Removed backgroundVideos from dependencies since it's static

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
      localStorage.setItem('token', response.data.token);
      navigate('/me');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid email or password');
      } else if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              key={currentVideo}
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Login Form */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md sm:max-w-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-xl relative z-10 mx-4"
        >
          <div className="p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-t from-sky-300 to-sky-500 text-transparent bg-clip-text">
              Login
            </h1>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg text-sm"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required={true}
                  autoComplete="email"
              />
              <InputField
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required={true}
                  autoComplete="current-password"
              />

              <div className="flex justify-between items-center">
                <Link
                    to="/forgot-password"
                    className="text-gray-300 hover:underline hover:text-blue-400 text-sm"
                    aria-label="Forgot password"
                >
                  Forgot your password?
                </Link>
              </div>

              <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={false}
                  animate={{
                    background: isLoading
                        ? 'linear-gradient(to right, #64748b, #64748b)'
                        : 'linear-gradient(to right, #3b82f6, #059669)',
                    opacity: isLoading ? 0.8 : 1,
                  }}
                  whileHover={{
                    scale: isLoading ? 1 : 1.05,
                    background: isLoading
                        ? 'linear-gradient(to right, #64748b, #64748b)'
                        : 'linear-gradient(to right, #2563eb, #047857)',
                  }}
                  whileTap={{
                    scale: isLoading ? 1 : 0.98,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="mt-6 w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label={isLoading ? 'Logging in' : 'Log in'}
              >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="block h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Logging in...
                    </div>
                ) : (
                    <span>Log In</span>
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-6 py-5 bg-gray-900 bg-opacity-50 rounded-b-3xl text-center">
            <p className="text-sm text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-white hover:underline font-medium" aria-label="Sign up">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
  );
};

export default Login;