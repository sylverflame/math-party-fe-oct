import { postData } from "@/api/methods";
import { API_URLS } from "@/api/urls";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useSpinner } from "@/contexts/GlobalSpinnerContext";
import { useUser } from "@/contexts/UserContext";
import { oAuthLoginResponseSchema } from "@/schemas";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const LoginOAuth = () => {
  const {
    user: { userId },
    login,
  } = useUser();
  const { showGlobalSpinner, hideGlobalSpinner } = useSpinner();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const onTokenPresent = async () => {
      showGlobalSpinner();
      try {
        const response = await postData(API_URLS.LOGIN, { token });
        const { isValidUser, user, accessToken } = oAuthLoginResponseSchema.parse(response.data);
        if (isValidUser) {
          sessionStorage.setItem("token", accessToken!);
          login(user);
          toast.success("Login successful!");
        }
      } catch (error) {
        console.error("Login Error -", error);
        toast.error("Login failed!");
      }
      hideGlobalSpinner();
    };
    if (token) {
      onTokenPresent();
    }
  }, []);

  if (userId) {
    return <Navigate to="app/home" />;
  }

  const onLoginWithGoogle = () => {
    window.location.href = API_URLS.GOOGLE_AUTH;
  };

  return (
    <div className="login-page h-[100%] flex flex-col items-center justify-center p-6 w-full">
      <Logo />
      <Button variant="outline" className="flex items-center gap-2 mt-10" onClick={onLoginWithGoogle}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
        <span>{"Sign in with Google"}</span>
      </Button>
    </div>
  );
};

export default LoginOAuth;
