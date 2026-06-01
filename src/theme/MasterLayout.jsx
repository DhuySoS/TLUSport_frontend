import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import ScrollToTop from '@/lib/ScrollToTop'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useCategoryStore from '@/store/useCategoryStore';
import useProductStore from '@/store/useProductStore';
import BackToTopButton from '@/components/common/BackToTopButton'

const MasterLayout = () => {
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const fetchCategoryTree = useCategoryStore(state => state.fetchCategoryTree);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  useEffect(() => {
    fetchCategories();
    fetchCategoryTree();
    fetchProducts();
  }, []);
  return (
    <div className="w-full min-h-screen">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default MasterLayout