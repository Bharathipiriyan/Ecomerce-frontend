import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Success() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-6xl mb-4"
                >
                    🎉
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful
                </h1>

                {/* Message */}
                <p className="mt-3 text-gray-600">
                    Your chocolate order has been placed successfully
                </p>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="mt-6 bg-amber-700 text-white px-6 py-2 rounded-lg shadow hover:bg-amber-800 transition"
                >
                    Go to Home
                </motion.button>
            </motion.div>

        </div>
    );
}