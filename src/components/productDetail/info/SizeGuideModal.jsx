import React, { useState } from "react";

const SIZE_TABLE = [
  {
    label: "Cân nặng (kg)",
    values: { S: "48-55", M: "55-62", L: "62-69", XL: "69-76", "2XL": "76-85" },
  },
  {
    label: "Chiều cao (cm)",
    values: {
      S: "155-160",
      M: "160-165",
      L: "165-172",
      XL: "172-177",
      "2XL": "177-183",
    },
  },
  {
    label: "Vòng ngực (cm)",
    values: {
      S: "84-88",
      M: "88-92",
      L: "92-96",
      XL: "96-100",
      "2XL": "100-106",
    },
  },
  {
    label: "Vòng eo (cm)",
    values: { S: "68-72", M: "72-76", L: "76-80", XL: "80-85", "2XL": "85-92" },
  },
  {
    label: "Vòng mông (cm)",
    values: {
      S: "88-92",
      M: "92-96",
      L: "96-100",
      XL: "100-105",
      "2XL": "105-112",
    },
  },
];

const SIZES = ["S", "M", "L", "XL", "2XL"];

function getSuggestedSize(height, weight) {
  if (!height || !weight) return null;
  const h = Number(height);
  const w = Number(weight);
  if (w < 55 && h < 160) return "S";
  if (w < 62 && h < 165) return "M";
  if (w < 69 && h < 172) return "L";
  if (w < 76 && h < 177) return "XL";
  return "2XL";
}

const SizeGuideModal = () => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [suggested, setSuggested] = useState(null);

  const handleCalculate = () => {
    const size = getSuggestedSize(height, weight);
    setSuggested(size);
  };

  return (
    <>
      <p
        className="text-blue-600 text-md font-medium underline cursor-pointer mt-2 whitespace-nowrap"
        onClick={() => setOpen(true)}
      >
        Hướng dẫn chọn size
      </p>

      {open && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[calc(100%-2rem)] md:max-w-2xl mx-4 max-h-[90vh] overflow-y-auto min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 border-b border-neutral-100">
              <h2 className="text-2xl font-bold text-neutral-900">
                Hướng dẫn chọn size
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  />
                </svg>
              </button>
            </div>

            <div className="px-4 py-4 md:px-6 md:py-5 space-y-6">
              {/* Calculator */}
              <div className="bg-neutral-50 rounded-xl p-5">
                <p className="text-base font-semibold text-neutral-800 mb-4">
                  Tính size phù hợp với bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-neutral-500 mb-1">
                      Chiều cao
                    </label>
                    <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-neutral-900 transition-colors">
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="155"
                        className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
                      />
                      <span className="px-3 text-sm text-neutral-400 bg-neutral-50 border-l border-neutral-200 py-2.5">
                        cm
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-neutral-500 mb-1">
                      Cân nặng
                    </label>
                    <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-neutral-900 transition-colors">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="55"
                        className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
                      />
                      <span className="px-3 text-sm text-neutral-400 bg-neutral-50 border-l border-neutral-200 py-2.5">
                        kg
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCalculate}
                  className="mt-4 w-full py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  TÍNH TOÁN
                </button>
                {suggested && (
                  <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="text-green-600 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                      />
                    </svg>
                    <p className="text-sm text-green-800">
                      Size phù hợp với bạn là:{" "}
                      <span className="font-bold text-green-700 text-base">
                        {suggested}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Size Table */}
              <div>
                <p className="text-base font-semibold text-neutral-800 mb-3">
                  Thông số sản phẩm
                </p>
                <p className="text-xs text-neutral-500 mb-3 italic">
                  * Thông số sản phẩm khi trải phẳng, có thể chênh lệch so với
                  số đo cơ thể do đồ có giãn vải.
                </p>
                <div className="overflow-x-auto rounded-xl border border-neutral-200 w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="text-left px-2 py-3 md:px-4 font-semibold text-neutral-700 min-w-25 sm:min-w-40">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            className="inline mr-1 text-neutral-500"
                            style={{ verticalAlign: "middle" }}
                          >
                            <path
                              fill="currentColor"
                              d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                            />
                          </svg>
                        </th>
                        {SIZES.map((s) => (
                          <th
                            key={s}
                            className="px-2 py-3 md:px-4 font-bold text-neutral-900 text-center"
                          >
                            {s}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_TABLE.map((row, i) => (
                        <tr
                          key={row.label}
                          className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                        >
                          <td className="px-2 py-3 md:px-4 font-medium text-neutral-700">
                            {row.label}
                          </td>
                          {SIZES.map((s) => (
                            <td
                              key={s}
                              className="px-2 py-3 md:px-4 text-center text-neutral-800"
                            >
                              {row.values[s]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  Trường hợp số đo của bạn nằm trong khoảng giữa các size:
                </p>
                <ul className="space-y-1 text-sm text-blue-700 list-disc list-inside">
                  <li>Với Quần, hãy ưu tiên theo cân nặng</li>
                  <li>97% khách hàng đã chọn đúng size theo cách này</li>
                  <li>Thông số được tính bằng centimet (cm)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeGuideModal;
