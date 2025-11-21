import { Suspense } from "react";
import { Spinner } from "./ui/spinner";

type SuspenseWrapperProps = {
  children?: React.ReactNode;
  component?: React.ComponentType<any>;
};

const SuspenseWrapper = ({ children, component: Component }: SuspenseWrapperProps): React.ReactNode => {
  const content = children ?? (Component ? <Component /> : null);
  return <Suspense fallback={<Spinner className="text-foreground size-10"/>}>{content}</Suspense>;
};

export default SuspenseWrapper;
