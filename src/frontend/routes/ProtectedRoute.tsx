import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../service/AuthService";

interface ProtectedRouteProps {
  children?: React.ReactNode; // To support wrapping child routes
  redirectPath?: string;
}

export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start as null to indicate loading
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, [location]); // Re-run the check on route changes

  if (isAuthenticated === null) {
    // You can render a loading indicator here if you want
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children; // Render child routes if available, otherwise Outlet
};

// import { Navigate, Outlet } from "react-router-dom";

// interface ProtectedRouteProps {
//   isAuthenticated: boolean;
//   redirectPath?: string;
// }

// export const ProtectedRoute = ({
//   isAuthenticated,
//   redirectPath = "/login",
// }: ProtectedRouteProps) => {
//   if (!isAuthenticated) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet />; // Render child routes
// };
