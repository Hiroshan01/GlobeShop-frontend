import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import Loading from "../../components/loading";
import { addCart, getCart } from "../../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        toast.error(error.response?.data?.message || "Error fetching product details");
      });
  }, [productId]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-4 md:py-8">
      {status === "success" && product && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 p-4 md:p-8">
                <div className="sticky top-4">
                  <ImageSlider images={product.images} />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full lg:w-1/2 p-4 md:p-8 lg:border-l border-gray-200">
                <div className="max-w-lg mx-auto lg:mx-0 space-y-6">
                  
                  {/* Product Title - Mobile & Desktop */}
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h1>
                    {product.altName && product.altName.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.altName.map((altName, index) => (
                          <span 
                            key={index} 
                            className="text-sm md:text-base text-gray-600 bg-gray-100 px-2 py-1 rounded"
                          >
                            {altName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product ID */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Product ID</p>
                    <p className="text-lg font-semibold text-gray-900">{product.productId}</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {product.description || 'No description available'}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    {product.labelledPrice < product.price ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg text-gray-500 line-through">
                            Rs. {product.price.toFixed(2)}
                          </span>
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-blue-600">
                          Rs. {product.labelledPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          You save Rs. {(product.price - product.labelledPrice).toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-2xl md:text-3xl font-bold text-blue-600">
                        Rs. {product.price.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button 
                      className="w-full bg-blue-600 text-white px-6 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-lg"
                      onClick={() => {
                        navigate("/checkout", {
                          state: {
                            cart: [
                              {
                                productId: product.productId,
                                name: product.ProductName,
                                image: product.images[0],
                                price: product.price,
                                labellPrice: product.labellPrice,
                                qty: 1
                              }
                            ]
                          }
                        })
                      }}
                    >
                      Buy Now
                    </button>
                    
                    <button 
                      className="w-full bg-gray-100 text-gray-800 px-6 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 border border-gray-300 hover:border-gray-400"
                      onClick={() => {
                        addCart(product, 1)
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Free shipping on orders over Rs. 5000
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      30-day return policy
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Secure payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      )}
    </div>
  );
}