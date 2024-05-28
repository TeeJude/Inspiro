import React from "react"
import logo from '../assets/logo/image1.jpg'
import auth from "../services/auth/authService"
import {  useSelector } from "react-redux";
import { AdminNavbar } from "./commons/AdminNavbar";
import { UserNavbar } from "./commons/UserNavbar";
const ADMIN = 'Admin'

export const Navbar  = () => {
    
    const user = auth.getCurrentUser()
    const userData = useSelector(state => state.login.data); // Accessing data from the login slice
    return (
        <>
            {
                (user || userData) && (user?.user_type === ADMIN || userData?.user_type === ADMIN)  ? 
               <AdminNavbar/>
               :
               <UserNavbar/>
            }
        </>
    )
}

