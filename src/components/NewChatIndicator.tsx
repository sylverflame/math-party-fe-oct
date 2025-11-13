import { useChat } from "@/contexts/ChatContext";

const NewChatIndicator = () => {
  const { showNewChatIndicator } = useChat();

  return <>{showNewChatIndicator && <div className="size-3 bg-green-600 dark:bg-green-400 rounded-4xl absolute -right-1 -top-1 shadow-lg fade-in" />}</>;
};

export default NewChatIndicator