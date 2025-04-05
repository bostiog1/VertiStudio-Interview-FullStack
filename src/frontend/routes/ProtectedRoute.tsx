import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import { AuthLoader } from "../components/AuthLoader";
import { ProtectedRouteProps } from "../types";

export const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount

    const checkAuth = async () => {
      try {
        const authenticated = await AuthService.isAuthenticated();
        if (isMounted) setIsAuthenticated(authenticated);
      } catch (error) {
        if (isMounted) setIsAuthenticated(false);
      }
    };

    // Add slight delay to prevent flash on fast networks
    const timer = setTimeout(checkAuth, 600);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [location]);

  if (isAuthenticated === null) {
    return <AuthLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};
