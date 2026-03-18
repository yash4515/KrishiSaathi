import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockCrops } from '../data/mockData';
import { Plus, Star, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { cropAPI } from '../services/api';

export default function FarmerListings() {
    const { t } = useTranslation();
    const statusOptions = [t('listings_page.all'), t('listings_page.active_status'), t('listings_page.sold'), t('listings_page.draft')];

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMockListings = () => {
        return mockCrops.slice(0, 8).map((c, i) => ({
            ...c,
            status: i < 5 ? t('listings_page.active_status') : i < 7 ? t('listings_page.sold') : t('listings_page.draft'),
            views: Math.floor(Math.random() * 200) + 50,
            listedDate: `2026-03-${String(15 - i).padStart(2, '0')}`,
        }));
    };

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await cropAPI.myListings();
                if (res.data?.success && res.data.data.listings.length > 0) {
                    const mapped = res.data.data.listings.map(c => ({
                        id: c._id,
                        name: c.cropName,
                        quantity: `${c.quantity} ${c.unit}`,
                        priceRange: `₹${c.priceRange.min} - ₹${c.priceRange.max}`,
                        location: c.location,
                        status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
                        image: c.images?.[0]?.url || '🌾',
                        views: Math.floor(Math.random() * 100),
                        rating: 4.5,
                        bids: 0
                    }));
                    setListings(mapped);
                } else {
                    setListings(getMockListings());
                }
            } catch (err) {
                console.error("Failed to fetch listings:", err);
                setListings(getMockListings());
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const filtered = listings.filter(c => {
        const cropName = c.name ? t(`mock.${c.name}`, { defaultValue: c.name }) : '';
        const matchSearch = cropName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === t('listings_page.all') || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const statusColor = {};
    statusColor[t('listings_page.active_status')] = 'badge-green';
    statusColor[t('listings_page.sold')] = 'badge-blue';
    statusColor[t('listings_page.draft')] = 'badge-yellow';

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="page-title">{t('listings_page.my_listings')}</h1>
                    <p className="page-subtitle">{listings.length} {t('listings_page.crops_listed')} • {listings.filter(c => c.status === t('listings_page.active_status')).length} {t('listings_page.active')}</p>
                </div>
                <Link to="/farmer/upload" className="btn-primary flex items-center gap-2 text-sm w-fit">
                    <Plus className="w-4 h-4" /> {t('listings_page.new_listing')}
                </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        className="input-field pl-10 !py-2.5 text-sm"
                        placeholder={t('listings_page.search_listings')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {statusOptions.map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={statusFilter === s ? 'filter-chip-active' : 'filter-chip'}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((c, i) => (
                    <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="card-hover-glow"
                    >
                        <div className="h-36 bg-primary-50 flex items-center justify-center text-5xl overflow-hidden relative">
                            {c.image && c.image.startsWith('/') ? (
                                <img src={c.image} alt={t(`mock.${c.name}`, { defaultValue: c.name })} className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                                c.image
                            )}
                            <span className={`absolute top-3 right-3 ${statusColor[c.status] || 'badge-green'}`}>
                                {c.status}
                            </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{t(`mock.${c.name}`, { defaultValue: c.name })}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{c.quantity} • {t(`mock.${c.location}`, { defaultValue: c.location })}</p>
                            <p className="text-sm font-semibold text-primary-700 mt-1">{c.priceRange}</p>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-500">{c.rating} • {c.bids} {t('marketplace_page.bids')}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Eye className="w-3 h-3" /> {c.views}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button className="flex-1 py-2 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 flex items-center justify-center gap-1 transition-colors">
                                    <Edit className="w-3.5 h-3.5" /> {t('listings_page.edit')}
                                </button>
                                <button className="flex-1 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" /> {t('listings_page.remove')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-lg font-semibold text-gray-700">{t('listings_page.no_listings')}</p>
                    <p className="text-gray-500 text-sm mt-1">{t('listings_page.no_listings_hint')}</p>
                </div>
            )}
        </DashboardLayout>
    );
}
