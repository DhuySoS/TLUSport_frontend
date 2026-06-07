import React, { useState, useEffect } from "react";
import walletServices from "@/services/walletServices";
import { formatCurrency } from "@/lib/formatCurrency";
import { Wallet, History, ArrowDownCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MyWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletRes, transRes] = await Promise.all([
        walletServices.getMyWallet(),
        walletServices.getTransactions(),
      ]);
      console.log("walletRes", walletRes);
      console.log("transRes", transRes);

      setWallet(walletRes.data?.data);
      setTransactions(transRes.data?.data?.items || []);
    } catch (error) {
      console.error("Lỗi khi tải thông tin ví:", error);
      toast.error("Không thể tải thông tin ví");
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (isDepositing) return;

    // Remove dots to parse the raw number
    const cleanAmount = depositAmount.replace(/\./g, "");
    if (!cleanAmount || isNaN(cleanAmount) || Number(cleanAmount) <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    setIsDepositing(true);
    try {
      const res = await walletServices.depositVnpay(Number(cleanAmount));
      const paymentUrl = res.data?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Không thể tạo giao dịch nạp tiền");
        setIsDepositing(false);
      }
    } catch (error) {
      console.error("Lỗi khi tạo nạp tiền:", error);
      toast.error("Lỗi hệ thống khi tạo giao dịch");
      setIsDepositing(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Đang tải thông tin ví...</div>;
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
        Ví Của Tôi
      </h2>

      {/* Wallet Balance Card */}
      <div className="bg-linear-to-r from-neutral-900 to-black rounded-xl p-6 text-white shadow-lg mb-8 flex flex-col lg:flex-row gap-6 items-stretch lg:items-center lg:justify-between">
        <div>
          <p className="text-white/80 mb-2 font-medium">Số dư hiện tại</p>
          <div className="text-2xl sm:text-4xl font-bold flex items-center gap-3">
            <Wallet size={36} className="shrink-0" />
            {formatCurrency(wallet?.balance || 0)}
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-neutral-800 p-4 sm:p-5 rounded-xl flex flex-col gap-3 w-full lg:w-auto lg:min-w-75 lg:max-w-md border border-neutral-700 shadow-lg">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Nạp tiền vào ví
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Nhập số tiền..."
              value={depositAmount}
              onChange={(e) => {
                const rawVal = e.target.value;
                // Strip all non-digits to get raw value
                const cleanVal = rawVal.replace(/\D/g, "");
                if (cleanVal === "") {
                  setDepositAmount("");
                  return;
                }
                // Format with dots
                setDepositAmount(Number(cleanVal).toLocaleString("vi-VN"));
              }}
              className="px-4 py-2 bg-neutral-900 rounded-lg text-white w-full outline-none border border-neutral-700 focus:border-neutral-500 placeholder:text-neutral-400 text-sm transition-colors"
            />
            <button
              onClick={handleDeposit}
              disabled={isDepositing}
              className="bg-white text-neutral-900 px-5 py-2 rounded-lg font-bold hover:bg-neutral-200 active:bg-neutral-300 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isDepositing ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ArrowDownCircle size={18} />
              )}
              {isDepositing ? "Đang xử lý..." : "Nạp ngay"}
            </button>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
        <div className="p-4 border-b border-neutral-200 flex items-center gap-2">
          <History className="text-neutral-500" />
          <h3 className="text-lg font-semibold text-neutral-800">
            Lịch sử giao dịch
          </h3>
        </div>

        {transactions.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            Chưa có giao dịch nào
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {transactions.map((t, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-neutral-900">
                    {t.description || "Giao dịch"}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
                <div
                  className={`font-bold shrink-0 ${
                    t.status === "FAILED"
                      ? "text-neutral-400 line-through"
                      : t.status === "PENDING"
                        ? "text-amber-500"
                        : t.direction === "IN"
                          ? "text-green-600"
                          : "text-red-500"
                  }`}
                >
                  {t.status !== "FAILED" && (t.direction === "IN" ? "+" : "-")}
                  {formatCurrency(t.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWallet;
