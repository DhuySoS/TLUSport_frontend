import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useAddressStore from "@/store/useAddressStore";
import AddressForm from "@/components/profile/profileContent/address/AddressForm";

const AddressSelectionModal = ({ onClose, onSelect }) => {
  const { addresses, fetchAddresses, isLoading } = useAddressStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSelect = (addr) => {
    onSelect(addr);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-4 border-b">
          <h2 className="text-2xl font-bold text-neutral-900">Sổ địa chỉ</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 flex-1 space-y-4">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold hover:border-neutral-500 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
            </svg>
            Thêm địa chỉ mới
          </button>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-neutral-100 rounded-xl"></div>
              <div className="h-20 bg-neutral-100 rounded-xl"></div>
            </div>
          ) : addresses.length === 0 ? (
            <p className="text-center text-neutral-500 py-4">Bạn chưa có địa chỉ nào được lưu.</p>
          ) : (
            <div className="space-y-3 mt-4">
              {[...addresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)).map(addr => (
                <div
                  key={addr.id}
                  onClick={() => handleSelect(addr)}
                  className="p-4 rounded-xl border border-neutral-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors relative group"
                >
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded-md">Mặc định</span>
                  )}
                  <p className="font-medium text-neutral-800 line-clamp-2 pr-16 text-sm">
                    {[addr.addressLine1, addr.addressLine2, addr.city, addr.state, addr.country].filter(Boolean).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <AddressForm
          editAddress={null}
          onClose={() => {
            setShowForm(false);
            fetchAddresses();
          }}
        />
      )}
    </div>,
    document.body
  );
};

export default AddressSelectionModal;
