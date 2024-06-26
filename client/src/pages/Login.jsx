import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../comps/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../comps/EyeSlashFilledIcon";
import { loginUser } from "../utils/API";
import {useState} from "react";
import Auth from "../utils/auth";
import {useNavigate} from "react-router-dom";


export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userData);
            const response = await loginUser(userData);
            console.log(response);
            const data = await response.json();
            console.log(data);
            Auth.login(data.token)
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <div className="max-w-xs">
                {/* Email Address Input */}
                <div className="mb-4 relative">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name='email'
                        value = {userData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        placeholder="Enter your email address"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <input
                            id="password"
                            type={isVisible ? "text" : "password"}
                            name='password'
                            value = {userData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 placeholder-gray-400 rounded-md focus:outline-none text-gray-700"
                            placeholder="Enter your password"
                        />
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Sign In Button */}
                <button onClick={handleFormSubmit} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                    Sign In
                </button>

                {/* Sign Up Link */}
                <div className="mt-4 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 underline">
                        Sign up!
                    </a>
                </div>
            </div>
        </div>
    );
}
