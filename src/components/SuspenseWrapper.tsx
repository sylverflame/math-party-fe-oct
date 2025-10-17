import { Suspense } from "react";

type SuspenseWrapperProps = {
  children?: React.ReactNode;
  component?: React.ComponentType<any>;
};

const SuspenseWrapper = ({ children, component: Component }: SuspenseWrapperProps): React.ReactNode => {
  const content = children ?? (Component ? <Component /> : null);
  return <Suspense fallback={"Loading.."}>{content}</Suspense>;
};

export default SuspenseWrapper;
