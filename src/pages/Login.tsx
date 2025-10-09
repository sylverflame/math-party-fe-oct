import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";

export const Login = () => {
  const { user, setUser } = useUser();
  const onClickLogin = () => {
    console.log(user);
  };
  return (
    <div className="login-page h-[100%] flex flex-col items-center justify-center p-2">
      <h1 className="text-5xl">Math Party</h1>
      <div className="login-form mt-2">
        <Input placeholder="Username" />
        <Button className="mt-2 cursor-pointer" onClick={onClickLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};
