"use client";

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import DarkModeButton from './DarkModeButton';

export default function HeaderNav() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between min-h-16 px-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                        />
                    </div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Task Manager
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {status === 'authenticated' && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                                    <Image
                                        src={session.user?.image || "/default-avatar.png"}
                                        alt="User Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 py-2 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {session.user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {status === 'unauthenticated' && (
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="px-6 py-2.5 rounded-xl text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    )}
                    <DarkModeButton />
                </div>
            </div>
        </header>
    );
}
