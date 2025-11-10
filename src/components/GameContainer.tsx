interface IGameContainer {
  children: React.ReactNode;
  className?: string;
}

const GameContainer = ({ children, className }: IGameContainer) => {
  return <div className={`game-container p-6 bg-card w-full flex justify-center items-center gap-4 min-h-1/2 ${className ?? ""}`}>{children}</div>;
};

export default GameContainer;
