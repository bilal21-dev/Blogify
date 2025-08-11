import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from '../../utils/apiClient';
import { useAuth } from "../AuthContext";
import { useLoading } from "../LoadingContext";
import { LoadingButton } from "../LoadingSpinner";
import { showSuccess, showError } from '../../utils/toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile, setRegister } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await apiClient.post('/login', {
        email,
        password
      }, {
        loadingMessage: "Logging you in..."
      });
  
      const userData = response.data;
      
      if (userData && userData._id) {
        localStorage.setItem('user', JSON.stringify(userData));
        setRegister(true);
        localStorage.setItem("registry", true);
        setProfile(true);
        localStorage.setItem("profile", true);
        showSuccess("Login successful! Welcome back.");
        // navigate(`/profile/${userData._id}`);
        navigate('/home'); // Redirect to home after login
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            showError("Please enter both email and password");
            break;
          case 401:
            showError("Invalid email or password");
            break;
          case 404:
            showError("User not found");
            break;
          default:
            showError("Login failed. Please try again.");
        }
      } else {
        showError("Network error. Please check your connection.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-200 via-blue-200 to-purple-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-slate-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-black-300/80 text-sm">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2 group-focus-within:text-purple-900 transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/15"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2 group-focus-within:text-purple-900 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/15"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center group cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                  />
                  <div className="w-4 h-4 bg-white/10 border border-white/30 rounded group-hover:bg-white/20 transition-colors duration-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="ml-2 text-black-300/80 group-hover:text-gray-200 transition-colors">Remember Me</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-800 font-medium hover:underline transition-colors duration-200">
                Forgot Password?
              </a>
            </div>

            <LoadingButton
              type="submit"
              loading={loginLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 group"
              loadingText="Signing In..."
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative z-10">Sign In</span>
            </LoadingButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-black-300/80 text-sm">
              Don't have an account?{" "}
              <Link 
                to='/signup' 
                className="text-pink-800 hover:text-purple-300 font-medium hover:underline transition-colors duration-200"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;