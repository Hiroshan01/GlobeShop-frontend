import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setCurrentProducts(allProducts.slice(startIndex, endIndex));
    }
  }, [allProducts, currentPage]);

  const fetchAllProducts = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product`)
      .then((res) => {
        setAllProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  };

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded-lg font-medium transition-all ${currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-blue-400 hover:shadow-md'
          }`}
      >
        Previous
      </button>
    );

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded-lg font-medium transition-all ${i === currentPage
            ? 'bg-gradient-to-r from-purple-400 to-blue-400 shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {i}
        </button>
      );
    }

    // Last page button (if not in range)
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded-lg font-medium transition-all ${currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-blue-400 hover:shadow-md'
          }`}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 w-full p-6">
        {isLoading ? (
          <div className="w-full h-64 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-gray-500 mt-8">
            No products found
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="w-full bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Pagination Buttons */}
              <div className="flex flex-wrap justify-center items-center">
                {renderPaginationButtons()}
              </div>

              {/* Page Info */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="ml-2">
                  ({allProducts.length} total products)
                </span>
              </div>
            </div>

            {/* Products per page info */}
            <div className="text-center text-xs text-gray-500 mt-2">
              Showing {currentProducts.length} products per page
            </div>
          </div>
        </div>
      )}
    </div>
  );
}