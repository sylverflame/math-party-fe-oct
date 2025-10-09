import { Suspense } from "react";

type SuspenseWrapperProps = {
  children?: React.ReactNode;
  component?: React.ReactNode;
};

const SuspenseWrapper = ({ children, component }: SuspenseWrapperProps) => {
  return <Suspense fallback={"Loading.."}>{children || component}</Suspense>;
};

export default SuspenseWrapper;
