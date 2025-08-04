// import React, { useState } from 'react';
// import { Link, NavLink, useParams } from 'react-router-dom';
// import { Layout, Menu } from 'antd';
// import { useAuth } from '../AuthContext';
// import { Dropdown, Space } from 'antd';
// import { CgProfile } from "react-icons/cg";
// import { IoMdLogOut } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import { useProfileSettings } from '../ProfileSettingsContext';

// const { Header } = Layout;

// const Navbar = () => {
//     const { profile, setProfile, setRegister } = useAuth();
//     let user = localStorage.getItem("user");
//     user = user ? JSON.parse(user) : null;

//     const [curForm, setForm] = useState('signup');
//     const [activeKey, setActiveKey] = useState(null); // Track the active menu item
//     const { profilePic,setProfilePic } = useProfileSettings();
//     const handleMenuClick = ({ key }) => {
//         setActiveKey(key); // Update the active menu item
//     };
//     const navigate = useNavigate();
//     const navItems = [
//         { key: '1', label: <NavLink to="/home">Home</NavLink> },
//         { key: '2', label: <NavLink to="/about">About</NavLink> },
//         { key: '3', label: <NavLink to="/contact">Contact-Us</NavLink> },
//         { key: '4', label: <NavLink to="/FAQ">FAQ</NavLink> },
//     ];
//     const handleLogout = () => {
//         console.log('Logged out');
//         localStorage.clear();
//         setProfile(false);
//         setRegister(false);
//         setProfilePic('');
//         navigate("/home");
//         // Add logout logic here
//     };

//     const items = [
//         {
//             key: '1',
//             label: user ? (
//                 <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
//             ) : null, // Ensure no error when user is null
//             icon: <CgProfile className='text-blue-600 text-xl' />,
//         },
//         {
//             key: '2',
//             label: (
//                 <p onClick={handleLogout}>Logout</p>
//             ),
//             icon: <IoMdLogOut className='text-red-600 text-xl'/>
//         },
//     ];

//     return (
//         <Layout>
//             <Header
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                 }}
//             >
//                 <div
//                     style={{
//                         color: 'white',
//                         fontWeight: 'bold',
//                         fontSize: 20,
//                     }}
//                 >
//                     BLOGVERSE
//                 </div>

//                 <div className="hidden md:block"> {/* Only show on medium screens and larger */}
//                     <Menu
//                         theme="dark"
//                         mode="horizontal"
//                         style={{
//                             flex: 1,
//                             justifyContent: 'center',
//                             display: 'flex',
//                             fontSize: 17,
//                         }}
//                         selectedKeys={activeKey ? [activeKey] : []} // Manage selected menu item
//                         onClick={handleMenuClick} // Handle menu item clicks
//                         items={navItems.map((item) => ({
//                             key: item.key,
//                             label: item.label,
//                         }))}
//                     />
//                 </div>

//                 {profile ? (
//                     <span
//                         className="text-white text-xl cursor-pointer"
//                         onClick={() => setActiveKey(null)} // Reset active menu item
//                     >

//                         <Dropdown
//                             menu={{
//                                 items,
//                             }}
//                         >
//                             <a onClick={(e) => e.preventDefault()}>
//                                 <Space>
//                                     <img src={profilePic} className="h-8 w-8 rounded-full" />
                        
//                                 </Space>
//                             </a>
//                         </Dropdown>

//                     </span>
//                 ) : (
//                     <div className="toggle flex items-center bg-gray-200 rounded-full overflow-hidden">
//                         <Link
//                             to="/signup"
//                             className={`flex-1 font-semibold py-2 text-center ${curForm === 'signup' ? 'active' : ''}`}
//                             onClick={() => {
//                                 setForm('signup');
//                                 setActiveKey(null); // Reset active menu item
//                             }}
//                         >
//                             Signup
//                         </Link>
//                         <Link
//                             to="/login"
//                             className={`flex-1 font-semibold py-2 text-center ${curForm === 'login' ? 'active' : ''}`}
//                             onClick={() => {
//                                 setForm('login');
//                                 setActiveKey(null); // Reset active menu item
//                             }}
//                         >
//                             Login
//                         </Link>

