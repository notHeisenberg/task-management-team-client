import { useState } from "react";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import "./Auth.css";
import logo from "../../assets/logo.svg"
import { NavLink } from "react-router-dom";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuth = () => {
        setIsSignUp((prev) => !prev);
    };

    return (
        <div className="bg-gradient-to-r from-gray-200 to-blue-200 flex items-center justify-center flex-col h-screen">
            <div className={`auth-container bg-white rounded-lg shadow-lg p-8 max-w-md relative ${isSignUp ? "active" : ""}`}>
                {/* Render Login or SignUp component based on state */}
                <div className={`form-auth-container h-full w-1/2 ${isSignUp ? 'sign-up' : 'sign-in'}`}>
                    {isSignUp ? <SignUp /> : <Login />}
                </div>
                {/* Toggle auth-container */}
                <div className="toggle-auth-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <NavLink to="/">
                                <img src={logo} alt="nature" className="w-24 h-24 object-cover rounded-lg" />s
                            </NavLink>
                            <h1 className="text-[2rem] font-bold">Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className=" bg-transparent text-white text-xs py-2 px-11 border rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer" id="login" onClick={toggleAuth}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <NavLink to="/">
                                <img src={logo} alt="nature" className="w-24 h-24 object-cover rounded-lg" />s
                            </NavLink>
                            <h1 className="text-[2rem] font-bold">Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className=" bg-transparent text-white text-xs py-2 px-11 border rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer" id="register" onClick={toggleAuth}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;