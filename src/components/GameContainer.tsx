interface IGameContainer {
  children: React.ReactNode;
  className?: string;
}

const GameContainer = ({ children, className }: IGameContainer) => {
  return <div className={`game-container p-4 bg-card w-full flex justify-center gap-4 min-h-1/2 h-full ${className ?? ""}`}>{children}</div>;
};

export default GameContainer;
