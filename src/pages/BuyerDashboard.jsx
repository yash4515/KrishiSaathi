import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { mockCrops, mockOrders } from '../data/mockData';
import { ShoppingCart, TrendingUp, Package, DollarSign, Search, Star, MapPin, Eye } from 'lucide-react';

const statCards = [
    { label: 'Active Bids', value: '12', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Won Bids', value: '8', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Orders', value: '15', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Spent', value: '₹3,80,000', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function BuyerDashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const filtered = mockCrops.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <DashboardLayout>
            <div className="mb-8">
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold text-gray-900">
                    Welcome, {user?.name || 'Buyer'} 🏪
                </motion.h1>
                <p className="text-gray-500 mt-1">Find the best crops from verified farmers.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                                <s.icon className={`w-5 h-5 ${s.color}`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                        <p className="text-sm text-gray-500">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Search */}
            <div className="mb-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Search</h3>
                <div className="relative max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" className="input-field pl-11" placeholder="Search crops..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            {/* Recommended Crops */}
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Recommended Crops</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {filtered.slice(0, 8).map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-28 bg-primary-50 flex items-center justify-center text-4xl">{c.image}</div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900">{c.name}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {c.location}</p>
                            <p className="text-sm font-semibold text-primary-700 mt-1">{c.priceRange}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs text-gray-500">{c.rating} • by {c.farmer}</span>
                            </div>
                            <button className="btn-primary w-full mt-3 !py-2 text-sm">{t('buttons.place_bid')}</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-lg text-gray-900">My Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Crop', 'Farmer', 'Qty', 'Price', 'Status'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockOrders.map(o => (
                                <tr key={o.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{o.crop}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{o.buyer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{o.quantity}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{o.price}</td>
                                    <td className="px-6 py-4"><span className={`badge-${o.status === 'confirmed' || o.status === 'delivered' ? 'green' : o.status === 'pending' ? 'yellow' : 'blue'}`}>{o.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
