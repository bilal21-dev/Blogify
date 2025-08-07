import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { useAuth } from '../AuthContext';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { useProfileSettings } from '../ProfileSettingsContext';

const { Header } = Layout;

const Navbar = () => {
    const { profile, setProfile, setRegister } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;

    const [curForm, setForm] = useState('signup');
    const [activeKey, setActiveKey] = useState(null);
    const { profilePic, setProfilePic } = useProfileSettings();
    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        setActiveKey(key);
    };

    const navItems = [
        { key: '1', label: <NavLink to="/home">Home</NavLink> },
        { key: '2', label: <NavLink to="/about">About</NavLink> },
        { key: '3', label: <NavLink to="/contact">Contact-Us</NavLink> },
        { key: '4', label: <NavLink to="/FAQ">FAQ</NavLink> },
    ];

    const handleLogout = () => {
        localStorage.clear();
        setProfile(false);
        setRegister(false);
        setProfilePic('');
        navigate("/home");
        setIsMobileMenuOpen(false);
    };

    const items = [
        {
            key: '1',
            label: user ? (
                <div className="flex items-center gap-3 px-4 py-2 text-white hover:text-blue-600 transition-colors duration-200">
                    <CgProfile className='text-blue-600 text-lg' />
                    <NavLink to={`/profile/${user._id}`} className="font-medium">Profile</NavLink>
                </div>
            ) : null,
        },
        {
            key: '2',
            label: (
                <div className="flex items-center gap-3 px-4 py-2 text-white hover:text-red-600 transition-colors duration-200 cursor-pointer"
                    onClick={handleLogout}>
                    <IoMdLogOut className='text-red-600 text-lg' />
                    <span className="font-medium">Logout</span>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <Header
                className="relative backdrop-blur-md bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 border-b border-white/10 shadow-2xl"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    height: '80px',
                }}
            >
                {/* Mobile Layout */}
                <div className="flex items-center justify-between w-full md:hidden">
                    {/* Mobile + Not Logged In: Logo (left) Menu toggle (right) */}
                    {!profile && (
                        <>
                            {/* Logo on left */}
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-md">B</span>
                                </div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 font-bold text-xl tracking-wide">
                                    BLOGVERSE
                                </div>
                            </div>

                            {/* Menu toggle on right */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white/90 hover:text-white text-xl focus:outline-none transition-all duration-300 hover:scale-110 p-1 rounded-lg hover:bg-white/10"
                            >
                                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </>
                    )}

                    {/* Mobile + Logged In: Menu toggle (left) Logo (centered) Profile image (right) */}
                    {profile && (
                        <>
                            {/* Menu toggle on left */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white/90 hover:text-white text-xl focus:outline-none transition-all duration-300 hover:scale-110 p-1 rounded-lg hover:bg-white/10"
                            >
                                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>

                            {/* Logo centered */}
                            <div className="flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-md">B</span>
                                </div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 font-bold text-xl tracking-wide">
                                    BLOGVERSE
                                </div>
                            </div>

                            {/* Profile image on right */}
                            <Dropdown
                                menu={{ items }}
                                trigger={['click']}
                                placement="bottomRight"
                                overlayClassName="premium-dropdown"
                            >
                                <div className="flex items-center cursor-pointer group p-1 rounded-2xl hover:bg-white/10 transition-all duration-300">
                                    <div className="relative">
                                        <img
                                            src={profilePic}
                                            className="h-10 w-10 rounded-2xl object-cover ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg"
                                            alt="Profile"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 shadow-lg"></div>
                                    </div>
                                </div>
                            </Dropdown>
                        </>
                    )}
                </div>

                {/* Desktop Layout - unchanged */}
                <div className="hidden md:flex items-center justify-between w-full">
                    {/* Blogverse Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 font-bold text-2xl tracking-wide">
                            BLOGVERSE
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-sm rounded-2xl px-8 border border-white/10">
                        {navItems.map((item) => (
                            <div key={item.key} className="relative group">
                                {React.cloneElement(item.label, {
                                    className: `font-medium text-lg transition-all duration-300 hover:scale-105 relative z-10 px-4 py-2 rounded-xl ${activeKey === item.key
                                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`,
                                    onClick: () => handleMenuClick({ key: item.key })
                                })}
                            </div>
                        ))}
                    </div>

                    {/* User Profile Section or Login/Signup buttons */}
                    {profile ? (
                        <div className="relative">
                            <Dropdown
                                menu={{ items }}
                                trigger={['click']}
                                placement="bottomRight"
                                overlayClassName="premium-dropdown"
                            >
                                <div className="flex items-center space-x-3 cursor-pointer group p-2 rounded-2xl hover:bg-white/10 transition-all duration-300">
                                    <div className="relative">
                                        <img
                                            src={profilePic}
                                            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg"
                                            alt="Profile"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 shadow-lg"></div>
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className="text-white/90 text-sm font-medium">Welcome back</div>
                                        <div className="text-white/60 text-xs">{user?.name || 'User'}</div>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                            <Link
                                to="/signup"
                                className={`px-6 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'signup'
                                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                                onClick={() => {
                                    setForm('signup');
                                    setActiveKey(null);
                                }}
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className={`px-6 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'login'
                                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                                onClick={() => {
                                    setForm('login');
                                    setActiveKey(null);
                                }}
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {/* {isMobileMenuOpen && (
                    <div className="fixed top-20 left-0 w-full bg-gradient-to-br from-slate-900/98 via-blue-900/98 to-slate-900/98 backdrop-blur-xl md:hidden z-[999] border-t border-white/10 shadow-2xl">
                        <div className="flex flex-col items-center space-y-6 py-8 animate-fade-in">
                            {navItems.map((item) => (
                                <div key={item.key} className="relative group transform transition-all duration-500 opacity-0 translate-y-4 animate-slide-in">
                                    {React.cloneElement(item.label, {
                                        className: `text-xl font-medium transition-all duration-300 hover:scale-110 px-6 py-3 rounded-xl ${activeKey === item.key
                                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl ring-2 ring-blue-400/30 transform scale-105'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                            }`,
                                        onClick: () => {
                                            handleMenuClick({ key: item.key });
                                            setIsMobileMenuOpen(false);
                                        },
                                    })}
                                </div>
                            ))}

                            
                            {!profile && (
                                <div className="flex gap-2 pt-4">
                                    <Link
                                        to="/signup"
                                        className={`px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'signup'
                                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        onClick={() => {
                                            setForm('signup');
                                            setActiveKey(null);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/login"
                                        className={`px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'login'
                                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        onClick={() => {
                                            setForm('login');
                                            setActiveKey(null);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )} */}
                {isMobileMenuOpen && (
                    <div className="fixed top-20 left-0 w-full bg-gradient-to-br from-slate-900/98 via-blue-900/98 to-slate-900/98 backdrop-blur-xl md:hidden z-[1000] border-t border-white/10 shadow-2xl">
                        <div className="flex flex-col items-center space-y-6 py-8 animate-fade-in">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.key}
                                    className="relative group transform transition-all duration-500 opacity-0 translate-y-4 animate-slide-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {React.cloneElement(item.label, {
                                        className: `text-xl font-medium transition-all duration-300 hover:scale-110 px-6 py-3 rounded-xl ${activeKey === item.key
                                                ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl ring-2 ring-blue-400/30 transform scale-105'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                            }`,
                                        onClick: () => {
                                            handleMenuClick({ key: item.key });
                                            setIsMobileMenuOpen(false);
                                        },
                                    })}
                                </div>
                            ))}

                            {/* Login / Signup Buttons in Mobile Menu */}
                            {!profile && (
                                <div className="flex gap-2 pt-4">
                                    <Link
                                        to="/signup"
                                        className={`px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'signup'
                                                ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        onClick={() => {
                                            setForm('signup');
                                            setActiveKey(null);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/login"
                                        className={`px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 ${curForm === 'login'
                                                ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-blue-400/30 transform scale-105'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`}
                                        onClick={() => {
                                            setForm('login');
                                            setActiveKey(null);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </Header>

            {/* Custom Styles */}
            <style jsx global>{`
                .premium-dropdown .ant-dropdown-menu {
                    background: rgba(15, 23, 42, 0.95) !important;
                    backdrop-filter: blur(16px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 16px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                    padding: 8px !important;
                }
                
                .premium-dropdown .ant-dropdown-menu-item {
                    border-radius: 12px !important;
                    margin: 4px 0 !important;
                    transition: all 0.3s ease !important;
                }
                
                .premium-dropdown .ant-dropdown-menu-item:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    transform: translateX(4px) !important;
                }
                
                .ant-layout-header {
                    position: relative !important;
                    z-index: 10 !important;
                }
                
                /* Glassmorphism effect */
                .navbar-glass {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)) !important;
                    backdrop-filter: blur(20px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                
                /* Smooth animations */
                * {
                    scroll-behavior: smooth;
                }
                
                /* Custom scrollbar for mobile menu */
                .mobile-menu::-webkit-scrollbar {
                    width: 4px;
                }
                
                .mobile-menu::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .mobile-menu::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 2px;
                }
                 @keyframes slide-in {
                 0% {
                         opacity: 0;
                    transform: translateY(12px);
                    }
                    100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.4s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

            `}</style>
        </Layout>
    );
};

export default Navbar;