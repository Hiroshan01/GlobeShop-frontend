import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from 'react-hot-toast';
import axios from "axios";
import mediaUpload from "../../../utils/meadUpload";

export default function AddProductSeller() {
    const [productId, setProduct] = useState('');
    const [ProductName, setProductName] = useState('');
    const [altName, setAltName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate()

    async function addProduct(e) {
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please Login first")
        }
        if (!ProductName || !productId || !labelledPrice || !price || !stock || !description) {
            toast.error("All fields are required!");
            return;
        }

        if (images.length <= 0) {
            toast.error("Please select at least one image")
            return
        }
        const promisesArray = [] //multiple image run
        for (let i = 0; i < images.length; i++) {
            promisesArray[i] = mediaUpload(images[i]) // read array
        }

        try {
            const imageUrls = await Promise.all(promisesArray)

            const altNamesArray = altName.split(",") //name as array like name1,name2,name3
            const product = {
                productId: productId,
                ProductName: ProductName,
                altName: altNamesArray,
                images: imageUrls,
                description: description,
                labelledPrice: labelledPrice,
                price: price,
                stock: stock
            }
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(() => {
                toast.success("Product Added Successfully")
                navigate("/seller/product")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })


        } catch {

        }


    }

    return (
        <div className="w-full h-full p-6 flex flex-col justify-center items-center space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800">Add New Product</h2>

            <div className="w-full max-w-md space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Product ID</label>
                    <input
                        type="text"
                        placeholder="Enter product ID"
                        value={productId}
                        onChange={(e) => setProduct(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        value={ProductName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Alter Name</label>
                    <input
                        type="text"
                        placeholder="Enter product alter name"
                        value={altName}
                        onChange={(e) => setAltName(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Product Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Labelled Price</label>
                        <input
                            type="number"
                            placeholder="Enter labelled price"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                            className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Stock</label>
                    <input
                        type="number"
                        placeholder="Enter stock quantity"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full flex justify-between items-center mt-6">
                    <Link
                        to="/admin/product"
                        className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={addProduct}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}
