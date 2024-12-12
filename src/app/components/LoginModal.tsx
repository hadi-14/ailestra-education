import React, { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [loginMethod, setLoginMethod] = useState('email');
    const [inputValue, setInputValue] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Add your login logic here
        console.log(`Logging in with ${loginMethod}: ${inputValue}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Modal Header */}
                <h2 className="text-2xl font-bold text-center mb-6 text-[#A30000]">
                    Login to Your Account
                </h2>

                {/* Login Method Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 rounded-full p-1 flex">
                        <button
                            className={`px-4 py-2 rounded-full transition-colors ${loginMethod === 'email'
                                ? 'bg-[#16007E] text-white'
                                : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            onClick={() => setLoginMethod('email')}
                        >
                            Email
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full transition-colors ${loginMethod === 'phone'
                                ? 'bg-[#16007E] text-white'
                                : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            onClick={() => setLoginMethod('phone')}
                        >
                            Phone
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type={loginMethod === 'email' ? 'email' : 'tel'}
                        placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A30000]"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A30000]"
                        required
                    />

                    <div className="flex justify-between items-center">
                        <a href="#" className="text-sm text-[#111111] hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#A30000] text-white py-3 rounded-lg hover:bg-[#A30000] transition-colors font-bold"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href={`/StudentPortal/admission`} className="text-[#A30000] font-bold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;