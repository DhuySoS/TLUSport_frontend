import React, { useState } from 'react';
import VerifyModal from './VerifyModal';
import useAuthStore from '@/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/authSchema';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { register: registerUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setRegisteredEmail(data.email);
      setIsVerifyModalOpen(true);
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Đăng ký tài khoản thất bại", { position: "top-right" });
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                id="firstName"
                placeholder=""
                {...register("firstName")}
                className={`w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
                  errors.firstName ? "border-red-500 focus:border-red-500 hover:border-red-500" : ""
                }`}
              />
              <label
                htmlFor="firstName"
                className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
                peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
                peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
                peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
                peer-not-placeholder-shown:bg-white"
              >
                Họ
              </label>
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 ml-4">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                id="lastName"
                placeholder=""
                {...register("lastName")}
                className={`w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
                  errors.lastName ? "border-red-500 focus:border-red-500 hover:border-red-500" : ""
                }`}
              />
              <label
                htmlFor="lastName"
                className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
                peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
                peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
                peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
                peer-not-placeholder-shown:bg-white"
              >
                Tên
              </label>
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 ml-4">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="phoneNumber"
              placeholder=""
              {...register("phoneNumber")}
              className={`w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
                errors.phoneNumber ? "border-red-500 focus:border-red-500 hover:border-red-500" : ""
              }`}
            />
            <label
              htmlFor="phoneNumber"
              className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
              peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
              peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
              peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
              peer-not-placeholder-shown:bg-white"
            >
              Số điện thoại
            </label>
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="email"
              autoComplete="username"
              placeholder=""
              {...register("email")}
              className={`w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
                errors.email ? "border-red-500 focus:border-red-500 hover:border-red-500" : ""
              }`}
            />
            <label
              htmlFor="email"
              className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
              peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
              peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
              peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
              peer-not-placeholder-shown:bg-white"
            >
              Email
            </label>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              placeholder=""
              {...register("password")}
              className={`w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
                errors.password ? "border-red-500 focus:border-red-500 hover:border-red-500" : ""
              }`}
            />
            <label
              htmlFor="password"
              className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
              peer-focus:bg-white peer-focus:px-2 peer-focus:text-[12px]
              peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
              peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
              peer-not-placeholder-shown:bg-white"
            >
              Mật khẩu
            </label>
            <span
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={handleShowPassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                {showPassword ? (
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                    <path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" />
                  </g>
                ) : (
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
                  </g>
                )}
              </svg>
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-800 cursor-pointer text-white py-2 rounded-full hover:bg-neutral-900 transition-colors duration-300 font-bold"
        >
          Đăng ký tài khoản
        </button>
      </form>

      {/* Verify Modal */}
      {isVerifyModalOpen && (
        <VerifyModal setIsVerifyModalOpen={setIsVerifyModalOpen} email={registeredEmail} />
      )}
    </>
  );
};

export default RegisterForm;