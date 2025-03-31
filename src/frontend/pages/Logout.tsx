// Logout.tsx
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Call the authService logout method
      await AuthService.logout();

      // Navigate to login page
      navigate("/login");

      // Optional: Force a full page reload to ensure all state is cleared
      // window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error (maybe show a toast notification)
    }
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
