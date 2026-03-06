import React, { useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import googleLogo from "../assets/googlelogo.png";

export default function Login() {
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) navigate("/home");
        });
        return () => unsubscribe();
    }, []);

    // Google Login handler
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {
            console.error(error);
        }
    };

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" },
        tap: { scale: 0.95 }
    };

    return (
        <>
            <Navbar />

            <motion.div
                className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Card */}
                <motion.div
                    className="bg-white border-2 border-amber-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Description */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome to Chocolate Shop
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg">
                            Login with your Google account to access your cart, track orders, and enjoy sweet deals!
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <motion.button
                        onClick={handleLogin}
                        className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-6 py-3 shadow-md text-gray-800 font-medium hover:bg-gray-100 transition-colors w-full"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <img src={googleLogo} alt="Google logo" className="w-6 h-6 mr-3" />
                        Continue with Google
                    </motion.button>
                </motion.div>
            </motion.div>

            <Footer />
        </>
    );
}