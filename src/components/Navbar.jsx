import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

// Logo component
const Logo = () => (
    <span className="text-2xl md:text-3xl font-extrabold flex items-center">
        Chocolate Shop 
    </span>
);

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Listen to auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setMenuOpen(false); // reset menu when user logs in/out
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setMenuOpen(false);
        navigate("/login");
    };

    const linkHover = { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 300 } };

    return (
        <nav className="bg-amber-800 text-white p-4 relative shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Logo />

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6">
                    {user ? (
                        <>
                            <motion.div whileHover={linkHover}>
                                <Link to="/" className="hover:underline">Home</Link>
                            </motion.div>
                            <motion.div whileHover={linkHover}>
                                <Link to="/contact" className="hover:underline">Contact</Link>
                            </motion.div>
                            <motion.div whileHover={linkHover} className="relative">
                                <Link to="/cart" className="hover:underline">
                                    Cart
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                            </motion.div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Button */}
                <div className="md:hidden">
                    {user ? (
                        <button
                            className="focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && user && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-amber-800 overflow-hidden absolute w-full left-0 top-full z-40"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline text-lg font-medium">
                                Home
                            </Link>
                            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:underline text-lg font-medium">
                                Contact
                            </Link>
                            <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:underline text-lg font-medium relative">
                                Cart
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}