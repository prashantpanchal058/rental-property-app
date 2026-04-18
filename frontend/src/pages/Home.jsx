import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Home as HomeIcon, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans overflow-hidden">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full z-0" />

            <section className="relative pt-40 pb-20 px-6 text-center z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[15px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8 inline-block">
                        Solapur's Premium Rental Network
                    </span>
                    <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
                        The Future of <br/>
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Smart Living
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 font-medium italic">
                        A secure, private ecosystem for tenants and owners in Solapur. 
                        Login to access the exclusive property marketplace.
                    </p>
                </motion.div>

                {/* ROLE SELECTION CARDS */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
                    <Link to="/tenant/dashboard">
                        <motion.div 
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl group transition-all hover:border-blue-500/50"
                        >
                            <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                                <Search className="text-blue-400" size={32} />
                            </div>
                            <h3 className="text-4xl font-black mb-4 tracking-tighter">Tenant</h3>
                            <p className="text-gray-500 mb-8 font-medium">Find premium flats near WIT & Solapur University with 1-click booking.</p>
                            <div className="flex items-center justify-center gap-2 text-blue-400 font-black text-xs tracking-widest uppercase">
                                Explore Marketplace <ChevronRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/owner/dashboard">
                        <motion.div 
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl group transition-all hover:border-purple-500/50"
                        >
                            <div className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                                <Zap className="text-purple-400" size={32} />
                            </div>
                            <h3 className="text-4xl font-black mb-4 tracking-tighter">Owner</h3>
                            <p className="text-gray-500 mb-8 font-medium">List your properties, track revenue, and manage tenants in one place.</p>
                            <div className="flex items-center justify-center gap-2 text-purple-400 font-black text-xs tracking-widest uppercase">
                                Manage Portfolio <ChevronRight size={16} />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;