import React from 'react';
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center mr-2 shrink-0">
        <img src="/logo/TLUSportLogo.svg" alt="logo" className='object-cover w-full h-full rounded-full' />
      </div>
      <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
