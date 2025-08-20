import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../lib/api/publicApi";
import { alertError, alertModal } from "../../lib/alert";
import { jwtDecode } from "jwt-decode";

export default function Login() {
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

    const response = await userLogin({ username, password });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      localStorage.setItem("token", responseBody.token);
      await alertModal("Login berhasil");
      navigate("/dashboard");
    } else {
      await alertError(responseBody.error);
    }
  }

  return (
    <div className="p-6 rounded-2xl shadow-lg dark:shadow-blue-500/10 dark:border dark:border-gray-700 w-full mx-auto max-w-md bg-white dark:bg-gray-900 transition">
      <div className="mb-7">
        <h1 className="text-2xl text-center font-bold text-blue-600">
          Money Tracking
        </h1>
        <p className="mt-2 text-center mb-8 text-gray-700 dark:text-gray-300">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="username flex flex-col mb-4">
            <label
              htmlFor="username"
              className="mb-2 pl-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md 
                       bg-white dark:bg-gray-800 
                       text-gray-700 dark:text-gray-200
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-1 focus:ring-blue-600"
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="password flex flex-col mb-4">
            <label
              htmlFor="password"
              className="mb-2 pl-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md 
                       bg-white dark:bg-gray-800 
                       text-gray-700 dark:text-gray-200
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-1 focus:ring-blue-600"
              autoComplete="off"
            />
          </div>

          {/* Button */}
          <div className="mb-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 dark:hover:bg-blue-400 transition">
              Sign In
            </button>
          </div>

          {/* Link */}
          <p className="text-sm pt-2 pl-2 text-gray-700 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