//                     </div>
//                 )}
//             </Header>
//         </Layout>
//     );
// };

// export default Navbar;




// {/* <Link to={`/profile/${user._id}`}>
//                             {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
//                         </Link> */}
// {/* <Link to={`/profile/${user._id}`}>
//                             <img
//                                 src={profilePic || 'https://via.placeholder.com/100'} // Fallback if no profile pic
//                                 alt="Profile"
//                                 className="h-8 w-8 rounded-full"
//                             />
//                         </Link> */}



// import React, { useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { Layout, Menu, Dropdown, Space } from 'antd';
// import { useAuth } from '../AuthContext';
// import { CgProfile } from "react-icons/cg";
// import { IoMdLogOut } from "react-icons/io";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useProfileSettings } from '../ProfileSettingsContext';

// const { Header } = Layout;

// const Navbar = () => {
//     const { profile, setProfile, setRegister } = useAuth();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     let user = localStorage.getItem("user");
//     user = user ? JSON.parse(user) : null;

//     const [curForm, setForm] = useState('signup');
//     const [activeKey, setActiveKey] = useState(null);
//     const { profilePic, setProfilePic } = useProfileSettings();
//     const navigate = useNavigate();

//     const handleMenuClick = ({ key }) => {
//         setActiveKey(key);
//     };

//     const navItems = [
//         { key: '1', label: <NavLink to="/home">Home</NavLink> },
//         { key: '2', label: <NavLink to="/about">About</NavLink> },
//         { key: '3', label: <NavLink to="/contact">Contact-Us</NavLink> },
//         { key: '4', label: <NavLink to="/FAQ">FAQ</NavLink> },
//     ];

//     const handleLogout = () => {
//         localStorage.clear();
//         setProfile(false);
//         setRegister(false);
//         setProfilePic('');
//         navigate("/home");
//         setIsMobileMenuOpen(false);
//     };

//     const items = [
//         {
//             key: '1',
//             label: user ? (
//                 <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
//             ) : null,
//             icon: <CgProfile className='text-blue-600 text-xl' />,
//         },
//         {
//             key: '2',
//             label: (
//                 <p onClick={handleLogout}>Logout</p>
//             ),
//             icon: <IoMdLogOut className='text-red-600 text-xl'/>
//         },
//     ];

//     return (
//         <Layout>
//             <Header 
//                 className="flex items-center justify-between px-4 py-2"
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                 }}
//             >
//                 <div
//                     style={{
//                         color: 'white',
//                         fontWeight: 'bold',
//                         fontSize: 20,
//                     }}
//                 >
//                     BLOGVERSE
//                 </div>

//                 {/* Mobile Menu Toggle */}
//                 <div className="md:hidden">
//                     <button 
//                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         className="text-white text-2xl focus:outline-none"
//                     >
//                         {isMobileMenuOpen ? <FaTimes className='mt-[26px]'/> : <FaBars className='mt-[26px]'/>}
//                     </button>
//                 </div>

//                 {/* Desktop Navigation */}
//                 <div className="hidden md:block">
//                     <Menu
//                         theme="dark"
//                         mode="horizontal"
//                         style={{
//                             flex: 1,
//                             justifyContent: 'center',
//                             display: 'flex',
//                             fontSize: 17,
//                         }}
//                         selectedKeys={activeKey ? [activeKey] : []}
//                         onClick={handleMenuClick}
//                         items={navItems.map((item) => ({
//                             key: item.key,
//                             label: item.label,
//                         }))}
//                     />
//                 </div>

