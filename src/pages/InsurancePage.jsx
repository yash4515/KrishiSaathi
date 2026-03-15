import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockInsurancePlans } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, Star, X, ArrowRight } from 'lucide-react';

export default function InsurancePage() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ {t('insurance.title')}</h1>
                    <p className="text-gray-500 mb-8">{t('insurance.desc')}</p>
                </motion.div>

                {/* Plans */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockInsurancePlans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white rounded-2xl shadow-md border-2 overflow-hidden relative ${plan.popular ? 'border-primary-500' : 'border-gray-100'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" /> {t('insurance.popular')}
                                    </span>
                                </div>
                            )}
                            <div className={`p-6 ${plan.popular ? 'bg-primary-50' : 'bg-gray-50'}`}>
                                <Shield className={`w-10 h-10 mb-3 ${plan.popular ? 'text-primary-600' : 'text-gray-500'}`} />
                                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{plan.duration}</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-2xl font-bold text-gray-900">{plan.premium}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{t('insurance.coverage')}: <span className="font-semibold text-gray-700">{plan.coverage}</span></p>

                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('insurance.covered_crops')}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {plan.crops.map(c => (
                                            <span key={c} className="badge-green">{c}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {plan.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelected(plan)}
                                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${plan.popular
                                            ? 'btn-primary'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {t('buttons.apply_now')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Apply Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Apply for Insurance</h3>
                            <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-4 bg-primary-50 rounded-xl mb-4">
                            <p className="font-semibold text-gray-900">{selected.name}</p>
                            <p className="text-sm text-gray-600">{selected.premium} • {selected.coverage}</p>
                        </div>
                        <form className="space-y-3">
                            <input type="text" className="input-field" placeholder="Full Name" />
                            <input type="text" className="input-field" placeholder="Aadhaar Number" />
                            <input type="text" className="input-field" placeholder="Land Area (acres)" />
                            <select className="input-field">
                                <option>Select Crop</option>
                                {selected.crops.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <button type="button" onClick={() => setSelected(null)} className="btn-primary w-full">{t('buttons.submit_application')}</button>
                        </form>
                    </motion.div>
                </div>
            )}

            <Footer />
        </div>
    );
}
