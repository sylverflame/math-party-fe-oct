import { useSpinner } from "@/contexts/GlobalSpinnerContext";
import { Spinner } from "./ui/spinner";

const GlobalSpinner = () => {
  const { isShown } = useSpinner();
  if (!isShown) {
    return null;
  }

  if (isShown) {
    return (
      <div className="absolute left-0 top-0 flex justify-center items-center w-[100vw] h-[100vh] bg-background/70 backdrop-blur-sm text-foreground fade-in">
        <Spinner className="size-10" />
      </div>
    );
  }
};

export default GlobalSpinner;
