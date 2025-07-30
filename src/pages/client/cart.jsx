import { useState } from "react";
import { addCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
      {/* Add top padding for mobile to account for fixed header */}
      <div className="pt-20 sm:pt-0">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Shopping Cart
          </h1>
        </div>

        {/* Mobile Total Summary - Fixed Position */}
        <div className="block sm:hidden fixed top-4 left-4 right-4 z-20 bg-white rounded-xl shadow-lg p-3 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total:</p>
              <p className="text-lg font-bold text-red-500">
                Rs. {getTotal().toFixed(2)}
              </p>
            </div>
            <Link
              to="/checkout"
              state={{ cart: cart }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
            >
              Checkout
            </Link>
          </div>
        </div>

        {/* Desktop Total Summary */}
        <div className="hidden sm:block bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-lg md:text-xl text-gray-600 font-medium">
                Total Amount:
              </p>
              <p className="text-2xl md:text-3xl font-bold text-red-500">
                Rs. {getTotal().toFixed(2)}
              </p>
            </div>
            <Link
              to="/checkout"
              state={{ cart: cart }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500">Add some items to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 relative border border-gray-100"
              >
                {/* Remove Button */}
                <button
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110 z-10"
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCart(getCart());
                  }}
                >
                  <FaRegTrashCan className="text-sm" />
                </button>

                {/* Mobile Layout */}
                <div className="flex flex-col sm:hidden space-y-4">
                  {/* Image and Basic Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1">
                      <h1 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {item.name}
                      </h1>
                      <p className="text-sm text-gray-500 font-medium">
                        ID: {item.productId}
                      </p>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex justify-between items-center">
                    <div>
                      {item.labelledPrice > item.price ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-400 line-through">
                            Rs. {item.labelledPrice.toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-gray-800">
                            Rs. {item.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-800">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded-xl px-1">
                      <button
                        className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                        onClick={() => {
                          addCart(item, -1);
                          setCart(getCart());
                        }}
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg font-semibold text-gray-700 min-w-[2rem] text-center">
                        {item.qty}
                      </span>
                      <button
                        className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                        onClick={() => {
                          addCart(item, 1);
                          setCart(getCart());
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-600">
                      Rs. {(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 mx-4 md:mx-6">
                    <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mb-2">
                      ID: {item.productId}
                    </p>
                    {item.labelledPrice > item.price ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400 line-through">
                          Rs. {item.labelledPrice.toFixed(2)}
                        </span>
                        <span className="text-lg md:text-xl font-bold text-gray-800">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg md:text-xl font-bold text-gray-800">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1">
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                      onClick={() => {
                        addCart(item, -1);
                        setCart(getCart());
                      }}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg md:text-xl font-semibold text-gray-700 min-w-[2rem] text-center">
                      {item.qty}
                    </span>
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                      onClick={() => {
                        addCart(item, 1);
                        setCart(getCart());
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="text-right ml-4 md:ml-6">
                    <span className="text-xl md:text-2xl font-bold text-blue-600">
                      Rs. {(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
       </div>
    </div>
  );
}