import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockOrders } from '../data/mockData';
import { CheckCircle, Clock, Truck, FileCheck, Search, Download, Eye } from 'lucide-react';

export default function BuyerOrders() {
    const { t } = useTranslation();

    const statusCfg = {
        confirmed: { icon: CheckCircle, cls: 'text-green-600 bg-green-50', label: t('orders_page.confirmed'), step: 2 },
        pending: { icon: Clock, cls: 'text-yellow-600 bg-yellow-50', label: t('orders_page.pending'), step: 1 },
        shipped: { icon: Truck, cls: 'text-blue-600 bg-blue-50', label: t('orders_page.shipped'), step: 3 },
        delivered: { icon: FileCheck, cls: 'text-purple-600 bg-purple-50', label: t('orders_page.delivered'), step: 4 },
    };

    const timelineSteps = [
        { label: t('orders_page.order_placed'), icon: Clock },
        { label: t('orders_page.confirmed'), icon: CheckCircle },
        { label: t('orders_page.shipped'), icon: Truck },
        { label: t('orders_page.delivered'), icon: FileCheck },
    ];

    const allOrders = [
        ...mockOrders,
        { id: 5, crop: 'Alphonso Mango', buyer: 'FruitKart', quantity: '300 kg', price: '₹6,200/qt', status: 'confirmed', date: '2026-03-04' },
        { id: 6, crop: 'Turmeric', buyer: 'SpiceLand', quantity: '100 kg', price: '₹8,500/qt', status: 'delivered', date: '2026-03-01' },
    ];

    const statusFilters = ['All', 'pending', 'confirmed', 'shipped', 'delivered'];

    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filtered = allOrders.filter(o => {
        const matchStatus = filter === 'All' || o.status === filter;
        const cropName = t(`mock.${o.crop}`, { defaultValue: o.crop });
        const matchSearch = cropName.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="page-title">{t('orders_page.my_orders')}</h1>
                <p className="page-subtitle">{allOrders.length} {t('orders_page.orders_subtitle')}</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" className="input-field pl-10 !py-2.5 text-sm" placeholder={t('orders_page.search_orders')}
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {statusFilters.map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={filter === s ? 'filter-chip-active' : 'filter-chip'}>
                            {s === 'All' ? t('orders_page.all') : statusCfg[s]?.label || s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders */}
            <div className="space-y-4">
                {filtered.map((o, i) => {
                    const s = statusCfg[o.status];
                    return (
                        <motion.div key={o.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
                                        🌾
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{t(`mock.${o.crop}`, { defaultValue: o.crop })}</p>
                                        <p className="text-sm text-gray-500">{o.quantity} • {o.price}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{t('orders_page.ordered_on')} {o.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${s.cls}`}>
                                        <s.icon className="w-3.5 h-3.5" /> {s.label}
                                    </span>
                                    <button onClick={() => setSelectedOrder(o)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={t('orders_page.order_details')}>
                                        <Eye className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={t('orders_page.download_invoice')}>
                                        <Download className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Mini Timeline */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    {timelineSteps.map((step, idx) => {
                                        const currentStep = s.step;
                                        const isCompleted = idx + 1 <= currentStep;
                                        return (
                                            <div key={step.label} className="flex flex-col items-center flex-1 relative">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary-100' : 'bg-gray-100'}`}>
                                                    <step.icon className={`w-3.5 h-3.5 ${isCompleted ? 'text-primary-600' : 'text-gray-400'}`} />
                                                </div>
                                                <span className={`text-[10px] mt-1 ${isCompleted ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>{step.label}</span>
                                                {idx < timelineSteps.length - 1 && (
                                                    <div className={`absolute top-3.5 left-[calc(50%+14px)] w-[calc(100%-28px)] h-0.5 ${idx + 1 < currentStep ? 'bg-primary-400' : 'bg-gray-200'}`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">📋</p>
                    <p className="text-lg font-semibold text-gray-700">{t('orders_page.no_orders')}</p>
                    <p className="text-gray-500 text-sm mt-1">{t('orders_page.no_orders_hint')}</p>
                </div>
            )}

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-900">{t('orders_page.order_details')} #{selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                                <span className="text-gray-400 text-xl">&times;</span>
                            </button>
                        </div>
                        <div className="space-y-3 mb-6">
                            {[
                                { label: t('orders_page.crop'), value: t(`mock.${selectedOrder.crop}`, { defaultValue: selectedOrder.crop }) },
                                { label: t('orders_page.quantity'), value: selectedOrder.quantity },
                                { label: t('orders_page.price'), value: selectedOrder.price },
                                { label: t('orders_page.seller'), value: selectedOrder.buyer },
                                { label: t('orders_page.order_date'), value: selectedOrder.date },
                                { label: t('farmer_dashboard.status'), value: statusCfg[selectedOrder.status].label },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">{row.label}</span>
                                    <span className="text-sm font-medium text-gray-800">{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
                            <Download className="w-4 h-4" /> {t('orders_page.download_invoice')}
                        </button>
                    </motion.div>
                </div>
            )}
        </DashboardLayout>
    );
}
