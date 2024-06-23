import React from "react";
import logo from '../logo.png';
import profileImage from '../profile.png';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const Navbar = () => {
    return (
        <div>
            <nav className="py-4 bg-[#ffffff] flex items-center justify-between">
                <img src={logo} alt="Logo" className="w-44 h-14 ml-4 mt-2"/>
                <div className="relative ml-96">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 pl-14 pt-1 rounded"
                        style={{ height: '35px', width: '500px', border: '1px solid gray', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                    />
                    <i className="bi bi-search absolute left-2 -top-1 p-2"></i>
                </div>
                <div className="mr-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray">
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
