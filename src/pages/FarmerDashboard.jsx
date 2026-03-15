import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { mockCrops, mockOrders, mockWeather } from '../data/mockData';
import {
    Package, DollarSign, ShoppingCart, TrendingUp, Upload,
    Cloud, Droplets, Wind, Plus, Star, Edit, Trash2,
    CheckCircle, Clock, Truck, FileCheck
} from 'lucide-react';

export default function FarmerDashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [tab, setTab] = useState('overview');
    const [uploadForm, setUploadForm] = useState({
        name: '', quantity: '', minPrice: '', maxPrice: '', description: ''
    });
    const myListings = mockCrops.slice(0, 4);

    const statCards = [
        { label: t('dashboard.total_earnings'), value: '₹2,45,000', change: '+12%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: t('dashboard.active_listings'), value: '8', change: '+2', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: t('dashboard.total_orders'), value: '24', change: '+5', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: t('dashboard.market_rank'), value: 'Top 15%', change: '↑3', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900">
                    Welcome back, {user?.name || 'Farmer'} 👋
                </motion.h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your farm today.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['overview', 'listings', 'upload', 'orders'].map(tabName => (
                    <button key={tabName} onClick={() => setTab(tabName)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all capitalize ${tab === tabName ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}>{tabName === 'upload' ? t('dashboard.add_crop') : tabName === 'listings' ? t('dashboard.my_crops') : tabName === 'orders' ? t('dashboard.orders') : t('dashboard.overview')}</button>
                ))}
            </div>

            {/* ──── OVERVIEW TAB ──── */}
            {tab === 'overview' && (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {statCards.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} className="stat-card">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                                        <s.icon className={`w-5 h-5 ${s.color}`} />
                                    </div>
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{s.change}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                                <p className="text-sm text-gray-500">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Weather + Earnings */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-8">
                        {/* Weather */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2"><Cloud className="w-5 h-5" /> {t('dashboard.weather')}</h3>
                                    <p className="text-blue-100 text-sm">{mockWeather.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-4xl font-bold">{mockWeather.temp}°C</p>
                                    <p className="text-blue-100 text-sm">{mockWeather.condition}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mb-4 text-sm text-blue-100">
                                <span className="flex items-center gap-1"><Droplets className="w-4 h-4" /> {mockWeather.humidity}%</span>
                                <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> {mockWeather.wind}</span>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {mockWeather.forecast.map(f => (
                                    <div key={f.day} className="text-center bg-white/10 rounded-xl py-2 px-1">
                                        <p className="text-xs text-blue-100">{f.day}</p>
                                        <p className="text-lg my-1">{f.icon}</p>
                                        <p className="text-xs font-semibold">{f.high}°</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Earnings */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                            <h3 className="font-semibold text-lg text-gray-900 mb-4">Earnings Overview</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'This Week', amount: '₹45,200', pct: 75 },
                                    { label: 'This Month', amount: '₹1,82,000', pct: 60 },
                                    { label: 'Last Month', amount: '₹2,10,000', pct: 85 },
                                ].map(e => (
                                    <div key={e.label}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">{e.label}</span>
                                            <span className="font-semibold text-gray-800">{e.amount}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${e.pct}%` }}
                                                transition={{ delay: 0.5, duration: 0.8 }}
                                                className="h-full gradient-primary rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm text-gray-500">{t('dashboard.total_earnings')}</span>
                                <span className="text-xl font-bold text-primary-700">₹2,45,000</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recent Orders */}
                    <OrdersTable orders={mockOrders.slice(0, 3)} onViewAll={() => setTab('orders')} />
                </>
            )}

            {/* ──── MY LISTINGS TAB ──── */}
            {tab === 'listings' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {myListings.map((c, i) => (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="h-32 bg-primary-50 flex items-center justify-center text-5xl">{c.image}</div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900">{c.name}</h3>
                                <p className="text-sm text-gray-500">{c.quantity} • {c.location}</p>
                                <p className="text-sm font-semibold text-primary-700 mt-1">{c.priceRange}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-500">{c.rating} • {c.bids} bids</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 py-2 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 flex items-center justify-center gap-1">
                                        <Edit className="w-3.5 h-3.5" /> Edit
                                    </button>
                                    <button className="flex-1 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1">
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ──── UPLOAD TAB ──── */}
            {tab === 'upload' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-primary-600" /> {t('dashboard.add_crop')}
                        </h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop Name</label>
                                <input type="text" className="input-field" placeholder="e.g. Organic Wheat"
                                    value={uploadForm.name} onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (kg)</label>
                                <input type="number" className="input-field" placeholder="e.g. 500"
                                    value={uploadForm.quantity} onChange={e => setUploadForm({ ...uploadForm, quantity: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Price (₹/qt)</label>
                                    <input type="number" className="input-field" placeholder="2200"
                                        value={uploadForm.minPrice} onChange={e => setUploadForm({ ...uploadForm, minPrice: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Price (₹/qt)</label>
                                    <input type="number" className="input-field" placeholder="2500"
                                        value={uploadForm.maxPrice} onChange={e => setUploadForm({ ...uploadForm, maxPrice: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                <textarea className="input-field h-24 resize-none" placeholder="Describe crop quality, grade..."
                                    value={uploadForm.description} onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Images</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
                                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload crop images</p>
                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                                </div>
                            </div>
                            <button type="button" className="btn-primary w-full flex items-center justify-center gap-2">
                                <Upload className="w-5 h-5" /> Publish Listing
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}

            {/* ──── ORDERS TAB ──── */}
            {tab === 'orders' && <OrdersTable orders={mockOrders} full />}
        </DashboardLayout>
    );
}

const statusCfg = {
    confirmed: { icon: CheckCircle, cls: 'text-green-600 bg-green-50', label: 'Confirmed' },
    pending: { icon: Clock, cls: 'text-yellow-600 bg-yellow-50', label: 'Pending' },
    shipped: { icon: Truck, cls: 'text-blue-600 bg-blue-50', label: 'Shipped' },
    delivered: { icon: FileCheck, cls: 'text-purple-600 bg-purple-50', label: 'Delivered' },
};

function OrdersTable({ orders, onViewAll, full }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-900">{full ? 'All Orders' : 'Recent Orders'}</h3>
                {onViewAll && <button onClick={onViewAll} className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {(full ? ['#', 'Crop', 'Buyer', 'Qty', 'Price', 'Status', 'Date'] : ['Crop', 'Buyer', 'Qty', 'Price', 'Status', 'Date']).map(h => (
                                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map(o => {
                            const s = statusCfg[o.status];
                            return (
                                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                    {full && <td className="px-6 py-4 text-sm text-gray-400">#{o.id}</td>}
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{o.crop}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{o.buyer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{o.quantity}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{o.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
                                            <s.icon className="w-3.5 h-3.5" /> {s.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{o.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
