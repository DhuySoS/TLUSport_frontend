import React, { useState, useMemo } from "react";

import GenderSection from "./GenderSection";
import useCategoryStore from "@/store/useCategoryStore";

const CategorySection = () => {
  const [actionTab, setActionTab] = useState("Nam");
  const [isChangingTab, setIsChangingTab] = useState(false);
  const { categoryTree } = useCategoryStore();

  const handleTabChange = (tab) => {
    if (tab === actionTab) return;
    setIsChangingTab(true);
    setActionTab(tab);
    setTimeout(() => {
      setIsChangingTab(false);
    }, 600);
  };

  // Hàm đệ quy để lấy các category lá có urlImage
  const getLeafCategories = (nodes, result = []) => {
    if (!Array.isArray(nodes)) return result;

    nodes.forEach((node) => {
      if (node.subCategories && node.subCategories.length > 0) {
        getLeafCategories(node.subCategories, result);
      } else {
        if (node.imageUrl) {
          result.push(node);
        }
      }
    });
    return result;
  };

  // Lọc ra các category hiển thị dựa trên tab đang chọn
  const displayCategories = useMemo(() => {
    if (!categoryTree || categoryTree.length === 0) return [];

    // Tìm danh mục gốc tương ứng với actionTab (Nam / Nữ)
    const rootCategory = categoryTree.find(
      (cat) => cat.name?.toLowerCase() === actionTab.toLowerCase(),
    );

    if (!rootCategory) return [];

    // Nếu rootCategory là 1 object có subCategories thì lấy lá của nó,
    // truyền vào dạng mảng [rootCategory] hoặc rootCategory.subCategories tùy cấu trúc.
    // Thường truyền rootCategory.subCategories là an toàn nhất.
    return getLeafCategories(rootCategory.subCategories);
  }, [categoryTree, actionTab]);

  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-12 space-y-6 sm:space-y-8">
      <div className="flex gap-2 items-center text-white uppercase text-sm sm:text-base md:text-lg lg:text-xl">
        <div
          className={`px-5 py-2.5 sm:px-8 sm:py-4 ${actionTab === "Nam" ? "bg-black font-semibold" : "bg-neutral-400 font-medium hover:bg-neutral-300 text-neutral-800"} rounded-full cursor-pointer`}
          onClick={() => handleTabChange("Nam")}
        >
          Nam
        </div>
        <div
          className={`px-5 py-2.5 sm:px-8 sm:py-4 ${actionTab === "Nữ" ? "bg-black font-semibold" : "bg-neutral-400 font-medium hover:bg-neutral-300 text-neutral-800"} rounded-full cursor-pointer`}
          onClick={() => handleTabChange("Nữ")}
        >
          Nữ
        </div>
      </div>

      <div className="w-full">
        {isChangingTab ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-none w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-1rem)] xl:w-[calc(16.666%-1rem)]"
              >
                <div className="p-1">
                  <div className="flex flex-col gap-4 animate-pulse">
                    <div className="bg-neutral-200 rounded-2xl h-64 sm:h-72 md:h-80 lg:h-85 w-full" />
                    <div className="bg-neutral-200 h-6 w-3/4 rounded mx-auto mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <GenderSection categories={displayCategories} />
        )}
      </div>
    </div>
  );
};

export default CategorySection;
