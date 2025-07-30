import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  console.log(location);
  const [cart, setCart] = useState(location.state?.cart || []);
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')

  // Fix: Return the total
  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }

  // Fix: Accept index as a parameter
  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  // Fix: Accept index and qty as parameters
  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder(){
    const token = localStorage.getItem("token")
    if(token == null){
      toast.error("Please Login first")
    }
    const orderInformation = {
      products : [],
      address :address,
      phone :phoneNo
    }

    for(let i=0; i<cart.length; i++){
      const item ={
        productId: cart[i].productId,
        qty: cart[i].qty
      }
      orderInformation.products[i] = item
    }
   const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/order/",orderInformation, {
          headers : {
              "Authorization" : "Bearer "+token
          }
        }).then(()=>{
          toast.success("Place Order Successfully")
          
        }).catch((e)=>{
          console.log(e.response.data.message)
          toast.error(e.response.data.message)
        })
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
      {/* Add top padding for mobile to account for fixed header */}
      <div className="pt-24 sm:pt-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Checkout
            </h1>
          </div>

          {/* Mobile Checkout Summary - Fixed Position */}
          <div className="block sm:hidden fixed top-4 left-4 right-4 z-20 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Total:</p>
                <p className="text-xl font-bold text-red-500">
                  Rs. {getTotal().toFixed(2)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Address" 
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Phone" 
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={phoneNo}
                  onChange={(e)=>setPhoneNo(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md"
                onClick={()=>placeOrder()}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Desktop Checkout Summary */}
          <div className="hidden sm:block bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="text-center lg:text-left">
                <p className="text-lg text-gray-600 font-medium mb-2">
                  Total Amount:
                </p>
                <p className="text-3xl font-bold text-red-500">
                  Rs. {getTotal().toFixed(2)}
                </p>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter Address" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={phoneNo}
                  onChange={(e)=>setPhoneNo(e.target.value)}
                />
              </div>
              
              <button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                onClick={()=>placeOrder()}
              >
                Place Order
              </button>
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
                <p className="text-gray-500">Add some items to checkout!</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 relative border border-gray-100"
                >
                  {/* Remove Button */}
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110 z-10"
                    onClick={() => {
                      removeFromCart(index);
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
                            changeQty(index, -1);
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
                            changeQty(index, 1);
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
                          changeQty(index, -1);
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
                          changeQty(index, 1);
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