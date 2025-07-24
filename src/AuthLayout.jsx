import React, { useState, useEffect } from 'react';
import logo from '/logo.png'; // Make sure you have a logo file in src/assets

const AuthLayout = ({ children, image }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className={`w-full max-w-6xl bg-white mx-auto rounded-xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Left Side - Image Panel */}
        <div className="h-96 lg:h-auto w-full bg-no-repeat bg-cover bg-center relative hidden lg:block">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${isLoaded ? 'scale-100' : 'scale-110'}`}
            style={{ backgroundImage: `url('./Dance.png')` }}
          />
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-50 p-8 sm:p-12 text-white flex flex-col">
            <img className="w-32 sm:w-40" src={logo} alt="EventPadi Logo" />
            <div className="mt-auto">
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                Discover Events. Find Your People.
              </h1>
              <p className="text-lg xl:text-xl mt-4 max-w-md">
                Connect with others attending public events in your city.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form Panel */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;