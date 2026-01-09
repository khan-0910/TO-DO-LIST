"use client"

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-transparent backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    &copy; {currentYear} Task Manager. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
