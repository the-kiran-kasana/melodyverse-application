
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      profilePicture: '',
      terms: false
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        navigate('/posts');
      } catch (error) {
        console.error(error);
        setError(error.response.data.message || 'An error occurred');
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              aria-label="Username"
              aria-required="true"
              aria-invalid={formik.touched.username && formik.errors.username ? 'true' : 'false'}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? <p className="text-red-500 text-xs italic">{formik.errors.username}</p> : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              aria-label="Email"
              aria-required="true"
              aria-invalid={formik.touched.email && formik.errors.email ? 'true' : 'false'}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-xs italic">{formik.errors.email}</p> : null}
          </motion.div>

          {/* Password input with show/hide functionality */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 relative"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              aria-label="Password"
              aria-required="true"
              aria-invalid={formik.touched.password && formik.errors.password ? 'true' : 'false'}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-6 right-0 p-2 text-gray-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-xs italic">{formik.errors.password}</p> : null}
          </motion.div>

          {/* Confirm Password input with show/hide functionality */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 relative"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              aria-label="Confirm Password"
              aria-required="true"
              aria-invalid={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'true' : 'false'}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-6 right-0 p-2 text-gray-500"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-red-500 text-xs italic">{formik.errors.confirmPassword}</p> : null}
          </motion.div>

          {/* Name input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              aria-label="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </motion.div>

          {/* Profile Picture input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
              Profile Picture URL (optional)
            </label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              aria-label="Profile Picture"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.profilePicture}
              onChange={formik.handleChange}
            />
          </motion.div>

          {/* Terms and Conditions checkbox */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-6"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="checkbox"
                name="terms"
                className="mr-2 leading-tight"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                aria-label="Terms and Conditions"
              />
              I agree to the terms and conditions
            </label>
            {formik.touched.terms && formik.errors.terms ? <p className="text-red-500 text-xs italic">{formik.errors.terms}</p> : null}
          </motion.div>

          {/* Error message */}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              aria-label="Sign Up"
            >
              Sign Up
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;


