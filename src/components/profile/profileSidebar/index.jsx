import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const SidebarItems = [
    {
      id: "account-settings",
      name: "Thông tin tài khoản",
      icon: "/profile/account.png",
    },
    {
      id: "order-history",
      name: "Lịch sử đơn hàng",
      icon: "/profile/history_order.png",
    },
    {
      id: "voucher",
      name: "Ví voucher",
      icon: "/profile/vi_voucher.png",
    },
    {
      id: "address",
      name: "Sổ địa chỉ",
      icon: "/profile/address.png",
    },
    {
      id: "reviews",
      name: "Đánh giá và phản hồi",
      icon: "/profile/my_review.webp",
    },
    {
      id: "wallet",
      name: "Ví của tôi",
      icon: "/profile/mceclip6_39.png",
    },
    {
      id: "logout",
      name: "Đăng xuất",
      icon: "/profile/logout.webp",
    },
  ];
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    if (id === "logout") {
      logout();
    } else {
      setActiveTab(id);
      navigate(`/my-profile/${id}`);
    }
  };
  const { logout } = useAuthStore();
  return (
    <div className="w-full flex flex-row overflow-x-auto lg:flex-col gap-2 pb-3 lg:pb-0 sticky lg:top-20 scrollbar-none">
      {SidebarItems.map((item) => (
        <div
          onClick={() => handleItemClick(item.id)}
          key={item.id}
          className={`flex items-center gap-2 lg:gap-4 py-2.5 px-4 lg:py-4 rounded-lg cursor-pointer relative shrink-0 transition-colors duration-200 ${
            activeTab === item.id
              ? "bg-black text-white shadow-lg"
              : "bg-white text-neutral-600 hover:bg-gray-100"
          }`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
          />
          <span className="text-sm lg:text-lg font-medium whitespace-nowrap">{item.name}</span>
          <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
