import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-primary-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-primary-300" />
                            </div>
                            <span className="text-xl font-bold text-white">KrishiSaathi</span>
                        </Link>
                        <p className="text-primary-200 text-sm leading-relaxed mb-4">
                            {t('footer.desc')}
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
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
                                    <Link to={link.to} className="text-primary-200 hover:text-white text-sm transition-colors">
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
                                    <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">{t(item.key)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-primary-200">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {t('footer.address')}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-primary-200">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                +91 1800-123-4567
                            </li>
                            <li className="flex items-center gap-2 text-sm text-primary-200">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                help@krishisaathi.in
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-primary-300 text-sm">{t('footer.rights')}</p>
                    <p className="text-primary-400 text-xs">{t('footer.made_with')}</p>
                </div>
            </div>
        </footer>
    );
}
