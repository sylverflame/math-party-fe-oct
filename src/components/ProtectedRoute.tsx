import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router";

type ProtectRouteProps = {
  element: React.ReactNode;
};

const ProtectedRoute = ({ element }: ProtectRouteProps) => {
  const {
    user: { userId },
  } = useUser();

  if (!userId) {
    return <Navigate to="/" />;
  }
  console.log("Authenticated user -", userId);
  return element;
};

export default ProtectedRoute;
