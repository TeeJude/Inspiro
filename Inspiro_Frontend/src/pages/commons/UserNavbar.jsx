import React from "react"
import logo from '../../assets/logo/image1.jpg'
import auth from "../../services/auth/authService"
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const UserNavbar  = () => {
    const user = auth.getCurrentUser()
    const userData = useSelector(state => state.login.data); // Accessing data from the login slice
    return (
        <nav className="navbar navbar-expand-lg bg-body-white">
            <div className="container-fluid">
            <Link className="navbar-brand mx-auto" to ="/">
                <div className="row justify-content-center">
                        <div className="col-3">
                            <img src={logo} alt="logo" className="logo"/>
                        </div>
                        <div className="col-7">
                            <h3 className="logo-nav-text-1">Standardlife</h3>
                            <p className="logo-nav-text-2">organization</p>
                        </div>
                    </div>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center " id="navbarSupportedContent">
                    
                    <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active text-uppercase" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="#">about us</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="#">contact us</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="/blogs/posts">Posts</Link>
                        </li>
                       
                    </ul>
                   
                   {/* Check if there is logged in user */}
                    {
                    user || userData ?
                    <ul className="navbar-nav ms-auto " role="search">
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {user?.name || userData?.data?.name}
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                        </ul>
                        </li>
                    </ul>
                    :
                    
                    <ul className="navbar-nav" role="search">
                        <li className="nav-item">
                            <Link className="btn btn-default outline-double" aria-current="page" to="/login">Log in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-primary" aria-current="page" to="/register">Sign Up</Link>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

