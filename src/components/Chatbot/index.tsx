import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage"; // your message renderer
import { useAuth } from "@/contexts/AuthContext"; // optional if you need user data

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <ChatMessage message="Hey! How can I help you today?" from="bot" />
            {/* Render more messages dynamically here */}
          </div>
          <div className="p-3 border-t border-gray-300 dark:border-gray-700">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-pilot-800"
            />
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
