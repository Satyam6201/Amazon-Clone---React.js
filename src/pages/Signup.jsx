import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/');
  };

  return (
    <div className="signup-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon logo"
        className="amazon-logo"
      />
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              placeholder="First and last name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="mobile-input">
              <span>+91</span>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter mobile number"
                {...register('mobile', { required: 'Mobile number is required' })}
              />
            </div>
            {errors.mobile && <span className="error">{errors.mobile.message}</span>}
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message: 'Password must contain an uppercase letter, number and special character'
                  }
                })}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <button className="verify-button" type="submit" disabled={!isValid}>
            Verify mobile number
          </button>

          <div className="hr" />
          <div className="business-account">
            <label>Buying for work?</label>
            <a href="#">Create a free business account</a>
          </div>
          <div className="hr" />

          <div className="login-link">
            <p>Already have an account?</p>
            <a onClick={() => navigate('/login')}>Sign in</a>
          </div>

          <p className="terms">
            By creating an account or logging in, you agree to Amazon's{' '}
            <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
