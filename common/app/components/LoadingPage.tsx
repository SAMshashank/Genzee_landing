import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 relative">
      {/* Full-screen backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        {/* 3D rotating spinner */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-lg spinner animate-rotate transform-gpu perspective-1000">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rotate-45 transform">
              <div className="absolute inset-0 bg-white opacity-20 rotate-45"></div>
            </div>
          </div>
          <div className="absolute top-20 text-white text-xl">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
