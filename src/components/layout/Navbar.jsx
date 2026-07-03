import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
    Menu, X, Sprout, LogIn, UserPlus, LogOut,
    LayoutDashboard, ShoppingCart, Shield, MessageCircle,
    ChevronDown, User
} from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const isDashboard = location.pathname.startsWith('/farmer') || location.pathname.startsWith('/buyer');

    const publicLinks = [
        { to: '/#features', label: t('navbar.features') },
        { to: '/marketplace', label: t('navbar.marketplace') },
        { to: '/store', label: t('navbar.agri_store') },
        { to: '/insurance', label: t('navbar.insurance') },
        { to: '/newsletter', label: t('navbar.samachar') || '📰 Newsletter' },
        { to: '/detect', label: t('navbar.detect') },
    ];



    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    if (isDashboard) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo — earthy countryside style */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display text-xl font-bold text-primary-800 group-hover:text-primary-600 transition-colors">
                            KrishiSaathi
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {publicLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
                                style={{ color: '#5A4A32' }}
                                onMouseEnter={e => { e.target.style.color = '#C2714F'; e.target.style.background = 'rgba(244,247,240,0.8)'; }}
                                onMouseLeave={e => { e.target.style.color = '#5A4A32'; e.target.style.background = 'transparent'; }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="h-4 w-px mx-1" style={{ background: '#D4B98A' }}></div>
                        <LanguageSwitcher />
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: '#5A4A32' }}>{user.name}</span>
                                    <ChevronDown className="w-4 h-4" style={{ color: '#8B6B4A' }} />
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-earth-200 py-2 z-50"
                                        >
                                            <Link to={`/${user.role}`} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary-50 transition-colors" style={{ color: '#5A4A32' }} onClick={() => setDropdownOpen(false)}>
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </Link>
                                            <Link to="/marketplace" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary-50 transition-colors" style={{ color: '#5A4A32' }} onClick={() => setDropdownOpen(false)}>
                                                <ShoppingCart className="w-4 h-4" /> Marketplace
                                            </Link>
                                            <Link to="/chat" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary-50 transition-colors" style={{ color: '#5A4A32' }} onClick={() => setDropdownOpen(false)}>
                                                <MessageCircle className="w-4 h-4" /> Support
                                            </Link>
                                            <hr className="my-1" style={{ borderColor: '#E6EDE0' }} />
                                            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                                                <LogOut className="w-4 h-4" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all" style={{ color: '#5A4A32' }}>
                                    <LogIn className="w-4 h-4" /> {t('navbar.login')}
                                </Link>
                                <Link to="/signup" className="btn-terra text-sm !py-2 !px-5 flex items-center gap-2 !rounded-full">
                                    <UserPlus className="w-4 h-4" /> {t('navbar.signup')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X className="w-6 h-6" style={{ color: '#3B2F1E' }} /> : <Menu className="w-6 h-6" style={{ color: '#3B2F1E' }} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t"
                        style={{ background: '#FDF6E3', borderColor: '#E6EDE0' }}
                    >
                        <div className="px-4 py-4 space-y-1">
                            <div className="flex justify-center mb-4">
                                <LanguageSwitcher />
                            </div>
                            {publicLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary-50 transition-colors"
                                    style={{ color: '#5A4A32' }}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2" style={{ borderColor: '#E6EDE0' }} />
                            {user ? (
                                <>
                                    <Link to={`/${user.role}`} className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary-50" style={{ color: '#5A4A32' }} onClick={() => setOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button onClick={() => { handleLogout(); setOpen(false); }} className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary-50" style={{ color: '#5A4A32' }} onClick={() => setOpen(false)}>
                                        {t('navbar.login')}
                                    </Link>
                                    <Link to="/signup" className="block px-4 py-3 text-sm font-medium text-white bg-terra rounded-xl text-center" style={{ background: '#C2714F' }} onClick={() => setOpen(false)}>
                                        {t('navbar.signup')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
