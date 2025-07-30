import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "80%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-out",
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9998,
  },
};

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login first");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching Orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    const token = localStorage.getItem("token");
    
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      
      toast.success("Order status updated successfully");
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.orderId === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      
      // Update selected order if it's the one being updated
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    if (selectedOrder) {
      const printContent = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="text-align: center; color: #1e40af; margin-bottom: 20px;">Order Details</h2>
          <div style="line-height: 1.6;">
            <p><strong>Order ID:</strong> ${selectedOrder.orderId}</p>
            <p><strong>Customer Name:</strong> ${selectedOrder.name}</p>
            <p><strong>Email:</strong> ${selectedOrder.email}</p>
            <p><strong>Address:</strong> ${selectedOrder.address}</p>
            <p><strong>Phone:</strong> ${selectedOrder.phone}</p>
            <p><strong>Total:</strong> $${selectedOrder.total.toFixed(2)}</p>
            <p><strong>Date:</strong> ${new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${selectedOrder.status}</p>
          </div>
        </div>
      `;
      
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-6 relative">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Details"
      >
        {selectedOrder && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">Order Details</h2>
            <div className="space-y-2">
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.name}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedOrder.status === "pending"
                      ? "text-yellow-500"
                      : selectedOrder.status === "completed"
                      ? "text-green-600"
                      : selectedOrder.status === "cancelled"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
              <div className="mt-3">
                <label htmlFor="statusSelect" className="block text-sm font-medium text-gray-700 mb-1">
                  Change Status:
                </label>
                <select
                  id="statusSelect"
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (newStatus && newStatus !== selectedOrder.status) {
                      updateOrderStatus(selectedOrder.orderId, newStatus);
                    }
                  }}
                  value={selectedOrder.status}
                  disabled={isUpdating}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-600 focus:outline-none transition-all"
                disabled={isUpdating}
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none transition-all"
                disabled={isUpdating}
              >
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border-separate border-spacing-0 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Phone Number</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    <td className="px-6 py-3">{order.orderId}</td>
                    <td className="px-6 py-3">{order.name}</td>
                    <td className="px-6 py-3">{order.email}</td>
                    <td className="px-6 py-3">{order.address}</td>
                    <td className="px-6 py-3">{order.phone}</td>
                    <td className="px-6 py-3">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`font-semibold ${
                          order.status === "pending"
                            ? "text-yellow-500"
                            : order.status === "completed"
                            ? "text-green-600"
                            : order.status === "cancelled"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-3 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}