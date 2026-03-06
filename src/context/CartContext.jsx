import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    // Fetch Cart
    const fetchCart = async () => {
        try {

            const user = auth.currentUser;
            if (!user) return;

            const { data } = await axios.get(
                `http://localhost:5000/api/cart/${user.uid}`
            );

            if (data && data.items) {
                setCart(data.items);
            } else {
                setCart([]);
            }

        } catch (error) {
            console.log("Fetch Cart Error:", error);
        }
    };

    // Load cart when app starts
    useEffect(() => {
        fetchCart();
    }, []);

    // Add To Cart
    const addToCart = async (product) => {
        try {

            const user = auth.currentUser;
            if (!user) return;

            await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    userId: user.uid,
                    product
                }
            );

            fetchCart();

        } catch (error) {
            console.log("Add Cart Error:", error);
        }
    };

    // Remove Item
    const removeFromCart = async (index) => {
        try {

            const user = auth.currentUser;

            await axios.post(
                "http://localhost:5000/api/cart/remove",
                {
                    userId: user.uid,
                    index
                }
            );

            fetchCart();

        } catch (error) {
            console.log("Remove Error:", error);
        }
    };

    // Clear Cart
    const clearCart = async () => {
        try {

            const user = auth.currentUser;

            await axios.delete(
                `http://localhost:5000/api/cart/clear/${user.uid}`
            );

            setCart([]);

        } catch (error) {
            console.log("Clear Cart Error:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};