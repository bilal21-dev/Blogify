import React from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const DropdownMenu = ({ visible, toggleDropdown, items }) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      visible={visible} // Control visibility using prop
      onVisibleChange={toggleDropdown} // Handle visibility change (e.g., clicking outside)
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;




// <div className="bg-gradient-to-r from-green-400 to-yellow-300 m-0 pt-2 ">
        //     <nav className="bg-black text-green-500 p-4 rounded-3xl mx-4 z-[999]">
        //         <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        //             {/* Logo Section */}
        //             <div className="text-2xl font-bold text-yellow-400 flex gap-2 items-center justify-center lg:justify-start">
        //                 <FaBlog />
        //                 <Link to="/">BLOGVERSE</Link>
        //             </div>

        //             {/* Menu Items */}
        //             <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center">
        //                 <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium text-xl">
        //                     <NavLink to="/home" className={(e) => (e.isActive ? "text-green-400" : "")}>
        //                         Home
        //                     </NavLink>
        //                 </li>
        //                 <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium text-xl">
        //                     <NavLink to="/about" className={(e) => (e.isActive ? "text-green-400" : "")}>About</NavLink>
        //                 </li>
        //                 <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium text-xl">
        //                     <NavLink to="/contact" className={(e) => (e.isActive ? "text-green-400" : "")}>Contact-Us</NavLink>
        //                 </li>
        //                 {profile ? (
        //                     <li className="px-4 md:px-5 py-1 md:py-2 text-2xl md:text-3xl text-yellow-400 hover:text-green-400 transition-colors duration-200">
        //                         <Link to={`/profile/${user._id}`} className={(e) => (e.isActive ? "text-green-400" : "")}>
        //                             <CgProfile />
        //                         </Link>
        //                     </li>
        //                 ) : (
        //                     <li
        //                         className="text-yellow-400 font-medium rounded-lg px-3 md:px-5 py-1 md:py-2 hover:bg-white hover:text-green-500 transition-colors duration-200 relative text-xl"
        //                         onClick={() => setDropdown((prev) => !prev)}
        //                     >
        //                         Register
        //                         {dropdown && <Dropdown closeDropdown={closeDropdown} />}
        //                     </li>
        //                 )}
        //             </ul>
        //         </div>
        //     </nav>
        // </div>