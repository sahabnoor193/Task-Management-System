import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';

function SignupForm({ onViewChange }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-100">
      <button
        onClick={() => onViewChange('home')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-gray-50"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-gray-50"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-gray-50"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-gray-50"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => onViewChange('login')}
          className="text-gray-900 hover:text-gray-700 font-medium"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

export default SignupForm;