import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/auth/auth"; 

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: LoginFormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(username, password); // call API
      console.log("Login success:", data);

      // save token if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      router.push("/home"); // redirect after success
    } catch (err: any) {
      // handle API error well
      if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div
        className="hidden md:flex w-2/3 bg-cover bg-center"
        style={{ backgroundImage: `url(/home.jpg)` }}
      ></div>

      {/* Right side - Form */}
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
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-100"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>

            {/* Show error message */}
            {error && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
