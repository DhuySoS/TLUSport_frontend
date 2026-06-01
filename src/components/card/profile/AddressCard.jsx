import useAuthStore from "@/store/useAuthStore";

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const fullAddress = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
  const { user } = useAuthStore();

  return (
    <div
      className={`border rounded-2xl p-6 transition-all duration-200 ${
        address.isDefault
          ? "border-neutral-800 bg-neutral-50 shadow-sm"
          : "border-neutral-200 hover:border-neutral-400"
      }`}
    >
      {/* Row 1: tên + badge + nút sửa */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
        <div className="flex items-center gap-3 flex-wrap">
          {address.isDefault && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 text-xs font-semibold text-neutral-800 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                />
              </svg>
              Mặc định
            </span>
          )}
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0 flex-wrap">
          {!address.isDefault && (
            <button
              onClick={onSetDefault}
              className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 font-medium transition-colors cursor-pointer"
            >
              Đặt mặc định
            </button>
          )}
          <button
            onClick={onEdit}
            className="text-xs sm:text-sm text-blue-700 font-semibold hover:text-blue-500 transition-colors cursor-pointer underline underline-offset-2"
          >
            Cập nhật
          </button>
          <button
            onClick={onDelete}
            className="text-xs sm:text-sm text-red-500 font-semibold hover:text-red-700 transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
      {/* Row 2: địa chỉ đầy đủ */}
      <div className="text-sm sm:text-lg font-semibold text-neutral-500 mt-5 space-y-1">
        <div className="flex items-center gap-2 text-neutral-800 font-medium">
          <p>{user.firstName + " " + user.lastName} - </p>
          <p>{user.phoneNumber}</p>
        </div>
        <p>{fullAddress}</p>
      </div>
    </div>
  );
};

export default AddressCard;
