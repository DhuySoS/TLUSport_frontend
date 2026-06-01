import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import ProductList from './ProductList'
import productServices from '@/services/productServices'
import { shuffleArray } from '@/lib/shuffleArray'
const ProductSection = () => {
  const [menProducts, setMenProducts] = useState({
    items: [],
    title: "Đồ nam",
  })
  const [womenProducts, setWomenProducts] = useState({
    items: [],
    title: "Đồ nữ",
  })
  const banner = [
    {
      id: 1,
      title: "Đồ nam",
      banner: "https://res.cloudinary.com/dcowpjmzi/image/upload/v1778175899/thoitrangnam_l3rhwj.avif",
    },
    {
      id: 2,
      title: "Đồ nữ",
      banner: "https://res.cloudinary.com/dcowpjmzi/image/upload/v1778175952/thoiTrangNu_hnzjne.avif",
    }
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [men, women] = await Promise.all([
          productServices.filterProducts({
            categoryId: 1,
            pageNumber: 1,
            pageSize: 10,
          }),
          productServices.filterProducts({
            categoryId: 18,
            pageNumber: 1,
            pageSize: 10,
          }),
        ]);

        if (men?.data) {
          setMenProducts((prev) => ({ ...prev, items: shuffleArray(men.data.items) || [] }));
        }
        if (women?.data) {
          setWomenProducts((prev) => ({ ...prev, items: shuffleArray(women.data.items) || [] }));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className='space-y-8 md:space-y-15 bg-neutral-100 pb-10 md:pb-0'>
        <SectionHeader data={banner[0]} />
        <ProductList products={menProducts} />
      </div>
      <div className='space-y-8 md:space-y-15 bg-neutral-100 pb-10 md:pb-0'>
        <SectionHeader data={banner[1]} />
        <ProductList products={womenProducts} />
      </div>
    </>
  )
}

export default ProductSection