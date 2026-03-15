import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../lib/api/publicApi";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Cek token ketika komponen pertama kali dirender
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          // token masih berlaku -> langsung ke dashboard
          navigate("/dashboard");
        } else {
          // token kadaluwarsa -> hapus
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token invalid:", error);
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userLogin({ username, password });
      const responseBody = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", responseBody.token);
        toast.success("Login berhasil");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(responseBody.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-3xl w-full mx-auto max-w-md glass-card transition-all duration-300"
    >
      <Toaster />
      <div className="mb-7">
        <h1 className="text-3xl text-center font-bold text-gradient pb-1">
          Money Tracking
        </h1>
        <p className="mt-2 text-center mb-8 text-gray-600 dark:text-gray-400 font-medium">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="username flex flex-col">
            <label
              htmlFor="username"
              className="mb-1.5 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                       bg-gray-50/50 dark:bg-gray-800/50 
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                       transition-all duration-200"
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="password flex flex-col">
            <label
              htmlFor="password"
              className="mb-1.5 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                       bg-gray-50/50 dark:bg-gray-800/50 
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                       transition-all duration-200"
              autoComplete="off"
            />
          </div>

          {/* Button */}
          <div className="pt-2">
            <button
              disabled={loading}
              className="w-full bg-gradient-brand text-white font-medium py-3 rounded-xl 
                       shadow-lg shadow-[#5044E5]/30 hover:shadow-[#5044E5]/50
                       hover:-translate-y-0.5 active:translate-y-0.5 
                       transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Link */}
          <p className="text-center text-sm pt-4 text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-medium text-[#5044E5] dark:text-[#4d8cea] hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
