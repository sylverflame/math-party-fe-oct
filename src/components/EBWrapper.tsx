import { ErrorBoundary } from "react-error-boundary";

interface IEBWrapper {
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

const EBWrapper = ({ component: Component, children }: IEBWrapper) => {
  const content = children ?? (Component ? <Component /> : null);
  if (!content) {
    return null;
  }
  return <ErrorBoundary fallback={<div>Something went wrong</div>}>{content}</ErrorBoundary>;
};

export default EBWrapper;
