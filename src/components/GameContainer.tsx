interface IGameContainer {
  children: React.ReactNode;
  className?: string;
}

const GameContainer = ({ children, className }: IGameContainer) => {
  return <div className={`game-container bg-gradient relative p-4 bg-card w-[100vw] md:w-full flex justify-center gap-4 min-h-1/2 h-full overflow-hidden ${className ?? ""}`}>{children}</div>;
};

export default GameContainer;
