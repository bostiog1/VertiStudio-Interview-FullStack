import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validationSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Endpoints from "../utils/Endpoints";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    console.log("Data being posted:", data); // Add this line

    try {
      // Send registration data to the backend
      const response = await axios.post(Endpoints.registerBack, {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`, // Combine first and last name
        phone: data.mobile, // Use 'mobile' field for phone
      });

      if (response.status === 201) {
        console.log("User registered successfully!");
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="m-5 w-full max-w-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">CREATE USER</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a New User Profile
          </p>
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile
              </label>
              <input
                {...register("mobile")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.mobile && (
                <p className="text-sm text-red-600">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Create New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
