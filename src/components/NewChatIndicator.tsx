import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";

interface INewChatIndicator {
  className?: string;
}

const NewChatIndicator = ({ className }: INewChatIndicator) => {
  const { showNewChatIndicator } = useChat();

  return <>{showNewChatIndicator && <div className={cn("size-3 bg-green-600 dark:bg-green-400 rounded-4xl shadow-lg fade-in", className)} />}</>;
};

export default NewChatIndicator;
