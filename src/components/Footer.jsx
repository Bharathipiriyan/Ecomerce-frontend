import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                {/* Copyright */}
                <p className="text-center md:text-left text-base md:text-lg lg:text-xl font-light">
                    &copy; {new Date().getFullYear()} Bharathi. All rights reserved.
                </p>

                {/* Social icons */}
                <div className="flex space-x-6">
                    <a href="https://instagram.com/_bharathii_____" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                        <FaInstagram size={26} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                        <FaFacebook size={26} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
                        <FaTwitter size={26} />
                    </a>
                </div>

                {/* Optional tagline for mobile */}
                <p className="text-gray-300 text-base md:hidden mt-2 text-center">
                    Follow us for updates and offers!
                </p>
            </div>
        </footer>
    );
}