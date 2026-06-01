import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-100 inset-0 flex items-center justify-center h-screen backdrop-blur-sm transition-opacity bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Wrapper ngoài: không overflow, để nút X không bị clip */}
      <div className="w-full max-w-lg mx-4 sm:mx-0 relative">
        {/* Nút X: mobile nằm trong (top-3 right-3), desktop nhô ra ngoài */}
        <div
          className="absolute top-3 right-3 sm:top-0 sm:right-0 sm:translate-x-1/2 sm:-translate-y-1/2 z-10 text-white bg-black cursor-pointer ring-1 ring-offset-2 ring-black rounded-full hover:bg-gray-900 hover:scale-105 transition-colors duration-300 p-1"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>

        {/* Content scroll bên trong */}
        <div className="bg-white rounded-lg p-5 sm:p-6 space-y-2 max-h-[90vh] overflow-y-auto">
          {activeTab !== "forgot" && activeTab !== "reset" && (
            <>
              <h2 className="text-2xl font-bold text-red-600 uppercase bg-linear-to-r from-gray-100 to-blue-100 px-3 py-1 rounded-md inline-block ">
                TLU<span className="text-blue-500 text-lg ">Sport</span>
              </h2>
              <h2 className="text-2xl sm:text-4xl font-semibold font-sans">
                Đăng nhập để bắt đầu mua sắm
              </h2>
              <div className="space-y-2">
                <p className="font-medium text-[12px]">
                  Trải nghiệm mua sắm nhanh hơn và cá nhân hóa hơn
                </p>
                <img
                  src="/banner/login.jpg"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-900 font-bold text-[12px]">
                Đăng nhập hoặc đăng ký (miễn phí)
              </p>
            </>
          )}

          {activeTab === "forgot" && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
                Cấp lại mật khẩu
              </h2>
              <ForgotPasswordForm
                onSuccess={(email) => {
                  setForgotEmail(email);
                  setActiveTab("reset");
                }}
                onBack={() => setActiveTab("login")}
              />
            </div>
          )}

          {activeTab === "reset" && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
                Đặt lại mật khẩu
              </h2>
              <ResetPasswordForm
                email={forgotEmail}
                onSuccess={() => setActiveTab("login")}
                onBack={() => setActiveTab("forgot")}
              />
            </div>
          )}

          {activeTab === "login" && (
            <>
              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={() => {
                    // const rootUrl = "http://localhost:8080";
                    const rootUrl = "http://34.27.4.197:8080";
                    window.location.href = `${rootUrl}/oauth2/authorization/google`;
                  }}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-3 bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 128 128"
                  >
                    <path
                      fill="#fff"
                      d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                    />
                    <path
                      fill="#e33629"
                      d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                    />
                    <path
                      fill="#f8bd00"
                      d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
                    />
                    <path
                      fill="#587dbd"
                      d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
                    />
                    <path
                      fill="#319f43"
                      d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
                    />
                  </svg>
                  <span className="text-gray-700 font-semibold text-sm tracking-wide">
                    Tiếp tục với Google
                  </span>
                </button>
              </div>
              <div className="relative w-full h-px bg-gray-300 mb-4">
                <p className="text-[10px] font-semibold px-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block bg-white">
                  Hoặc
                </p>
              </div>
            </>
          )}

          {activeTab === "login" && <LoginForm onClose={onClose} />}
          {activeTab === "register" && <RegisterForm />}

          <div className="flex justify-between items-center text-[12px] text-blue-800 font-bold">
            {activeTab === "login" ? (
              <button
                type="button"
                className="cursor-pointer hover-underline-animation after:bg-blue-800"
                onClick={() => handleChangeTab("register")}
              >
                Đăng ký tài khoản mới
              </button>
            ) : activeTab === "register" ? (
              <button
                type="button"
                className="cursor-pointer hover-underline-animation after:bg-blue-800"
                onClick={() => handleChangeTab("login")}
              >
                Đăng nhập
              </button>
            ) : null}
            {(activeTab === "login" || activeTab === "register") && (
              <button
                type="button"
                className="cursor-pointer hover-underline-animation after:bg-blue-800"
                onClick={() => handleChangeTab("forgot")}
              >
                Quên mật khẩu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
