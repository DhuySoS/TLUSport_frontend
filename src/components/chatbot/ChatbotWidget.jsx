import React, { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import aiServices from "@/services/aiServices";
import ChatbotHeader from "./ChatbotHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import useAuthStore from "@/store/useAuthStore";

const ChatbotWidget = () => {
  const { user, setIsOpenLogin } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(
    () => sessionStorage.getItem("chatbot_session_id") || null,
  );
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatbot_messages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "Xin chào! Tôi là trợ lý AI của TLUSport. Tôi có thể giúp gì cho bạn?",
            products: [],
          },
        ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    sessionStorage.setItem("chatbot_messages", JSON.stringify(messages));
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (inputText) => {
    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsGenerating(true);

    // Tạo sẵn 1 tin nhắn trống của Bot để chuẩn bị điền nội dung vào
    setMessages((prev) => [...prev, { sender: "bot", text: "", products: [] }]);

    try {
      const response = await aiServices.chatWithBot(
        inputText,
        sessionId,
        user?.userId,
      );

      if (!response.ok) {
        throw new Error("Lỗi kết nối AI Server");
      }

      setIsLoading(false); // Dừng loading indicator vì chữ bắt đầu nhảy

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let fullText = "";
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });

          const blocks = buffer.split("\n\n");
          // Giữ lại phần tử cuối cùng (có thể là chuỗi bị cắt dở) trong buffer
          buffer = blocks.pop() || "";

          for (const block of blocks) {
            if (block.startsWith("data: ")) {
              try {
                const data = JSON.parse(block.replace("data: ", ""));

                // Lưu lại sessionId nếu có và chưa được set
                if (data.session_id && data.session_id !== sessionId) {
                  setSessionId(data.session_id);
                  sessionStorage.setItem("chatbot_session_id", data.session_id);
                }

                if (data.type === "chunk") {
                  if (data.content) fullText += data.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      ...newMessages[newMessages.length - 1],
                      text: fullText,
                    };
                    return newMessages;
                  });
                } else if (data.type === "done") {
                  if (data.content) fullText = data.content; // text hoàn chỉnh
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      ...newMessages[newMessages.length - 1],
                      text: fullText,
                      products: data.products || [],
                    };
                    return newMessages;
                  });
                } else if (data.type === "error") {
                  fullText += `\n\n❌ [Lỗi]: ${data.content}`;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      ...newMessages[newMessages.length - 1],
                      text: fullText,
                    };
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Lỗi parse SSE JSON:", e, block);
              }
            }
          }
        }
      }
      setIsGenerating(false);
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      setIsGenerating(false);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.sender === "bot" && lastMsg.text === "") {
          lastMsg.text = "Xin lỗi, không thể kết nối đến máy chủ AI lúc này.";
        } else if (lastMsg.sender !== "bot") {
          newMessages.push({
            sender: "bot",
            text: "Xin lỗi, đã có lỗi kết nối xảy ra.",
          });
        }
        return newMessages;
      });
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 p-4 bg-black text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 bg-white border border-neutral-200 shadow-2xl flex flex-col transition-all duration-300
          inset-x-0 bottom-0 rounded-t-2xl rounded-b-none h-[65vh]
          sm:inset-x-auto sm:bottom-8 sm:right-8 sm:w-96 sm:h-150 sm:max-h-[80vh] sm:rounded-2xl sm:origin-bottom-right ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 pointer-events-none"
          }`}
      >
        <ChatbotHeader onClose={() => setIsOpen(false)} />

        {/* Message Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-neutral-50 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} />
          ))}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSend} isLoading={isLoading || isGenerating} />
      </div>
    </>
  );
};

export default ChatbotWidget;
