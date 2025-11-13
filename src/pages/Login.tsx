import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { useForm, type FieldValues, type Path, type RegisterOptions, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router";

type LoginForm = {
  username: string;
  password: string;
};

// TODO: Study this - good generics example - probably?
type ValidationSchema<T extends FieldValues> = {
  [K in Path<T>]?: RegisterOptions<T, K>;
};

const validations: ValidationSchema<LoginForm> = {
  username: {
    required: "Please enter your username",
    minLength: {
      value: 3,
      message: "Minimum 3 characters needed",
    },
    maxLength: {
      value: 12,
      message: "Maximum 10 characters allowed",
    },
  },
  password: {
    required: "Please enter the password",
  },
};

 const Login = () => {
  const {
    user: { userId },
    login,
  } = useUser();

  if (userId) {
    return <Navigate to="app/home" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onLoginSubmit: SubmitHandler<LoginForm> = ({ username }) => {
    // TODO: Validate user input values using zod - currently handled using react-hook-form

    // TODO: Authenticate user

    // After authentication
    const userObj = { userId: username };
    login(userObj);
  };

  const onSubmitError: SubmitErrorHandler<LoginForm> = (errors) => {
    console.log(errors);
  };
  return (
    <div className="login-page h-[100%] flex flex-col items-center justify-center p-6 w-full">
      <Logo />
      <form className="login-form mt-2 w-[50%] min-w-[300px]" onSubmit={handleSubmit(onLoginSubmit, onSubmitError)}>
        <Input placeholder="Username" className="w-full" {...register("username", validations.username)} aria-invalid={errors.username ? "true" : "false"} />
        {errors.username && <div className="text-[10px] text-red-600 mt-1 w-full">{errors.username.message}</div>}
        <Input placeholder="Password" type="password" className="mt-2" {...register("password", validations.password)} aria-invalid={errors.password ? "true" : "false"} />
        {errors.password && <div className="text-[10px] text-red-600 mt-1 w-full">{errors.password.message}</div>}
        <Button type={"submit"} className="mt-2 ">
          {"Login"}
        </Button>
      </form>
      <hr className="w-[100%] my-5" />
      <Button variant="outline" className="flex items-center gap-2">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
        <span>{"Sign in with Google"}</span>
      </Button>
    </div>
  );
};

export default Login;
