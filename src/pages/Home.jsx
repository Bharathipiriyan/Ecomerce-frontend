import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// Product images
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";

export default function Home() {
    const { addToCart } = useContext(CartContext);
    const [flyingItem, setFlyingItem] = useState(null);

    const products = [
        { id: 1, name: "Dark Chocolate", price: 150, image: image1 },
        { id: 2, name: "Milk Chocolate", price: 120, image: image2 },
        { id: 3, name: "White Chocolate", price: 130, image: image3 },
        { id: 4, name: "Hazelnut Chocolate", price: 180, image: image4 },
        { id: 5, name: "Almond Chocolate", price: 170, image: image5 },
        { id: 6, name: "Strawberry Chocolate", price: 160, image: image6 },
        { id: 7, name: "Coffee Chocolate", price: 140, image: image7 },
        { id: 8, name: "Caramel Chocolate", price: 155, image: image8 },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        setFlyingItem(product);
        setTimeout(() => setFlyingItem(null), 800);
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <Navbar />

            {/* Products Section */}
            <section className="bg-gray-50 pt-8 pb-12 md:pt-12 md:pb-16 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
                        Our Chocolates
                    </h1>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {products.map((p) => (
                            <motion.div
                                key={p.id}
                                className="shadow-lg rounded-lg p-2 md:p-3 bg-white hover:shadow-2xl relative"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="h-36 md:h-40 w-full object-cover rounded-md"
                                />
                                <h2 className="text-lg md:text-xl font-semibold mt-2 md:mt-3">{p.name}</h2>
                                <p className="text-md md:text-lg font-bold mt-1">₹{p.price}</p>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAddToCart(p)}
                                    className="bg-amber-800 text-white px-3 py-1.5 md:px-4 md:py-2 mt-2 md:mt-3 rounded w-full hover:bg-amber-900 transition-colors text-sm md:text-base"
                                >
                                    Add to Cart
                                </motion.button>

                                {/* Flying image animation */}
                                <AnimatePresence>
                                    {flyingItem && flyingItem.id === p.id && (
                                        <motion.img
                                            src={p.image}
                                            alt=""
                                            initial={{ opacity: 1, scale: 1, y: 0 }}
                                            animate={{ y: -200, x: 200, scale: 0, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                            className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 rounded-md z-50 pointer-events-none"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-100 py-10 md:py-12">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                        About Our Chocolates
                    </h2>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        We craft premium chocolates with the finest ingredients.
                        From classic flavors to unique creations, every chocolate is
                        made with love and passion. Enjoy the perfect blend of taste and quality.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}