//                 {/* Mobile Menu */}
//                 {isMobileMenuOpen && (
//                     <div className="absolute top-16 left-0 w-full bg-gray-800 md:hidden">
//                         <div className="flex flex-col items-center space-y-4 py-4">
//                             {navItems.map((item) => (
//                                 React.cloneElement(item.label, {
//                                     key: item.key,
//                                     className: 'text-white',
//                                     onClick: () => setIsMobileMenuOpen(false)
//                                 })
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {profile ? (
//                     <span
//                         className="text-white text-xl cursor-pointer"
//                         onClick={() => setActiveKey(null)}
//                     >
//                         <Dropdown
//                             menu={{
//                                 items,
//                             }}
//                         >
//                             <a onClick={(e) => e.preventDefault()}>
//                                 <Space>
//                                     <img src={profilePic} className="h-8 w-8 rounded-full" />
//                                 </Space>
//                             </a>
//                         </Dropdown>
//                     </span>
//                 ) : (
//                     <div className="toggle flex items-center bg-gray-200 rounded-full overflow-hidden">
//                         <Link
//                             to="/signup"
//                             className={`flex-1 font-semibold py-2 text-center ${curForm === 'signup' ? 'active' : ''}`}
//                             onClick={() => {
//                                 setForm('signup');
//                                 setActiveKey(null);
//                             }}
//                         >
//                             Signup
//                         </Link>
//                         <Link
//                             to="/login"
//                             className={`flex-1 font-semibold py-2 text-center ${curForm === 'login' ? 'active' : ''}`}
//                             onClick={() => {
//                                 setForm('login');
//                                 setActiveKey(null);
//                             }}
//                         >
//                             Login
//                         </Link>
//                     </div>
//                 )}
//             </Header>
//         </Layout>
//     );
// };

// export default Navbar;





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
                <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
            ) : null,
            icon: <CgProfile className='text-blue-600 text-xl' />,
        },
        {
            key: '2',
            label: (
                <p onClick={handleLogout}>Logout</p>
            ),
            icon: <IoMdLogOut className='text-red-600 text-xl'/>
        },
    ];

    return (
        <Layout>
            <Header 
                className="relative  flex items-center justify-between px-4 py-2"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Mobile Menu Toggle */}
                <div className="md:hidden mr-2">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {isMobileMenuOpen ? <FaTimes className='mt-[26px]'/> : <FaBars className='mt-[26px]'/>}
                    </button>
                </div>

                <div
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    BLOGVERSE
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            display: 'flex',
                            fontSize: 17,
                        }}
                        selectedKeys={activeKey ? [activeKey] : []}
                        onClick={handleMenuClick}
                        items={navItems.map((item) => ({
                            key: item.key,
                            label: item.label,
                        }))}
                    />
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed top-16 left-0 w-full bg-gray-800 md:hidden z-50">
                        <div className="flex flex-col items-center space-y-4 py-4">
                            {navItems.map((item) => (
                                React.cloneElement(item.label, {
                                    key: item.key,
                                    className: 'text-white',
                                    onClick: () => setIsMobileMenuOpen(false)
                                })
                            ))}
                        </div>
                    </div>
                )}

                {profile ? (
                    <span
                        className="text-white text-xl cursor-pointer"
                        onClick={() => setActiveKey(null)}
                    >
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img src={profilePic} className="h-8 w-8 rounded-full mt-2" />
                                </Space>
                            </a>
                        </Dropdown>
                    </span>
                ) : (
                    <div className="toggle flex items-center bg-gray-200 rounded-full overflow-hidden">
                        <Link
                            to="/signup"
                            className={`flex-1 font-semibold py-2 text-center ${curForm === 'signup' ? 'active' : ''}`}
                            onClick={() => {
                                setForm('signup');
                                setActiveKey(null);
                            }}
                        >
                            Signup
                        </Link>
                        <Link
                            to="/login"
                            className={`flex-1 font-semibold py-2 text-center ${curForm === 'login' ? 'active' : ''}`}
                            onClick={() => {
                                setForm('login');
                                setActiveKey(null);
                            }}
                        >
                            Login
                        </Link>
                    </div>
                )}
            </Header>
        </Layout>
    );
};

export default Navbar;