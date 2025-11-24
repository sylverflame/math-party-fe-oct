import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router";

type ProtectRouteProps = {
  element: React.ReactNode;
};

const ProtectedRoute = ({ element }: ProtectRouteProps) => {
  const { isUserLoggedIn } = useUser();

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;
