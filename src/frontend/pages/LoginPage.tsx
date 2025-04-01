import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validationSchema";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import Endpoints from "../utils/Endpoints";

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // For displaying error/success messages

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    // 'data' will contain the form values
    try {
      // Use AuthService instead of direct axios call
      await AuthService.login({
        email: data.email, // Get email from form data
        password: data.password, // Get password from form data
      });

      console.log("Login successful!");
      navigate(Endpoints.dashboard, { replace: true });
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 mx-4">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Login
        </h2>
        {message && (
          <div className="mt-4 mb-4 rounded-md bg-red-200 dark:bg-red-600 p-3 text-center text-red-600 dark:text-white">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-blue-500"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-blue-500"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 dark:bg-blue-700 cursor-pointer text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
