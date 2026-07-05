import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp, Users, ShoppingCart, CloudSun,
    Shield, MessageCircle, ArrowRight, CheckCircle, Smartphone,
    Zap, Globe, BarChart3, Leaf, LayoutDashboard, Sprout,
    UserPlus, ClipboardList, Handshake, Store, Tractor
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WaveDivider from '../components/ui/WaveDivider';
import { WheatStalks, GroundHorizon } from '../components/ui/FarmIllustrations';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

/* ── animation presets ── */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};
const stagger = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

/* ─── colour tokens (for inline + dividers) ─── */
const C = {
    cream:     '#FDF6E3',
    creamDark: '#F5ECDA',
    olive50:   '#F4F7F0',
    olive100:  '#E6EDE0',
    olive600:  '#4A6B3A',
    olive800:  '#2E4523',
    footerBg:  '#2C3E2D',
};

export default function LandingPage() {
    const { t } = useTranslation();
    const { user } = useAuth();

    /* ── data ── */
    const features = [
        { icon: TrendingUp, title: t('landing.feature_price_discovery'), desc: t('landing.feature_price_desc') },
        { icon: Users, title: t('landing.feature_buyer_connect'), desc: t('landing.feature_buyer_desc') },
        { icon: ShoppingCart, title: t('landing.feature_marketplace'), desc: t('landing.feature_marketplace_desc') },
        { icon: CloudSun, title: t('landing.feature_weather'), desc: t('landing.feature_weather_desc') },
        { icon: Shield, title: t('landing.feature_insurance'), desc: t('landing.feature_insurance_desc') },
        { icon: MessageCircle, title: t('landing.feature_support'), desc: t('landing.feature_support_desc') },
    ];

    const steps = [
        { num: '01', title: t('landing.step_1_title'), desc: t('landing.step_1_desc'), Icon: UserPlus },
        { num: '02', title: t('landing.step_2_title'), desc: t('landing.step_2_desc'), Icon: ClipboardList },
        { num: '03', title: t('landing.step_3_title'), desc: t('landing.step_3_desc'), Icon: Handshake },
    ];

    const benefits = [
        t('landing.benefit_1'),
        t('landing.benefit_2'),
        t('landing.benefit_3'),
        t('landing.benefit_4'),
        t('landing.benefit_5'),
        t('landing.benefit_6'),
    ];

    return (
        <div style={{ background: C.cream }}>
            <Navbar />

            {/* ═══════════ HERO — Clean with Farmer Illustration ═══════════ */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" style={{ background: C.cream }}>

                {/* Branch decoration — top-right corner */}
                <img
                    src="/photos/branch-decoration.png"
                    alt=""
                    className="hidden lg:block absolute top-0 right-0 w-52 md:w-64 opacity-50 pointer-events-none"
                    style={{ transform: 'scaleX(1)' }}
                    aria-hidden="true"
                />
                {/* Branch decoration — bottom-left corner (mirrored) */}
                <img
                    src="/photos/branch-decoration.png"
                    alt=""
                    className="hidden lg:block absolute bottom-24 left-0 w-44 opacity-30 pointer-events-none"
                    style={{ transform: 'scaleX(-1) rotate(180deg)' }}
                    aria-hidden="true"
                />

                {/* ── Main content ── */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 z-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left: Text */}
                        <motion.div {...fadeUp} className="pt-8 md:pt-16 lg:pt-0">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2 border-primary-300" style={{ background: C.olive50 }}>
                                <img src="/photos/logo.png" alt="" className="w-5 h-5 rounded object-cover" />
                                <span className="text-sm font-semibold text-primary-700">{t('landing.hero_tagline')}</span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-800">
                                {t('landing.hero_title_1')}{' '}
                                <span style={{ color: '#C2714F' }}>
                                    {t('landing.hero_title_2')}
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed" style={{ color: '#5A4A32' }}>
                                {t('landing.hero_desc')}
                            </p>

                            {/* CTAs */}
                            {user ? (
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <Link to={`/${user.role}`} className="group btn-terra text-lg !py-4 !px-8 flex items-center justify-center gap-3">
                                        <LayoutDashboard className="w-6 h-6" /> {t('sidebar.dashboard') || 'Dashboard'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/marketplace" className="group btn-secondary !border-primary-400 text-lg !py-4 !px-8 flex items-center justify-center gap-3">
                                        <ShoppingCart className="w-6 h-6" /> {t('navbar.marketplace')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                        <Link to="/login" className="group btn-terra text-lg !py-4 !px-8 flex items-center justify-center gap-3 shadow-lg">
                                            <Tractor className="w-6 h-6" /> {t('landing.login_farmer')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to="/login" className="group btn-accent text-lg !py-4 !px-8 flex items-center justify-center gap-3">
                                            <Store className="w-6 h-6" /> {t('landing.login_buyer')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                    <p className="text-sm" style={{ color: '#78592F' }}>
                                        {t('landing.new_here')}{' '}
                                        <Link to="/signup" className="font-semibold underline underline-offset-2 hover:opacity-80" style={{ color: '#C2714F' }}>
                                            {t('landing.create_free_account')}
                                        </Link>
                                    </p>
                                </>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-6 md:gap-8 mt-10 p-5 md:p-6 rounded-2xl border-2 border-earth-300 w-fit" style={{ background: 'rgba(245,236,218,0.8)' }}>
                                {[
                                    { val: '50K+', label: t('landing.stats_farmers') },
                                    { val: '₹100Cr+', label: t('landing.stats_volume') },
                                    { val: '200+', label: t('landing.stats_cities') },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-6 md:gap-8">
                                        {i > 0 && <div className="w-px h-10" style={{ background: '#D4B98A' }} />}
                                        <div className="text-center">
                                            <p className="text-xl md:text-2xl font-bold text-primary-700">{s.val}</p>
                                            <p className="text-xs md:text-sm" style={{ color: '#78592F' }}>{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Farmer Field Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:flex justify-center items-center"
                        >
                            <img
                                src="/photos/farmer-field.png"
                                alt="Farmer in rice paddy field"
                                className="w-full max-w-lg drop-shadow-xl"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* ── Ground / Horizon ── */}
                <div className="relative mt-auto">
                    <GroundHorizon />
                </div>
            </section>


            {/* ═══════════ ROLE SELECTION / WELCOME BACK ═══════════ */}
            <WaveDivider colorFrom={C.olive600} colorTo={C.olive50} />

            {user ? (
                <section className="section-padding" style={{ background: C.olive50 }}>
                    <div className="max-w-7xl mx-auto">
                        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
                            <div className="p-8 bg-white rounded-3xl border-2 border-primary-200 shadow-xl text-center relative overflow-hidden">
                                {/* Decorative wheat */}
                                <div className="absolute -top-4 -right-4 opacity-30 rotate-12">
                                    <WheatStalks size={50} />
                                </div>
                                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    {user.role === 'farmer' ? <Tractor className="w-8 h-8 text-white" /> : <Store className="w-8 h-8 text-white" />}
                                </div>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-2">
                                    {t('landing.welcome_back') || 'Welcome back'}, {user.name}!
                                </h2>
                                <p className="mb-6" style={{ color: '#5A4A32' }}>
                                    {t('landing.logged_in_desc') || 'You are logged in. Head to your dashboard to manage your account.'}
                                </p>
                                <Link to={`/${user.role}`} className="inline-flex items-center gap-2 btn-terra text-lg px-8 py-3">
                                    <LayoutDashboard className="w-5 h-5" />
                                    {t('sidebar.dashboard') || 'Dashboard'}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section className="section-padding relative" style={{ background: C.olive50 }}>
                    {/* Decorative wheat stalks on right edge */}
                    <div className="hidden md:block absolute top-8 -right-2 opacity-25">
                        <WheatStalks size={80} />
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <motion.div {...fadeUp} className="text-center mb-12">
                            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{t('landing.join_as')}</span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-800 mt-2 mb-4">{t('landing.choose_role')}</h2>
                            <p style={{ color: '#5A4A32' }} className="max-w-xl mx-auto">{t('landing.choose_role_desc')}</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <motion.div {...stagger} transition={{ delay: 0.1 }}>
                                <Link to="/signup" className="block group p-8 bg-white rounded-3xl border-2 border-earth-200 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                                    <div className="w-16 h-16 rounded-2xl bg-primary-50 border-2 border-primary-200 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                                        <Tractor className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-primary-800 mb-2 group-hover:text-primary-600 transition-colors">{t('landing.im_farmer')}</h3>
                                    <p className="mb-4" style={{ color: '#5A4A32' }}>{t('landing.farmer_desc')}</p>
                                    <ul className="space-y-2 text-sm" style={{ color: '#5A4A32' }}>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-500" /> {t('landing.farmer_feat_1')}</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-500" /> {t('landing.farmer_feat_2')}</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-500" /> {t('landing.farmer_feat_3')}</li>
                                    </ul>
                                    <div className="mt-6 flex items-center font-semibold group-hover:gap-3 transition-all gap-2" style={{ color: '#C2714F' }}>
                                        {t('buttons.get_started')} <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div {...stagger} transition={{ delay: 0.2 }}>
                                <Link to="/signup" className="block group p-8 bg-white rounded-3xl border-2 border-earth-200 hover:border-accent-500 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                                    <div className="w-16 h-16 rounded-2xl bg-accent-50 border-2 border-accent-200 flex items-center justify-center mb-4 group-hover:bg-accent-100 transition-colors">
                                        <Store className="w-8 h-8 text-accent-600" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">{t('landing.im_buyer')}</h3>
                                    <p className="mb-4" style={{ color: '#5A4A32' }}>{t('landing.buyer_desc')}</p>
                                    <ul className="space-y-2 text-sm" style={{ color: '#5A4A32' }}>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-500" /> {t('landing.buyer_feat_1')}</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-500" /> {t('landing.buyer_feat_2')}</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-500" /> {t('landing.buyer_feat_3')}</li>
                                    </ul>
                                    <div className="mt-6 flex items-center text-accent-600 font-semibold group-hover:gap-3 transition-all gap-2">
                                        {t('buttons.get_started')} <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}


            {/* ═══════════ FEATURES ═══════════ */}
            <WaveDivider colorFrom={C.olive50} colorTo={C.cream} variant="hill" />

            <section id="features" className="section-padding relative" style={{ background: C.cream }}>
                {/* Decorative: branch on right edge */}
                <img
                    src="/photos/branch-decoration.png"
                    alt=""
                    className="hidden lg:block absolute bottom-0 -right-4 w-40 opacity-25 pointer-events-none"
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{t('navbar.features')}</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-800 mt-2 mb-4">{t('landing.features_title')}</h2>
                        <p className="max-w-2xl mx-auto" style={{ color: '#5A4A32' }}>{t('landing.features_desc')}</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                {...stagger}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group p-6 rounded-2xl border border-earth-200 bg-white hover:shadow-xl hover:border-primary-300 transition-all duration-300"
                            >
                                {/* Line-art icon in circular outline */}
                                <div className="icon-circle mb-4">
                                    <f.icon />
                                </div>
                                <h3 className="text-lg font-semibold text-primary-800 mb-2">{f.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#5A4A32' }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════ HOW IT WORKS ═══════════ */}
            <WaveDivider colorFrom={C.cream} colorTo={C.creamDark} variant="gentle" />

            <section className="section-padding relative" style={{ background: C.creamDark }}>

                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{t('landing.how_it_works_label')}</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-800 mt-2 mb-4">{t('landing.how_it_works')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Dotted farm trail connecting the steps */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dashed border-primary-300" style={{ transform: 'translateY(-50%)' }} />

                        {steps.map((s, i) => (
                            <motion.div
                                key={s.num}
                                {...stagger}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="relative text-center p-8 bg-white rounded-2xl shadow-md border border-earth-200 z-10"
                            >
                                <div className="icon-circle mx-auto mb-4"><s.Icon /></div>
                                <span className="font-display text-5xl font-bold text-primary-100">{s.num}</span>
                                <h3 className="font-display text-xl font-bold text-primary-800 mt-2 mb-2">{s.title}</h3>
                                <p className="text-sm" style={{ color: '#5A4A32' }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════ BENEFITS ═══════════ */}
            <WaveDivider colorFrom={C.creamDark} colorTo={C.cream} variant="wave" />

            <section className="section-padding relative overflow-hidden" style={{ background: C.cream }}>
                {/* Market illustration decorative */}
                <img
                    src="/photos/market-scene.png"
                    alt=""
                    className="hidden lg:block absolute -left-8 bottom-0 w-72 opacity-15 pointer-events-none"
                    style={{ transform: 'scaleX(-1)' }}
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeUp}>
                            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{t('landing.benefits_label')}</span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-800 mt-2 mb-8">
                                {t('landing.benefits_title')}
                            </h2>
                            <div className="space-y-4">
                                {benefits.map((b, i) => (
                                    <motion.div
                                        key={i}
                                        {...stagger}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                        <span style={{ color: '#5A4A32' }}>{b}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats — clay-pot / organic styled */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 gap-4 relative"
                        >


                            {[
                                { icon: Zap, val: '30%', label: t('landing.higher_income') },
                                { icon: Globe, val: '200+', label: t('landing.mandis_connected') },
                                { icon: BarChart3, val: '₹100Cr', label: t('landing.trade_volume') },
                                { icon: Leaf, val: '15K+', label: t('landing.organic_listings') },
                            ].map((s, i) => (
                                <div key={i} className="rounded-2xl p-6 text-center border-2 border-earth-300 hover:border-primary-400 transition-colors" style={{ background: C.olive50 }}>
                                    <div className="icon-circle mx-auto mb-3" style={{ width: 48, height: 48 }}>
                                        <s.icon style={{ width: 22, height: 22 }} />
                                    </div>
                                    <p className="text-2xl font-bold text-primary-700">{s.val}</p>
                                    <p className="text-sm" style={{ color: '#5A4A32' }}>{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ═══════════ DOWNLOAD APP ═══════════ */}
            <WaveDivider colorFrom={C.cream} colorTo={C.olive600} variant="hill" />

            <section className="section-padding text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.olive600}, ${C.olive800})` }}>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div {...fadeUp} className="text-center">
                        <Smartphone className="w-16 h-16 mx-auto mb-6 opacity-80" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('landing.download_app')}</h2>
                        <p className="max-w-xl mx-auto mb-8 text-lg" style={{ color: '#C8D8BF' }}>
                            {t('landing.download_desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="font-semibold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 bg-white hover:bg-cream" style={{ color: C.olive600 }}>
                                <Smartphone className="w-5 h-5" /> Google Play
                            </button>
                            <button className="bg-white/10 border-2 border-white/30 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                                <Smartphone className="w-5 h-5" /> App Store
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Wave into footer */}
            <WaveDivider colorFrom={C.olive800} colorTo={C.footerBg} variant="gentle" />

            <Footer />
        </div>
    );
}
