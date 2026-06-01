import useAuthStore from '@/store/useAuthStore';
import React, { useState } from 'react'

const VerifyModal = ({ setIsVerifyModalOpen, email }) => {
  const [verifyData, setVerifyData] = useState({
    email: email,
    code: "",
  });
  const { verify } = useAuthStore();
  const handleChange = (e) => {
    setVerifyData(
      { ...verifyData, [e.target.name]: e.target.value },
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verify(verifyData);
      setIsVerifyModalOpen(false);
    } catch (error) {
      console.error("Lỗi xác thực:", error);
    }
  }
  return (
    <div className="fixed z-110 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
        <h3 className="text-xl font-bold mb-3 text-neutral-800">
          Xác thực tài khoản
        </h3>
        <p className="text-sm text-neutral-500 mb-5">
          Vui lòng nhập mã xác nhận (OTP) đã được gửi đến
          email của bạn.
        </p>
        <input
          value={verifyData.code}
          name='code'
          onChange={handleChange}
          type="text"
          placeholder="Nhập mã OTP..."
          className="w-full border border-neutral-300 rounded-xl py-3 px-4 mb-4 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
        />
        <button
          type="button"
          className="w-full bg-neutral-800 text-white py-2.5 rounded-xl hover:bg-neutral-700 transition-colors font-bold cursor-pointer"
          onClick={handleSubmit}
        >
          Xác nhận
        </button>
        <button
          type="button"
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-800 cursor-pointer"
          onClick={() => setIsVerifyModalOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default VerifyModal