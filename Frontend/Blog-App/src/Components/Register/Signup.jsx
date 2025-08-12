import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from '../../utils/apiClient';
import { useAuth } from "../AuthContext";
import { useLoading } from "../LoadingContext";
import { LoadingButton } from "../LoadingSpinner";
import { showSuccess, showError } from '../../utils/toast';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setProfile, setRegister } = useAuth();
    const [signupLoading, setSignupLoading] = useState(false);
   
    const collectData = async (e) => {
        e.preventDefault();
        setSignupLoading(true);
        try {
          const response = await apiClient.post('/signup', {
            name,
            email,
            password
          }, {
            loadingMessage: "Creating your account..."
          });
      
          const userData = response.data;
          
          if (userData && userData._id) {
            localStorage.setItem("user", JSON.stringify(userData));
            setRegister(true);
            localStorage.setItem("registry", true);
            setProfile(true);
            localStorage.setItem("profile", true);
            showSuccess("Account created successfully! Welcome to the blog community.");
            navigate(`/profile/${userData._id}`);
          }
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                if (error.response.data.result === "User already exists") {
                  showError("Email already registered");
                } else {
                  showError("Please fill all required fields");
                }
                break;
              case 500:
                showError("Server error. Please try again later.");
                break;
              default:
                showError("Registration failed. Please try again.");
            }
          } else {
            showError("Network error. Please check your connection.");
          }
        } finally {
          setSignupLoading(false);
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
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-blue-500 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h2>
                        <p className="text-black-300/80 text-sm">Join us and start your journey</p>
                    </div>

                    <form onSubmit={collectData} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-2 group-focus-within:text-purple-900 transition-colors">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Enter your username"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/15"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

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

                            <div className="group">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-800 mb-2 group-focus-within:text-purple-900 transition-colors">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/15"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        <LoadingButton
                            type="submit"
                            loading={signupLoading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 group"
                            loadingText="Creating Account..."
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <span className="relative z-10">Create Account</span>
                        </LoadingButton>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-black-300/80 text-sm">
                            Already have an account?{" "}
                            <Link 
                                to="/login" 
                                className="text-pink-800 hover:text-purple-300 font-medium hover:underline transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;