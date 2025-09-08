import React, { useState } from "react";
import HomeImage from "../assets/home.jpg"; 
const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: LoginFormEvent): void => {
    e.preventDefault();
    console.log("username:", username, "Password:", password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image (8/12) */}
       <div
        className="hidden md:flex w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(/home.jpg)`,
        }}
      ></div>

      {/* Right side - Form (4/12) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center px-6 py-12 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
  Welcome to the Teacher Transfer System
</h2>

<h5 className="mt-4 text-center text-lg font-medium text-gray-200 sm:text-xl">
  Sign in to your account
</h5>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="username"
                  name="username"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
