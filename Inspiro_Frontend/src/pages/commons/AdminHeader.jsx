import React from "react"
import { HiOutlineHome } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { BiLogoBlogger } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";



export const AdminHeader  = () => {
    const location = useLocation();

    return (
        <>
        <hr />
             <ul className="d-flex justify-content-evenly">
                <li className="nav-item">
                    <Link to="/" className={`btn-primary btn-sm ${location.pathname == '/'? 'active':"default"}`}>
                        <HiOutlineHome />
                       <span className="d-inline-block mt-2 ms-2">
                         Home
                        </span> 
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className={`btn-primary btn-sm ${location.pathname == '/users'? 'active':"default"}`}>
                        <FaUserFriends/>
                       <span className="d-inline-block mt-2 ms-2">
                         User Management
                        </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/blogs" className={`btn-primary btn-sm ${location.pathname == '/blogs'? 'active':"default"}`}>
                        <BiLogoBlogger />
                       <span className="d-inline-block mt-2 ms-2">
                          Blog Management
                        </span>
                    </Link>
                </li>
             </ul>
        </>
    )
}



