import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronRight, Loader2, Heart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import API from '../api/axios';

const TenantDashboard = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [propRes, wishRes] = await Promise.all([
                API.get('/properties'),
                API.get('/wishlist')
            ]);
            if (propRes.data.success) setProperties(propRes.data.properties);
            console.log(propRes.data);
            if (wishRes.data.success) {
                // Important: map the ID correctly from the flattened response
                setWishlistIds(wishRes.data.wishlist.map(p => p._id));
            }
        } catch (err) { console.error("Init fetch error", err); }
        finally { setLoading(false); }
    };

    const handleToggleWishlist = async (e, propertyId) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const { data } = await API.post('/wishlist/toggle', { propertyId });
            if (data.success) {
                setWishlistIds(prev => 
                    data.status === 'added' ? [...prev, propertyId] : prev.filter(id => id !== propertyId)
                );
            }
        } catch (err) { console.error("Heart Failed", err); }
    };

    if (loading) return (
        <div className="h-screen bg-black flex flex-col items-center justify-center text-blue-500 gap-4">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Opening Portal...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-black pt-28 px-8 pb-20 text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div className="text-left">
                            <p className="text-blue-500 font-black uppercase tracking-[0.4em] text-15px] mb-3">Solapur Premium Marketplace</p>
                            <h1 className="text-3xl font-black tracking-tighter italic leading-none">Property Hub</h1>
                        </div>
                        
                        <Link to="/profile" className="group relative w-full lg:w-auto">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-[#0a0a0a] border border-white/10 p-3 pr-8 rounded-[2rem] backdrop-blur-xl flex items-center gap-5 hover:border-blue-500/50 transition-all shadow-2xl">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden border border-white/10">
                                        {user?.profilePicture ? <img src={user.profilePicture} className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#0a0a0a] rounded-full">
                                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.25em] mb-1 opacity-80">Welcome back,</p>
                                    <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-none tracking-tight">{user?.name}</h4>
                                    <div className="flex items-center gap-3 mt-2.5">
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-tighter border border-white/5"><Clock size={10} className="text-purple-500"/> Portal Access</div>
                                    </div>
                                </div>
                                <div className="ml-4 bg-white/5 p-2.5 rounded-xl group-hover:bg-blue-600 transition-all border border-white/5"><ChevronRight size={20} className="text-gray-500 group-hover:text-white" /></div>
                            </div>
                        </Link>
                    </div>
                </motion.header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {properties.map((prop) => (
                        <div key={prop._id} className="bg-[#0f0f0f] border border-white/5 rounded-[3.5rem] overflow-hidden group relative hover:border-blue-500/40 transition-all shadow-2xl">
                            <button 
                                onClick={(e) => handleToggleWishlist(e, prop._id)}
                                className="absolute top-8 left-8 z-[100] p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 hover:scale-110 transition-all cursor-pointer"
                            >
                                <Heart size={20} className={wishlistIds.includes(prop._id) ? "fill-red-500 text-red-500" : "text-white"} />
                            </button>

                            <Link to={`/property/${prop._id}`} className="block">
                                <div className="relative h-72 overflow-hidden">
                                    <img src={prop.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute top-8 right-8 bg-black/70 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 font-black text-sm text-blue-400">₹{prop.price?.toLocaleString()}</div>
                                </div>
                                <div className="p-10 text-left">
                                    <h3 className="text-2xl font-black mb-3 truncate group-hover:text-blue-400 transition-colors italic leading-tight">{prop.title}</h3>
                                    <p className="text-gray-500 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><MapPin size={14} className="text-blue-500"/> {prop.location?.city || "Solapur"}</p>
                                    <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8">
                                        <span className="text-sm font-black text-white italic uppercase tracking-widest">{prop.propertyType}</span>
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-white/5"><ChevronRight size={24}/></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;