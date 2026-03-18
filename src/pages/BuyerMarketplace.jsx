import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockCrops } from '../data/mockData';
import { Search, MapPin, Star, ShoppingCart, X, SlidersHorizontal, Phone, Heart } from 'lucide-react';
import { marketAPI } from '../services/api';

export default function BuyerMarketplace() {
    const { t } = useTranslation();
    const categories = [t('common.all'), t('common.grains'), t('common.vegetables'), t('common.fruits'), t('common.pulses'), t('common.spices'), t('common.cash_crops')];

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [showBid, setShowBid] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [cart, setCart] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await marketAPI.list({ limit: 50 });
                if (res.data?.success && res.data.data.listings.length > 0) {
                    const mapped = res.data.data.listings.map(c => ({
                        id: c._id,
                        name: c.cropName,
                        quantity: `${c.quantity} ${c.unit}`,
                        priceRange: `₹${c.priceRange.min} - ₹${c.priceRange.max}`,
                        location: c.location,
                        category: c.category,
                        image: c.images?.[0]?.url || '🌾',
                        rating: 4.8,
                        bids: 0,
                        farmer: c.farmerId?.name || 'Local Farmer'
                    }));
                    setListings(mapped);
                } else {
                    setListings(mockCrops);
                }
            } catch (error) {
                console.error("Failed to fetch marketplace crops:", error);
                setListings(mockCrops);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const filtered = listings.filter(c => {
        const cropName = c.name ? t(`mock.${c.name}`, { defaultValue: c.name }) : '';
        const cropLocation = c.location ? t(`mock.${c.location}`, { defaultValue: c.location }) : '';
        const matchSearch = cropName.toLowerCase().includes(search.toLowerCase()) || cropLocation.toLowerCase().includes(search.toLowerCase());
        const allLabel = t('common.all');
        const matchCat = category === allLabel || c.category === category.toLowerCase().replace(' ', '_');
        return matchSearch && matchCat;
    });

    const toggleSave = (id) => {
        setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const addToCart = (crop) => {
        if (!cart.find(c => c.id === crop.id)) {
            setCart(prev => [...prev, crop]);
        }
    };

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="page-title">🌾 {t('marketplace_page.title')}</h1>
                <p className="page-subtitle">{t('marketplace_page.subtitle')}</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" className="input-field pl-10 !py-2.5 text-sm" placeholder={t('marketplace_page.search_placeholder')}
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {cart.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl text-primary-700 font-semibold text-sm">
                        <ShoppingCart className="w-4 h-4" /> {cart.length} {t('marketplace_page.items_in_cart')}
                    </div>
                )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {categories.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                        className={category === c ? 'filter-chip-active' : 'filter-chip'}>
                        {c}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                        className="card-hover-glow group">
                        <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden relative">
                            {c.image.startsWith('/') ? (
                                <img src={c.image} alt={t(`mock.${c.name}`, { defaultValue: c.name })} loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <span className="text-5xl group-hover:scale-105 transition-transform duration-500">{c.image}</span>
                            )}
                            <button
                                onClick={() => toggleSave(c.id)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                            >
                                <Heart className={`w-4 h-4 ${savedItems.includes(c.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-900">{t(`mock.${c.name}`, { defaultValue: c.name })}</h3>
                                <span className="badge-green text-xs">{c.bids} {t('marketplace_page.bids')}</span>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {t(`mock.${c.location}`, { defaultValue: c.location })}</p>
                            <p className="text-sm text-gray-600 mt-1">{t('farmer_dashboard.qty')}: {c.quantity}</p>
                            <p className="text-sm font-bold text-primary-700 mt-1">{c.priceRange}</p>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-600">{c.rating} • {c.farmer}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => { setShowBid(c); setBidAmount(''); }}
                                    className="flex-1 btn-primary !py-2 text-sm flex items-center justify-center gap-1.5">
                                    <ShoppingCart className="w-4 h-4" /> {t('marketplace_page.bid')}
                                </button>
                                <button onClick={() => addToCart(c)}
                                    className="px-3 py-2 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5" /> {t('marketplace_page.contact')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className="text-xl font-semibold text-gray-700">{t('marketplace_page.no_crops')}</p>
                    <p className="text-gray-500">{t('marketplace_page.no_crops_hint')}</p>
                </div>
            )}

            {/* Bid Modal */}
            {showBid && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowBid(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{t('buttons.place_bid')}</h3>
                            <button onClick={() => setShowBid(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center text-3xl">
                                {showBid.image.startsWith('/') ? (
                                    <img src={showBid.image} alt={t(`mock.${showBid.name}`, { defaultValue: showBid.name })} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{showBid.image}</span>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{t(`mock.${showBid.name}`, { defaultValue: showBid.name })}</p>
                                <p className="text-sm text-gray-500">{showBid.quantity} • {t(`mock.${showBid.location}`, { defaultValue: showBid.location })}</p>
                                <p className="text-sm font-semibold text-primary-700">{showBid.priceRange}</p>
                            </div>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('marketplace_page.your_bid')}</label>
                        <input type="number" className="input-field mb-4" placeholder={t('marketplace_page.enter_bid')}
                            value={bidAmount} onChange={e => setBidAmount(e.target.value)} />
                        <button onClick={async () => {
                            try {
                                await marketAPI.bid({ listingId: showBid.id, bidAmount: Number(bidAmount), message: 'New bid' });
                                alert('Bid placed successfully!');
                            } catch (e) {
                                console.error('Failed to place bid', e);
                                alert(e.response?.data?.message || 'Bid failed check you are logged in and not bidding on your own listing');
                            }
                            setShowBid(null);
                        }} className="btn-primary w-full">{t('marketplace_page.submit_bid')}</button>
                    </motion.div>
                </div>
            )}
        </DashboardLayout>
    );
}
