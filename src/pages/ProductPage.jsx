import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get("https://ecomerce-backend-wjop.onrender.com/products")
            .then(res => setProducts(res.data));
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6 p-10">
            {products.map(p => (
                <div key={p._id} className="shadow-lg p-4 rounded">
                    <img src={p.image} className="h-40 mx-auto" />
                    <h2 className="text-xl font-bold">{p.name}</h2>
                    <p>₹{p.price}</p>
                    <button
                        onClick={() => addToCart(p)}
                        className="bg-brown-600 text-white px-4 py-2 mt-2 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}