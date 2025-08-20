import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { alertError, alertSuccess } from "../../lib/alert";
import { userRegister } from "../../lib/api/publicApi";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassowrd) {
      await alertError("confirm password salah atau tidak sama");
      return;
    }

    const response = await userRegister({
      first_name,
      last_name,
      username,
      password,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess(responseBody.message);
      await navigate("/login");
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
          Sign up for your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-2">
            <div className="first_name flex flex-col mb-4">
              <label
                htmlFor="first_name"
                className="mb-2 pl-2 text-sm text-gray-700 dark:text-gray-300"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-400 dark:border-gray-600 p-2 rounded-md 
                         bg-white dark:bg-gray-800 
                         text-gray-700 dark:text-gray-200
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoComplete="off"
              />
            </div>

            <div className="last_name flex flex-col mb-4">
              <label
                htmlFor="last_name"
                className="mb-2 pl-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-400 dark:border-gray-600 p-2 rounded-md 
                         bg-white dark:bg-gray-800 
                         text-gray-700 dark:text-gray-200
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoComplete="off"
              />
            </div>
          </div>

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
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md 
                       bg-white dark:bg-gray-800 
                       text-gray-700 dark:text-gray-200
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-1 focus:ring-blue-600"
              autoComplete="off"
            />
          </div>

          {/* Confirm Password */}
          <div className="confirm_password flex flex-col mb-4">
            <label
              htmlFor="confirm_password"
              className="mb-2 pl-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={confirmPassowrd}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </button>
          </div>

          {/* Link to login */}
          <p className="text-sm pt-2 pl-2 text-gray-700 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
