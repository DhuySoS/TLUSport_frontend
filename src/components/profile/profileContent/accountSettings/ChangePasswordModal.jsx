import React, { useState } from "react";
import authServices from "@/services/authServices";
import { toast } from "sonner";

const EMPTY = { currentPassword: "", newPassword: "", confirmationPassword: "" };

/**
 * ChangePasswordModal — modal đổi mật khẩu
 * @param {function} onClose — callback đóng modal
 */
const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState({
    currentPassword: false,
    newPassword: false,
    confirmationPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const toggleShow = (field) =>
    setShowPwd((p) => ({ ...p, [field]: !p[field] }));

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    if (!form.newPassword) errs.newPassword = "Vui lòng nhập mật khẩu mới";
    else if (form.newPassword.length < 6) errs.newPassword = "Mật khẩu mới tối thiểu 6 ký tự";
    if (!form.confirmationPassword) errs.confirmationPassword = "Vui lòng xác nhận mật khẩu";
    else if (form.newPassword !== form.confirmationPassword)
      errs.confirmationPassword = "Xác nhận mật khẩu không khớp";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    try {
      const res = await authServices.changePassword(form);
      toast.success(res.message || "Đổi mật khẩu thành công!");
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Đổi mật khẩu thất bại";
      toast.error(msg);
      // Highlight trường mật khẩu hiện tại nếu backend báo sai
      if (msg.toLowerCase().includes("current") || msg.toLowerCase().includes("hiện tại") || msg.toLowerCase().includes("sai")) {
        setErrors((p) => ({ ...p, currentPassword: msg }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 24 24" className="text-neutral-700">
                <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Đổi mật khẩu</h2>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          <PasswordField
            label="Mật khẩu hiện tại"
            name="currentPassword"
            value={form.currentPassword}
            show={showPwd.currentPassword}
            onToggle={() => toggleShow("currentPassword")}
            onChange={handleChange}
            error={errors.currentPassword}
            placeholder="Nhập mật khẩu hiện tại"
          />
          <PasswordField
            label="Mật khẩu mới"
            name="newPassword"
            value={form.newPassword}
            show={showPwd.newPassword}
            onToggle={() => toggleShow("newPassword")}
            onChange={handleChange}
            error={errors.newPassword}
            placeholder="Tối thiểu 6 ký tự"
          />
          <PasswordField
            label="Xác nhận mật khẩu mới"
            name="confirmationPassword"
            value={form.confirmationPassword}
            show={showPwd.confirmationPassword}
            onToggle={() => toggleShow("confirmationPassword")}
            onChange={handleChange}
            error={errors.confirmationPassword}
            placeholder="Nhập lại mật khẩu mới"
          />

          {/* Strength bar (simple visual) */}
          {form.newPassword && <StrengthBar password={form.newPassword} />}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Đang lưu..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Sub-components ── */

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4.07 5.31L17.5 15.8A9.77 9.77 0 0 0 20.82 12C19.17 8.11 15.79 5.5 12 5.5c-1.09 0-2.16.19-3.16.54L7.3 4.5A11.45 11.45 0 0 1 12 4.5M3.18 12C4.83 15.89 8.21 18.5 12 18.5c.97 0 1.9-.15 2.78-.42L13 16.3a3.5 3.5 0 0 1-4.3-4.3zm7.38 7.01" />
    </svg>
  );

const PasswordField = ({ label, name, value, show, onToggle, onChange, error, placeholder }) => (
  <div className="relative ">
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      placeholder=""
      onChange={onChange}
      className="w-full border rounded-full py-2 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500"
    />
    <label
      htmlFor={name}
      className="text-neutral-400 text-sm font-semibold  absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
          peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1  peer-focus:text-[12px]
           peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
           peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
           peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
            peer-not-placeholder-shown:bg-white"
    >
      {label}
    </label>
    <button type="button" onClick={onToggle} className="text-neutral-400 hover:text-neutral-700 transition-colors absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
      <EyeIcon open={show} />
    </button>
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const StrengthBar = ({ password }) => {
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(password);
  const labels = ["", "Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
  const colors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-600"];

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : "bg-neutral-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${strength <= 2 ? "text-red-500" : strength <= 3 ? "text-yellow-600" : "text-green-600"}`}>
        {labels[strength]}
      </p>
    </div>
  );
};

export default ChangePasswordModal;
