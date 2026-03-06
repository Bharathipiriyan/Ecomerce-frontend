import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/CartPage";
import Success from "./pages/SuccessPage";
import Contact from "./pages/Contact";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p className="text-center mt-20 text-gray-500">Checking authentication...</p>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/" element={<Home />} />
                <Route
                    path="/cart"
                    element={user ? <Cart /> : <Navigate to="/login" />}
                />
                <Route
                    path="/success"
                    element={user ? <Success /> : <Navigate to="/login" />}
                />
                <Route path="/contact" element={<Contact />} />
                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;