import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  text: string;
  from: "bot" | "user";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! How can I help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input.trim(), from: "user" };
    setMessages((prev) => [...prev, newMessage]);

    // Optional: Add bot reply here
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Thanks for your message!", from: "bot" }]);
    }, 800);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[320px] h-[450px] bg-white dark:bg-pilot-900 shadow-lg rounded-lg flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
            <span className="font-semibold">Chat Support</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded px-3 py-2 max-w-[80%] ${
                  msg.from === "bot"
                    ? "bg-gray-200 text-gray-900 self-start"
                    : "bg-blue-600 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-pilot-800"
            />
            <Button onClick={handleSend} size="sm">
              Send
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-40">
        <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full px-4 py-2 shadow-lg">
          Chat
        </Button>
      </div>
    </>
  );
};

export default Chatbot;
