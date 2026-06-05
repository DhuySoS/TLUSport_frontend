import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/lib/ScrollToTop";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useCategoryStore from "@/store/useCategoryStore";
import useProductStore from "@/store/useProductStore";
import BackToTopButton from "@/components/common/BackToTopButton";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

const MasterLayout = () => {
  const location = useLocation();
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const fetchCategoryTree = useCategoryStore(
    (state) => state.fetchCategoryTree,
  );
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchCategories();
    fetchCategoryTree();
    fetchProducts();
  }, []);

  const excludedPaths = ["/my-profile", "/search", "/payment-result"];

  const showChatbot = !excludedPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="w-full min-h-screen">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      {showChatbot && <ChatbotWidget />}
      <BackToTopButton />
    </div>
  );
};

export default MasterLayout;
