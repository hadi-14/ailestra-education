import React from 'react';
import { BookX, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Main Error Section */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <BookX className="h-24 w-24 text-[#A30000] animate-bounce" />
          </div>
          <h1 className="text-6xl font-bold text-[#16007E]">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Oops! Looks like this page took an unexpected break. Dont worry - there are plenty of other learning opportunities to explore!
          </p>
        </div>

        {/* Suggestion Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Here is what you can do:
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <a 
              href="/"
              className="flex items-center p-4 rounded-lg bg-[#16007E] text-white hover:opacity-90 transition-opacity"
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Return Home</span>
            </a>
            <a 
              href="/courses"
              className="flex items-center p-4 rounded-lg bg-[#177A05] text-white hover:opacity-90 transition-opacity"
            >
              <Search className="h-5 w-5 mr-3" />
              <span>Browse Courses</span>
            </a>
          </div>
        </div>

        {/* Support Section */}
        <div className="text-sm text-gray-600">
          <p>Need help? Contact our support team at</p>
          <a 
            href="mailto:graphode2288@gmail.com" 
            className="text-[#16007E] hover:underline font-medium"
          >
            graphode2288@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}