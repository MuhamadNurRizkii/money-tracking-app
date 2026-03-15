import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { alertError, alertSuccess } from "../../lib/alert";
import { userRegister } from "../../lib/api/publicApi";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassowrd) {
      toast.error("confirm password salah atau tidak sama");
      setLoading(false);
      return;
    }

    try {
      const response = await userRegister({
        first_name,
        last_name,
        username,
        password,
      });
      const responseBody = await response.json();

      if (response.status === 200) {
        toast.success(responseBody.message);
        setTimeout(() => {
          navigate("/login");
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
          Sign up for your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="first_name flex flex-col">
              <label
                htmlFor="first_name"
                className="mb-1.5 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                         bg-gray-50/50 dark:bg-gray-800/50 
                         text-gray-800 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                         transition-all duration-200"
                autoComplete="off"
              />
            </div>

            <div className="last_name flex flex-col">
              <label
                htmlFor="last_name"
                className="mb-1.5 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                         bg-gray-50/50 dark:bg-gray-800/50 
                         text-gray-800 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                         transition-all duration-200"
                autoComplete="off"
              />
            </div>
          </div>

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
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                       bg-gray-50/50 dark:bg-gray-800/50 
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                       transition-all duration-200"
              autoComplete="off"
            />
          </div>

          {/* Confirm Password */}
          <div className="confirm_password flex flex-col">
            <label
              htmlFor="confirm_password"
              className="mb-1.5 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={confirmPassowrd}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className="pt-3 mb-4">
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
                "Sign Up"
              )}
            </button>
          </div>

          {/* Link to login */}
          <p className="text-center text-sm pt-2 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-[#5044E5] dark:text-[#4d8cea] hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
