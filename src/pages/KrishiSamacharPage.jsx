import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, ChevronRight, Newspaper, Landmark, AlertTriangle, TrendingUp, Sun, FileText } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockSchemes, mockNews } from '../data/mockData';

export default function KrishiSamacharPage() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('schemes'); // 'schemes' or 'news'

    const filteredSchemes = mockSchemes.filter(scheme =>
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredNews = mockNews.filter(news =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stagger = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const getNewsIcon = (category) => {
        switch (category) {
            case 'Policy': return <Landmark className="w-5 h-5 text-purple-500" />;
            case 'Weather': return <Sun className="w-5 h-5 text-orange-500" />;
            case 'Price Alert': return <TrendingUp className="w-5 h-5 text-green-500" />;
            default: return <FileText className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-24 pb-12 bg-gradient-to-br from-primary-800 to-primary-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-6">
                        <Newspaper className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">
                        {t('samachar.title')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-primary-100 max-w-2xl mx-auto text-lg">
                        {t('samachar.subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full -mt-8 relative z-20">
                
                {/* Search and Tabs Container */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                            placeholder={t('samachar.search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('schemes')}
                            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'schemes' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {t('samachar.tab_schemes')}
                        </button>
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'news' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {t('samachar.tab_news')}
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {activeTab === 'schemes' ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredSchemes.map((scheme, index) => (
                                <motion.div
                                    key={scheme.id}
                                    variants={stagger}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all overflow-hidden flex flex-col h-full group"
                                >
                                    <div className="p-6 flex-grow">
                                        <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform bg-gradient-to-br from-primary-50 to-primary-100">
                                            {scheme.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{scheme.description}</p>
                                        
                                        <div className="space-y-3">
                                            <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                                                <span className="text-xs font-semibold text-green-700 uppercase tracking-wider block mb-1">{t('samachar.eligibility')}</span>
                                                <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                                            </div>
                                            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">{t('samachar.benefits')}</span>
                                                <p className="text-sm text-gray-700">{scheme.benefits}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-50 bg-gray-50/50 mt-auto">
                                        <a
                                            href={scheme.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full btn-primary !py-2.5 flex items-center justify-center gap-2"
                                        >
                                            {t('samachar.learn_more')} <ChevronRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                            {filteredSchemes.length === 0 && (
                                <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
                                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-lg">{t('samachar.no_results')}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredNews.map((news, index) => (
                                <motion.div
                                    key={news.id}
                                    variants={stagger}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all p-6 flex flex-col h-full group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                                            ${news.category === 'Policy' ? 'bg-purple-50 text-purple-700' :
                                              news.category === 'Weather' ? 'bg-orange-50 text-orange-700' :
                                              news.category === 'Price Alert' ? 'bg-green-50 text-green-700' :
                                              'bg-blue-50 text-blue-700'}
                                        `}>
                                            {getNewsIcon(news.category)}
                                            {news.category}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{news.date}</span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform origin-left">{news.icon}</span>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">{news.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm flex-grow leading-relaxed">{news.summary}</p>
                                    
                                    <button className="text-primary-600 font-medium text-sm mt-4 flex items-center gap-1 hover:text-primary-700 self-start group/btn">
                                        {t('samachar.learn_more')} <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))}
                            {filteredNews.length === 0 && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
                                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-lg">{t('samachar.no_results')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
