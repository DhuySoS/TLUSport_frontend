import React, { useState } from "react";

import GenderSection from "./GenderSection";

const CategorySection = () => {
  const [actionTab, setActionTab] = useState("Nam");
  return (
    <div className="w-full h-full  px-12 space-y-8 ">
      <div className="flex gap-2 items-center text-white uppercase text-xl ">
        <div
          className={`px-8 py-4  ${actionTab === "Nam" ? "bg-blue-800 font-semibold" : "bg-blue-200 font-medium"} rounded-full cursor-pointer hover:bg-blue-800`}
          onClick={() => setActionTab("Nam")}
        >
          Nam
        </div>
        <div
          className={`px-8 py-4 ${actionTab === "Nữ" ? "bg-blue-800 font-semibold" : "bg-blue-200 font-medium"} rounded-full cursor-pointer hover:bg-blue-800`}
          onClick={() => setActionTab("Nữ")}
        >
          Nữ
        </div>
      </div>
      {/* {actionTab === "Nam" ? :} sửa logic sau */}
      <GenderSection />
    </div>
  );
};

export default CategorySection;
