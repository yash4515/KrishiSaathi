import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
    Sprout, LayoutDashboard, Package, Upload, ClipboardList,
    CloudSun, DollarSign, ShoppingCart, Search, Store, Shield,
    MessageCircle, LogOut, Menu, X, ChevronLeft, User
} from 'lucide-react';

const farmerLinks = [
    { to: '/farmer', icon: LayoutDashboard, label: 'navbar.home' },
    { to: '/farmer/listings', icon: Package, label: 'dashboard.my_listings' },
    { to: '/farmer/upload', icon: Upload, label: 'dashboard.upload_crop' },
    { to: '/farmer/orders', icon: ClipboardList, label: 'dashboard.orders' },
    { to: '/marketplace', icon: ShoppingCart, label: 'navbar.marketplace' },
    { to: '/store', icon: Store, label: 'navbar.agri_store' },
    { to: '/insurance', icon: Shield, label: 'navbar.insurance' },
    { to: '/chat', icon: MessageCircle, label: 'dashboard.support' },
];

const buyerLinks = [
    { to: '/buyer', icon: LayoutDashboard, label: 'navbar.home' },
    { to: '/marketplace', icon: ShoppingCart, label: 'navbar.marketplace' },
    { to: '/buyer/orders', icon: ClipboardList, label: 'dashboard.my_orders' },
    { to: '/store', icon: Store, label: 'navbar.agri_store' },
    { to: '/insurance', icon: Shield, label: 'navbar.insurance' },
    { to: '/chat', icon: MessageCircle, label: 'dashboard.support' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const links = user?.role === 'farmer' ? farmerLinks : buyerLinks;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md flex-shrink-0">
                        <Sprout className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && <span className="text-lg font-bold text-primary-800">KrishiSaathi</span>}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft className={`w-4 h-4 text-gray-500 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* User Info */}
            {!collapsed && user && (
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Links */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {links.map(link => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
                            onClick={() => setMobileOpen(false)}
                            title={collapsed ? link.label : undefined}
                        >
                            <link.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span className="text-sm">{t(link.label)}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="sidebar-link text-red-500 hover:bg-red-50 hover:text-red-700 w-full"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm">{t('dashboard.logout')}</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200"
            >
                <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 lg:hidden"
                        >
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <aside
                className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'
                    }`}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
