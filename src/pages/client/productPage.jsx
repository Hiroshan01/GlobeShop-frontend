import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          setProducts(res.data); // Make sure you're setting res.data, which is the array of products
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
         
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
          
        ))
      )}
    </div>
    
  );
}
