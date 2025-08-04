import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../AuthContext";


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setProfile, setRegister } = useAuth();
    // const collectData = async (e) => {
    //     let user = localStorage.getItem("user");
    //     user = JSON.parse(user)
    //     e.preventDefault();
    //     let result = await axios.post('http://localhost:5000/signup', {
    //         name,
    //         email,
    //         password
    //     });
    //     result = result.data;
    //     if (result && result.result === "Enter Complete details") {
    //         alert("Enter Complete details")
    //     }
    //     else {
    //         localStorage.setItem("user", JSON.stringify(result));
    //         setRegister(true);
    //         localStorage.setItem("registry", true)
    //         setProfile(true)
    //         localStorage.setItem("profile", true)
    //         navigate(`/profile/${result._id}`);
    //     }
    // }

    const collectData = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/signup', {
            name,
            email,
            password
          });
      
          const userData = response.data;
          
          if (userData && userData._id) {
            localStorage.setItem("user", JSON.stringify(userData));
            setRegister(true);
            localStorage.setItem("registry", true);
            setProfile(true);
            localStorage.setItem("profile", true);
            navigate(`/profile/${userData._id}`);
          }
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                if (error.response.data.result === "User already exists") {
                  alert("Email already registered");
                } else {
                  alert("Please fill all required fields");
                }
                break;
              case 500:
                alert("Server error. Please try again later.");
                break;
              default:
                alert("Registration failed. Please try again.");
            }
          } else {
            alert("Network error. Please check your connection.");
          }
        }
      };
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200">
            <div className="bg-white shadow-sm shadow-black rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Sign Up</h2>
                <form onSubmit={collectData}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Confirm your password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-900 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
