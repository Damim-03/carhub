import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Phone } from 'lucide-react';
import InputField from './utils/InputField';
import PasswordStrengthMeter from './utils/PasswordStrengthMeter';
import video1 from '../../public/The BMW M3 Competition _ lost soul _ 4K.mp4';
import video2 from '../../public/White Knight; GT-R R35 _ 4K.mp4';
import video3 from '../../public/2025 Mercedes AMG S63e _ SLIDE Edit 4K.mp4';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>(video1);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URI}/api/user/signup`, {
        firstName,
        lastName,
        email,
        phone,
        password
      });

      console.log('Signup successful:', response.data);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 flex items-center justify-center px-4 sm:px-8">
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 bg-opacity-50 backdrop-blur rounded-2xl shadow-xl"
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-t from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Create Account
            </h2>

            {success ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-3 bg-green-500 bg-opacity-20 text-green-200 rounded-lg text-center"
                >
                  Account created successfully! Redirecting to login...
                </motion.div>
            ) : (
                <>
                  {error && (
                      <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                  )}

                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                          icon={User}
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                      />
                      <InputField
                          icon={User}
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                      />
                    </div>

                    <InputField
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <InputField
                        icon={Phone}
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <InputField
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
                    >
                      {isLoading ? 'Creating account...' : 'Sign Up'}
                    </motion.button>
                  </form>
                </>
            )}
          </div>

          <div className="px-4 sm:px-6 py-4 bg-gray-900 bg-opacity-50 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
  );
};

export default SignUp;
