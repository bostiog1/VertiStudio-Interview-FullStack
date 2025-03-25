import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Delete authToken cookie
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Using navigate for SPA navigation
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md cursor-pointer hover:bg-red-700 transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;
