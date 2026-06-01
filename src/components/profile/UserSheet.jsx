import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import walletServices from "@/services/walletServices";
import { formatCurrency } from "@/lib/formatCurrency";

const UserSheet = () => {
  const QuickLinks = [
    {
      id: 1,
      name: "Ví Voucher",
      href: "/my-profile/voucher",
      icon: "/profile/vi_voucher.png",
    },
    {
      id: 2,
      name: "Lịch sử đơn hàng",
      href: "/my-profile/order-history",
      icon: "/profile/history_order.png",
    },
    {
      id: 3,
      name: "Sổ địa chỉ",
      href: "/my-profile/address",
      icon: "/profile/address.png",
    },
    {
      id: 4,
      name: "Đánh giá và phản hồi",
      href: "/my-profile/reviews",
      icon: "/profile/my_review.webp",
    },
    {
      id: 5,
      name: "Ví của tôi",
      href: "/my-profile/wallet",
      icon: "/profile/mceclip6_39.png",
    },
    {
      id: 6,
      name: "Cài đặt tài khoản",
      href: "/my-profile/account-settings",
      icon: "/profile/account.png",
    },
  ];
  const { user } = useAuthStore();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (user) {
      walletServices
        .getMyWallet()
        .then((res) => setWalletBalance(res.data?.data?.balance || 0))
        .catch(console.error);
    }
  }, [user]);
  return (
    <Sheet>
      <SheetTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-2xl cursor-pointer"
        >
          <path
            fill="currentColor"
            d="M15 7q-.425 0-.712-.288T14 6t.288-.712T15 5h6q.425 0 .713.288T22 6t-.288.713T21 7zm0 4q-.425 0-.712-.288T14 10t.288-.712T15 9h6q.425 0 .713.288T22 10t-.288.713T21 11zm0 4q-.425 0-.712-.288T14 14t.288-.712T15 13h6q.425 0 .713.288T22 14t-.288.713T21 15zm-9.125-1.875Q5 12.25 5 11t.875-2.125T8 8t2.125.875T11 11t-.875 2.125T8 14t-2.125-.875M2 19v-.9q0-.525.25-1t.7-.75q1.125-.675 2.388-1.012T8 15t2.663.338t2.387 1.012q.45.275.7.75t.25 1v.9q0 .425-.288.713T13 20H3q-.425 0-.712-.288T2 19"
          />
        </svg>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl p-4 flex flex-col gap-2">
            <span>
              Chào,{" "}
              <span className="font-bold text-4xl">
                {user?.firstName + " " + user?.lastName || "User"}!
              </span>
            </span>
            <div className="flex items-center gap-2 text-xl font-medium text-blue-700 mt-2">
              Số dư ví: {formatCurrency(walletBalance)}
            </div>
          </SheetTitle>
          <hr />
        </SheetHeader>
        <div className="h-full w-full flex flex-col gap-4 justify-center">
          {QuickLinks.map((link) => (
            <Link
              to={link.href}
              key={link.id}
              className="flex items-center gap-6 px-4 py-4 rounded-lg hover:bg-gray-100 transition-colors bg-neutral-100"
            >
              <img src={link.icon} alt={link.name} className="w-8 h-8" />
              <span className="text-lg font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
        <SheetFooter>
          <Link
            to="/my-profile"
            className="w-full text-center py-4 bg-blue-800/90 text-white  text-lg font-medium uppercase "
          >
            <SheetClose className="w-full cursor-pointer">
              Đi đến tài khoản
            </SheetClose>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
