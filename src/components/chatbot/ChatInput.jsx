import React, { useState, useRef } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Đếm số ký tự thực tế
  const charCount = input.length;

  const handleSend = () => {
    if (!input.trim() || isLoading || charCount > 100) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-neutral-200 rounded-b-2xl">
      <div className="flex items-end gap-2 bg-neutral-100 rounded-2xl px-4 py-2 border border-transparent focus-within:border-black transition-colors relative">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Bạn cần hỗ trợ gì..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-800 placeholder-neutral-500 resize-none py-1 pb-5 max-h-30 scrollbar-none leading-relaxed"
          disabled={isLoading}
          maxLength={100}
          style={{ height: "auto" }}
        />
        <span
          className={`absolute bottom-1 left-5 text-[10px] font-semibold select-none transition-colors duration-200 ${
            charCount >= 100 ? "text-red-500 font-bold" : "text-neutral-400"
          }`}
        >
          {charCount}/100 ký tự
        </span>
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || charCount > 200}
          className="p-2 bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 mb-0.5"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
