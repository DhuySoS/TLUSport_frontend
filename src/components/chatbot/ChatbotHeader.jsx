import React from 'react';
import { Bot, X } from "lucide-react";

const ChatbotHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-black text-white rounded-t-2xl">
      <div className="flex items-center gap-2">
        {/* <Bot size={24} /> */}
        <div className='bg-white w-8 h-8 rounded-full'>
          <img src="/logo/TLUSportLogo.svg" alt="logo" className='object-cover w-full h-full rounded-full' />
        </div>
        <span className="font-semibold text-lg">Trợ lý AI TLUSport</span>
      </div>
      <button onClick={onClose} className="hover:text-neutral-300 transition-colors">
        <X size={24} className='cursor-pointer' />
      </button>
    </div>
  );
};

export default ChatbotHeader;
