import React from "react";
import AccountSettings from "./accountSettings/AccountSettings";
import OrderHistory from "./orderHistory/OrderHistory";
import VoucherList from "./voucher/VoucherList";
import AddressList from "./address/AddressList";
import ReviewList from "./reviews/ReviewList";
import MyWallet from "./wallet/MyWallet";

const ProfileContent = ({ activeTab }) => {
  return (
    <div className="w-full bg-white min-h-100 lg:min-h-200 px-4 py-6 md:px-8 lg:px-16 lg:py-14 rounded-lg">
      {activeTab === "account-settings" && <AccountSettings />}
      {activeTab === "order-history" && <OrderHistory />}
      {activeTab === "voucher" && <VoucherList />}
      {activeTab === "address" && <AddressList />}
      {activeTab === "reviews" && <ReviewList />}
      {activeTab === "wallet" && <MyWallet />}
    </div>
  );
};

export default ProfileContent;
