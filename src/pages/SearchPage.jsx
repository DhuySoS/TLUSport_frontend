import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ListProItemCard from '@/components/card/home/ListProItemCard';
import productServices from '@/services/productServices';
import { Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    if (keyword) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const res = await productServices.searchProducts(keyword, 1, 24);
          setResults(res.data?.items || []);
          setPagination({
            totalElements: res.data?.totalElements
          });
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [keyword]);

  return (
    <div className="min-h-screen w-full px-16 mx-auto max-w-full">
      <Breadcrumbs />
      <div className="py-10">
        <h1 className="text-3xl font-semibold mb-8 text-neutral-800">
          Kết quả tìm kiếm cho: "{keyword}"
          {!isLoading && pagination.totalElements !== undefined && (
            <span className="text-lg text-neutral-500 font-normal ml-3">({pagination.totalElements} sản phẩm)</span>
          )}
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-neutral-400" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-4 grid-cols-2 gap-y-8">
            {results.map((product) => (
              <ListProItemCard key={product.id} productData={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-xl font-medium text-neutral-600">Không tìm thấy sản phẩm nào phù hợp với "{keyword}".</p>
            <p className="text-neutral-500">Vui lòng thử lại với từ khóa khác.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
