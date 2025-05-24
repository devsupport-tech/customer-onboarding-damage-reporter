type ChatMessageProps = {
  message: string;
  from: "bot" | "user";
};

const ChatMessage = ({ message, from }: ChatMessageProps) => {
  const isBot = from === "bot";
  return (
    <div className={`p-2 my-1 rounded ${isBot ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
