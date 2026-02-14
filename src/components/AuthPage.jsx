import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => setIsLogin(!isLogin);

    return (
        <section className="min-h-screen bg-[#0c0c0c] flex items-center justify-center relative overflow-hidden pt-22 p-6">
            {/* Background Ambient */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative z-10">

                {/* Visual Side (Image) */}
                <div className="relative hidden md:block h-full min-h-[600px] overflow-hidden bg-black/40">
                    <motion.img
                        key={isLogin ? "login-img" : "signup-img"}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        src={isLogin
                            ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop"
                            : "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop"
                        }
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-12 left-12 right-12">
                        <motion.h2
                            key={isLogin ? "login-text" : "signup-text"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-serif text-4xl text-white mb-4"
                        >
                            {isLogin ? "Welcome Back." : "Begin Your Journey."}
                        </motion.h2>
                        <motion.p
                            key={isLogin ? "login-sub" : "signup-sub"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 0.5 }}
                            className="font-sans text-sm text-white/70 leading-relaxed"
                        >
                            {isLogin
                                ? "Access your curated itineraries and exclusive lifestyle benefits."
                                : "Join a global community of travelers seeking the extraordinary."
                            }
                        </motion.p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-12 md:p-16 flex flex-col justify-center relative">
                    <Link to="/" className="absolute top-8 left-8 text-xs font-sans font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold transition-colors">
                        ← Back to Home
                    </Link>

                    <div className="mb-10 mt-8">
                        <h3 className="font-serif text-3xl text-white mb-2">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </h3>
                        <p className="text-white/50 text-sm font-sans">
                            {isLogin ? 'Enter your details to proceed.' : 'Fill in the form below to join.'}
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, h: 0 }}
                                    animate={{ opacity: 1, h: "auto" }}
                                    exit={{ opacity: 0, h: 0 }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Password</label>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button className="w-full py-4 bg-white text-black font-sans font-bold uppercase tracking-widest rounded-lg hover:bg-brand-gold hover:text-black transition-all duration-300 shadow-lg shadow-white/5">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-white/40 font-sans">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-2 text-white font-bold hover:text-brand-gold transition-colors underline decoration-brand-gold/30 underline-offset-4"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
