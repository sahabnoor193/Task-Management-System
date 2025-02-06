import React, { useState } from 'react';
import { ClipboardList, Menu, X } from 'lucide-react';

function Navbar({ onViewChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onViewChange('home')}
          >
            <ClipboardList className="h-7 w-7 text-gray-900" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">TaskFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onViewChange('login')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => onViewChange('signup')}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  onViewChange('login');
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors text-center"
              >
                Log In
              </button>
              <button 
                onClick={() => {
                  onViewChange('signup');
                  setIsMenuOpen(false);
                }}
                className="mx-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;