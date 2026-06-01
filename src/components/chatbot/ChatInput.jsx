import React, { useState } from 'react';
import { Send } from "lucide-react";

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-neutral-200 rounded-b-2xl">
      <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-2 border border-transparent focus-within:border-black transition-colors">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Bạn cần hỗ trợ gì..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-800 placeholder-neutral-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="p-1.5 bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
