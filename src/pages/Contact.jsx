import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // OPTIONAL: Send data to backend
        // await axios.post("http://localhost:5000/api/contact", form);

        alert("Message Sent Successfully 🍫");
        setForm({ name: "", email: "", message: "" });
    };

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <>
            <Navbar />

            <motion.section
                className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md md:max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                        Contact Us 
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                            whileFocus={{ scale: 1.02 }}
                        />

                        <motion.input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                            whileFocus={{ scale: 1.02 }}
                        />

                        <motion.textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                            whileFocus={{ scale: 1.02 }}
                        ></motion.textarea>

                        <motion.button
                            type="submit"
                            className="w-full bg-amber-800 text-white py-2 rounded hover:bg-amber-900"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.section>

            <Footer />
        </>
    );
}