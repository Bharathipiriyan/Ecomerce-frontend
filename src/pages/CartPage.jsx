import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Firebase auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchCart(currentUser.uid);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch cart items
    const fetchCart = async (uid) => {
        try {
            const { data } = await axios.get(
                `https://ecomerce-backend-wjop.onrender.com/cart/${uid}`
            );

            setCart(data?.items || []);
        } catch (error) {
            console.error("Fetch cart error:", error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Remove single item
    const removeItem = async (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        try {
            await axios.post("http://localhost:5000/api/cart/remove", { userId: user.uid, index });
        } catch (error) {
            console.error("Remove error:", error);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Razorpay payment
    const handlePayment = async () => {
        if (!user) return alert("Please login to proceed with payment.");

        try {
            const { data } = await axios.post("http://localhost:5000/api/payment/create-order", { amount: total });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.amount,
                currency: "INR",
                order_id: data.id,
                handler: async function (response) {
                    try {
                        await axios.post("http://localhost:5000/api/payment/save-order", {
                            userId: user.uid,
                            items: cart,
                            total,
                            paymentId: response.razorpay_payment_id,
                            status: "PAID"
                        });
                        await axios.delete(`http://localhost:5000/api/cart/clear/${user.uid}`);
                        setCart([]);
                        alert("Payment successful! Thank you for your purchase.");
                        navigate("/success");
                    } catch (err) {
                        console.error("Error saving order:", err);
                        alert("Payment succeeded but something went wrong. Contact support.");
                    }
                },
                modal: { escape: true, backdropclose: false }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed. Please try again.");
        }
    };

    // Motion variants
    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    return (
        <>
            <Navbar />

            <motion.div
                className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen flex flex-col"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Cart</h1>

                {/* Loading */}
                <AnimatePresence>
                    {loading && (
                        <motion.p
                            key="loading"
                            className="text-gray-500 text-center flex-1 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Loading cart...
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Empty Cart */}
                {!loading && cart.length === 0 && (
                    <motion.div
                        className="flex-1 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl md:text-2xl text-gray-500">Your cart is empty</h2>
                    </motion.div>
                )}

                {/* Cart Items */}
                <AnimatePresence>
                    {cart.length > 0 && (
                        <motion.div
                            className="flex flex-col"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {cart.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow cursor-pointer"
                                    variants={itemVariants}
                                    layout
                                    exit="exit"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div>
                                        <h2 className="font-semibold text-lg md:text-xl">{item.name}</h2>
                                        <p className="text-gray-500 md:text-md">₹{item.price}</p>
                                    </div>

                                    <button
                                        onClick={() => removeItem(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Remove
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Total & Payment */}
                {cart.length > 0 && !loading && (
                    <motion.div
                        className="mt-10 border-t pt-6 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold">Total: ₹{total}</h2>
                        <motion.button
                            onClick={handlePayment}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg mt-6"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Proceed to Payment
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>

            <Footer />
        </>
    );
}