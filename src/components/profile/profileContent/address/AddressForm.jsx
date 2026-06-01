import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas/userSchema";
import useAddressStore from "@/store/useAddressStore";
import Modal from "@/components/common/Modal";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";

const EMPTY_FORM = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "Việt Nam",
  postalCode: "100000",
  isDefault: false,
};

const AddressForm = ({ editAddress, onClose }) => {
  const { createAddress, updateAddress, isLoading } = useAddressStore();
  const isEditing = !!editAddress;

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [wardsLoading, setWardsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: EMPTY_FORM,
  });

  const selectedState = watch("state");

  // Tải danh sách tỉnh/thành phố khi mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setProvincesLoading(true);
      try {
        const res = await fetch("https://provinces.open-api.vn/api/v2/p/");
        if (!res.ok) throw new Error("Không thể tải tỉnh/thành");
        const data = await res.json();
        setProvinces(data);
      } catch (err) {
        console.error("Lỗi khi tải tỉnh/thành:", err);
      } finally {
        setProvincesLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  // Tải danh sách phường/xã tương ứng với tỉnh/thành phố được chọn
  useEffect(() => {
    if (!selectedState || provinces.length === 0) {
      setWards([]);
      return;
    }

    const provinceObj = provinces.find((p) => p.name === selectedState);
    if (!provinceObj) return;

    const fetchWards = async () => {
      setWardsLoading(true);
      try {
        const res = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceObj.code}?depth=2`);
        if (!res.ok) throw new Error("Không thể tải phường/xã");
        const data = await res.json();
        
        // Cấp 2 sáp nhập: lấy phẳng mảng wards trực thuộc tỉnh/thành
        const allWards = data.wards || [];
        
        // Sắp xếp theo bảng chữ cái tiếng Việt
        allWards.sort((a, b) => a.name.localeCompare(b.name));
        setWards(allWards);
      } catch (err) {
        console.error("Lỗi khi tải phường/xã:", err);
      } finally {
        setWardsLoading(false);
      }
    };

    fetchWards();
  }, [selectedState, provinces]);

  // Nếu đang sửa, nạp dữ liệu vào form
  useEffect(() => {
    if (editAddress) {
      reset({
        addressLine1: editAddress.addressLine1 || "",
        addressLine2: editAddress.addressLine2 || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        country: editAddress.country || "Việt Nam",
        postalCode: editAddress.postalCode || "100000",
        isDefault: editAddress.isDefault || false,
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [editAddress, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateAddress(editAddress.id, data);
      } else {
        await createAddress(data);
      }
      onClose();
    } catch {
      // errors already toasted in store
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Địa chỉ dòng 1 */}
        <InputField
          label="Địa chỉ (dòng 1) *"
          name="addressLine1"
          {...register("addressLine1")}
          error={errors.addressLine1}
          placeholder="Số nhà, tên đường, phường/xã..."
        />

        {/* Địa chỉ dòng 2 */}
        <InputField
          label="Địa chỉ (dòng 2)"
          name="addressLine2"
          {...register("addressLine2")}
          error={errors.addressLine2}
          placeholder="Tòa nhà, tầng (tùy chọn)"
        />

        {/* Dropdown Tỉnh/Thành & Phường/Xã (2 cấp sáp nhập địa giới) */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Tỉnh / Thành *"
            name="state"
            options={provinces}
            loading={provincesLoading}
            value={watch("state")}
            {...register("state", { onChange: () => setValue("city", "") })}
            error={errors.state}
          />
          <SelectField
            label="Phường / Xã *"
            name="city"
            options={wards}
            loading={wardsLoading}
            disabled={!selectedState || wardsLoading}
            value={watch("city")}
            {...register("city")}
            error={errors.city}
          />
        </div>

        {/* Quốc gia */}
        <InputField
          label="Quốc gia *"
          name="country"
          {...register("country")}
          error={errors.country}
          placeholder="VD: Việt Nam"
        />

        {/* Hidden postalCode input to satisfy backend schema validation */}
        <input type="hidden" name="postalCode" {...register("postalCode")} />

        {/* isDefault checkbox */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="isDefault"
            {...register("isDefault")}
            className="w-4 h-4 accent-neutral-900 cursor-pointer"
          />
          <span className="text-sm font-medium text-neutral-700">
            Đặt làm địa chỉ mặc định
          </span>
        </label>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
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
            {isLoading ? "Đang lưu..." : isEditing ? "Lưu thay đổi" : "Thêm địa chỉ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddressForm;
