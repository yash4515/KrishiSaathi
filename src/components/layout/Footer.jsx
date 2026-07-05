import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FarmHut, TreeSilhouette } from '../ui/FarmIllustrations';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer style={{ background: '#2C3E2D' }} className="text-white relative overflow-hidden">
            {/* Decorative silhouettes at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 opacity-10 pointer-events-none">
                <TreeSilhouette size={50} style={{ filter: 'brightness(3)' }} />
                <FarmHut size={45} style={{ filter: 'brightness(3)' }} />
                <TreeSilhouette size={60} style={{ filter: 'brightness(3)' }} />
                <FarmHut size={40} style={{ filter: 'brightness(3)' }} />
                <TreeSilhouette size={55} style={{ filter: 'brightness(3)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/photos/logo.png" alt="KrishiSaathi Logo" className="w-10 h-10 rounded-xl object-cover" style={{ filter: 'brightness(1.3)' }} />
                            <span className="font-display text-xl font-bold text-white">KrishiSaathi</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#A3BF94' }}>
                            {t('footer.desc')}
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                                    style={{ borderColor: 'rgba(163,191,148,0.3)', color: '#A3BF94' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C2714F'; e.currentTarget.style.color = '#C2714F'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(163,191,148,0.3)'; e.currentTarget.style.color = '#A3BF94'; }}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.quick_links')}</h4>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/marketplace', label: 'navbar.marketplace' },
                                { to: '/store', label: 'navbar.agri_store' },
                                { to: '/insurance', label: 'navbar.insurance' },
                                { to: '/chat', label: 'dashboard.support' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm transition-colors"
                                        style={{ color: '#A3BF94' }}
                                        onMouseEnter={e => e.target.style.color = 'white'}
                                        onMouseLeave={e => e.target.style.color = '#A3BF94'}
                                    >
                                        {t(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.support_title')}</h4>
                        <ul className="space-y-2.5">
                            {[
                                { key: 'footer.help_center' },
                                { key: 'footer.privacy' },
                                { key: 'footer.terms' },
                                { key: 'footer.faqs' },
                            ].map(item => (
                                <li key={item.key}>
                                    <a
                                        href="#"
                                        className="text-sm transition-colors"
                                        style={{ color: '#A3BF94' }}
                                        onMouseEnter={e => e.target.style.color = 'white'}
                                        onMouseLeave={e => e.target.style.color = '#A3BF94'}
                                    >
                                        {t(item.key)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm" style={{ color: '#A3BF94' }}>
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {t('footer.address')}
                            </li>
                            <li className="flex items-center gap-2 text-sm" style={{ color: '#A3BF94' }}>
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                +91 7269045561
                            </li>
                            <li className="flex items-center gap-2 text-sm" style={{ color: '#A3BF94' }}>
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                krishisaathi@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(163,191,148,0.15)' }}>
                    <p className="text-sm" style={{ color: '#7BA468' }}>{t('footer.rights')}</p>
                    <p className="text-xs" style={{ color: 'rgba(123,164,104,0.6)' }}>{t('footer.made_with')}</p>
                </div>
            </div>
        </footer>
    );
}
