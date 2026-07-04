import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockCrops } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, MapPin, Star, ShoppingCart, X, Sprout } from 'lucide-react';

export default function MarketplacePage() {
    const { t } = useTranslation();
    const categories = [t('common.all'), t('common.grains'), t('common.vegetables'), t('common.fruits'), t('common.pulses'), t('common.spices'), t('common.cash_crops')];

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [showBid, setShowBid] = useState(null);
    const [bidAmount, setBidAmount] = useState('');

    const filtered = mockCrops.filter(c => {
        const cropName = t(`mock.${c.name}`, { defaultValue: c.name });
        const cropLocation = t(`mock.${c.location}`, { defaultValue: c.location });
        const matchSearch = cropName.toLowerCase().includes(search.toLowerCase()) || cropLocation.toLowerCase().includes(search.toLowerCase());
        const allLabel = t('common.all');
        const matchCat = category === allLabel || c.category === category.toLowerCase().replace(' ', '_');
        return matchSearch && matchCat;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">{t('marketplace_page.crop_marketplace')}</h1>
                    <p className="text-gray-500 mb-6">{t('marketplace_page.subtitle')}</p>
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" className="input-field pl-11" placeholder={t('marketplace_page.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(c => (
                            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${category === c ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((c, i) => (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                            <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden">
                                {c.image && c.image.startsWith('/') ? (
                                    <img src={c.image} alt={t(`mock.${c.name}`, { defaultValue: c.name })} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <Sprout className="w-12 h-12 text-primary-500 group-hover:scale-105 transition-transform duration-500" />
                                )}
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
                                <button onClick={() => { setShowBid(c); setBidAmount(''); }} className="btn-primary w-full mt-3 !py-2.5 text-sm flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-4 h-4" /> {t('buttons.place_bid')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center justify-center">
                        <Search className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-xl font-semibold text-gray-700">{t('marketplace_page.no_crops')}</p>
                        <p className="text-gray-500">{t('marketplace_page.no_crops_hint')}</p>
                    </div>
                )}
            </div>

            {/* Bid Modal */}
            {showBid && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowBid(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{t('buttons.place_bid')}</h3>
                            <button onClick={() => setShowBid(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center text-3xl">
                                {showBid.image && showBid.image.startsWith('/') ? (
                                    <img src={showBid.image} alt={t(`mock.${showBid.name}`, { defaultValue: showBid.name })} className="w-full h-full object-cover" />
                                ) : (
                                    <Sprout className="w-10 h-10 text-primary-500" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{t(`mock.${showBid.name}`, { defaultValue: showBid.name })}</p>
                                <p className="text-sm text-gray-500">{showBid.quantity} • {t(`mock.${showBid.location}`, { defaultValue: showBid.location })}</p>
                                <p className="text-sm font-semibold text-primary-700">{showBid.priceRange}</p>
                            </div>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('marketplace_page.your_bid_per_qt')}</label>
                        <input type="number" className="input-field mb-4" placeholder={t('marketplace_page.enter_bid')} value={bidAmount} onChange={e => setBidAmount(e.target.value)} />
                        <button onClick={() => setShowBid(null)} className="btn-primary w-full">{t('marketplace_page.submit_bid')}</button>
                    </motion.div>
                </div>
            )}

            <Footer />
        </div>
    );
}
