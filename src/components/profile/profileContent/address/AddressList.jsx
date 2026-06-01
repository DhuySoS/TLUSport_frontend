import React, { useEffect, useState } from "react";
import useAddressStore from "@/store/useAddressStore";
import useAuthStore from "@/store/useAuthStore";
import AddressForm from "./AddressForm";
import AddressCard from "@/components/card/profile/AddressCard";

const AddressList = () => {
  const { addresses, isLoading, fetchAddresses, deleteAddress, updateAddress } =
    useAddressStore();
  const { isAuthenticated, user } = useAuthStore();

  // Modal state: null = đóng | "new" = thêm mới | {address obj} = sửa
  const [modal, setModal] = useState(null);
  // Xác nhận xóa
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) fetchAddresses();
  }, [isAuthenticated]);

  const handleSetDefault = async (address) => {
    if (address.isDefault) return;
    await updateAddress(address.id, {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      isDefault: true,
    });
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    await deleteAddress(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-8 w-full">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-2xl sm:text-4xl font-semibold tracking-wide">Địa chỉ của tôi</p>
        <button
          onClick={() => setModal("new")}
          className="w-full sm:w-auto justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-semibold uppercase cursor-pointer hover:bg-neutral-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
          </svg>
          Thêm địa chỉ mới
        </button>
      </div>
      <hr />

      {/* ── Danh sách ── */}
      <p className="text-xl font-medium text-neutral-800">Sổ địa chỉ</p>

      {isLoading && addresses.length === 0 ? (
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse border-b border-neutral-200 pb-6 space-y-3">
              <div className="h-5 bg-neutral-200 rounded w-1/3" />
              <div className="h-4 bg-neutral-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <EmptyState onAdd={() => setModal("new")} />
      ) : (
        <div className="space-y-4">
          {/* Sắp xếp: địa chỉ mặc định lên đầu */}
          {[...addresses]
            .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
            .map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={() => setModal(address)}
                onDelete={() => setConfirmDeleteId(address.id)}
                onSetDefault={() => handleSetDefault(address)}
              />
            ))}
        </div>
      )}

      {/* ── Modal thêm / sửa ── */}
      {modal !== null && (
        <AddressForm
          editAddress={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Confirm xóa ── */}
      {confirmDeleteId !== null && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

/* ── Sub-components ──────────────────────────────────────────────────────── */



const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
    <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24" className="text-neutral-400">
        <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" />
      </svg>
    </div>
    <div>
      <p className="text-xl font-bold text-neutral-800">Chưa có địa chỉ nào</p>
      <p className="text-neutral-500 text-sm mt-1">Thêm địa chỉ để thanh toán nhanh hơn</p>
    </div>
    <button
      onClick={onAdd}
      className="px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors cursor-pointer"
    >
      Thêm địa chỉ ngay
    </button>
  </div>
);

const ConfirmDelete = ({ onConfirm, onCancel, isLoading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center space-y-5">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" className="text-red-500">
          <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
        </svg>
      </div>
      <div>
        <p className="text-xl font-bold text-neutral-900">Xóa địa chỉ?</p>
        <p className="text-neutral-500 text-sm mt-1">Hành động này không thể hoàn tác.</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-60"
        >
          {isLoading ? "Đang xóa..." : "Xóa"}
        </button>
      </div>
    </div>
  </div>
);

export default AddressList;
