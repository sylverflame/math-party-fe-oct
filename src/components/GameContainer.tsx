interface IGameContainer {
  children: React.ReactNode;
  className?: string;
}

const GameContainer = ({ children, className }: IGameContainer) => {
  return <div className={`p-6 bg-card w-full flex justify-center items-center gap-4 ${className}`}>{children}</div>;
};

export default GameContainer;
