import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          setProduct(res.data);
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token")
    if (token == null) {
      toast.error("Please Login first")
      return
    }

    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, {
      headers: {
        "Authorization": "Bearer " + token
      }

    }).then(() => {
      toast.success("Product deleted successfully")
      setIsLoading(true)
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-6 relative">

      <Link
        to="/admin/add-product"
        className="absolute text-2xl bottom-[-290px] right-7 cursor-pointer flex justify-center items-center bg-blue-600 text-white rounded-full py-2 px-4 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
      >
        +
      </Link>

      {isLoading ?
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[70%] h-[70%] border-5px border-gray-300 border-t-blue-900 rounded-b-full animate-spin "></div>
        </div> :
        <table className="min-w-full table-auto bg-white border-separate border-spacing-0 rounded-lg shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Product Id</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Label Price</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{item.productId}</td>
                    <td className="px-6 py-3">{item.ProductName}</td>
                    <td className="px-6 py-3">
                      <img src={item.images[0]} className="w-[100px] h-[100px] object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-3">{item.labelledPrice}</td>
                    <td className="px-6 py-3">{item.price}</td>
                    <td className="px-6 py-3">{item.stock}</td>
                    <td className="px-6 py-3 flex space-x-2">
                      <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition cursor-pointer">
                        <FaRegTrashCan onClick={() => {
                          deleteProduct(item.productId)
                        }} />
                      </button>
                      <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition cursor-pointer">
                        <FaRegEdit onClick={() => {
                          navigate("/admin/edit-product", {
                            state: item //bring item data
                          })

                        }} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-3 text-center text-gray-500">No products found</td>
                </tr>
              )
            }
          </tbody>
        </table>}
    </div>
  );
}
