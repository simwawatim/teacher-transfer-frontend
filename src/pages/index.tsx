import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/auth/auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
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
      const data = await login(username, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      const userRole = data.user?.role;
      if (userRole === "admin" || userRole === "headteacher") {
        router.push("/home");
      } else {
        router.push("/transfer");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image */}
      <div
        className="hidden md:flex w-2/3 bg-cover bg-center"
        style={{ backgroundImage: `url(/home.jpg)` }}
      ></div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-900 relative">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Teacher Transfer System
            </h2>
            <p className="mt-2 text-gray-300">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 block w-full rounded-lg bg-gray-800 px-4 py-2 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition sm:text-sm"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg bg-gray-800 px-4 py-2 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-300 text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-[0.98] focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
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
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
