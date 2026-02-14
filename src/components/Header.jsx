import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReservationForm from './ReservationForm';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [showReserve, setShowReserve] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Dates', path: '/dates' },
        { name: 'Travel', path: '/travel' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
        { name: 'Support', path: '/support' }
    ];

    return (
        <>
            <header
                className={classNames(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out glass-panel rounded-full flex items-center justify-between backdrop-blur-md border border-white/10",
                    {
                        "w-[95%] max-w-7xl py-4 px-8 bg-black/20": !scrolled,
                        "w-[80%] max-w-5xl py-3 px-6 bg-black/60": scrolled
                    }
                )}
            >
                <div className="flex items-center gap-12">
                    <Link to="/" className="font-serif text-white font-bold tracking-widest text-xl flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-serif italic text-lg group-hover:bg-brand-gold transition-colors">T</div>
                        <span>TRAVEL CO.</span>
                    </Link>
                    <nav className="hidden lg:flex gap-8 text-sm font-sans text-white/80">
                        {navItems.map(item => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={classNames(
                                    "hover:text-white transition-colors uppercase tracking-wide text-xs relative group",
                                    { "text-white font-semibold": location.pathname === item.path }
                                )}
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white"></span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="hidden md:block text-white text-sm font-semibold hover:text-brand-gold transition-colors">Login</Link>
                    <button
                        onClick={() => setShowReserve(true)}
                        className="bg-white text-black px-6 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white"
                    >
                        Reserve
                    </button>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-50"
                    >
                        <span className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start pt-36 text-center p-8 lg:hidden"
                    >
                        <nav className="flex flex-col gap-8 h-full pb-10">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-serif text-4xl text-white hover:text-brand-gold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors mt-8 block"
                                >
                                    Login / Signup
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReserve && <ReservationForm onClose={() => setShowReserve(false)} />}
            </AnimatePresence>
        </>
    );
}
