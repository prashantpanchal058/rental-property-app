import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
    LogOut, 
    Home, 
    User, 
    PlusCircle, 
    LayoutDashboard, 
    Bell, 
    Menu, 
    X,
    Settings
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => { 
        logout(); 
        navigate('/'); 
    };

    // Determine the dashboard link based on exact role naming
    const getDashboardLink = () => {
        if (!user) return '/';
        return user.role === 'Tenant' ? '/tenant/dashboard' : '/owner/dashboard';
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-black/40 border-b border-white/10 px-8 py-5">
            <div className="mx-auto flex justify-between items-center">
                
                {/* BRAND LOGO */}
                <Link to="/" className="group flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-xl shadow-blue-500/20">
                        <Home size={20} className="text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic text-white">PropertyHub</span>
                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-10">
                    <Link to="/" className={`text-lg font-black text-white uppercase tracking-widest transition-colors`}>
                        Home
                    </Link>
                    
                    {user ? (
                        <div className="flex items-center gap-8">
                            {/* PORTAL LINK: Takes Tenant to Marketplace / Owner to Portfolio */}
                            <Link 
                                to={getDashboardLink()} 
                                className={`text-lg text-white uppercase tracking-widest flex items-center gap-2 transition-colors}`}
                            >
                                <LayoutDashboard size={14} /> My Portal
                            </Link>

                            {/* USER PROFILE SECTION */}
                            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                                <div className="flex flex-col items-end">
                                    <Link to="/profile" className={`text-[15px] font-bold leading-none transition-colors ${location.pathname === '/profile' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}>
                                        {user.name}
                                    </Link>
                                    <span className="text-[15px] uppercase tracking-tighter text-blue-400 font-black mt-1 opacity-80">
                                        {user.role}
                                    </span>
                                </div>
                                
                                {/* DYNAMIC AVATAR */}
                                <Link to="/profile" className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500 transition-all shadow-lg">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-blue-400 font-black text-xs">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}
                                </Link>

                                <button 
                                    onClick={handleLogout} 
                                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="px-8 py-3 bg-white text-black rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-blue-400 hover:text-white transition-all uppercase shadow-xl">
                            Secure Login
                        </Link>
                    )}
                </div>

                {/* MOBILE MENU TOGGLE (Placeholder logic) */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;