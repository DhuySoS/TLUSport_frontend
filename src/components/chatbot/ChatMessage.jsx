import React from 'react';
import { Bot } from "lucide-react";
import ChatProductCard from "./ChatProductCard";

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full border border-neutral-200  flex items-center justify-center mr-2 shrink-0">
          <img src="/logo/TLUSportLogo.svg" alt="logo" className='object-cover w-full h-full rounded-full' />
        </div>
      )}

      <div className="flex flex-col gap-2 max-w-[80%]">
        <div
          className={`px-4 py-2 rounded-2xl ${isUser
            ? "bg-black text-white rounded-tr-sm"
            : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-sm shadow-sm"
            }`}
        >
          <p className="text-sm leading-relaxed">{msg.text}</p>
        </div>

        {/* Product Recommendations */}
        {msg.products && msg.products.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-300 max-w-[300px]">
            {msg.products.map((product) => (
              <div key={product.id} className="w-[140px] shrink-0 snap-start">
                <ChatProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
