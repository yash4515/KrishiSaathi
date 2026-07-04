import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Upload, Plus, X, MapPin, Image, FileText, Mic, CheckCircle } from 'lucide-react';
import { cropAPI } from '../services/api';
import useVoiceInput from '../hooks/useVoiceInput';
import VoiceInputButton from '../components/ui/VoiceInputButton';

// ── Voice transcript parsing ──────────────────────────────────
function parseVoiceTranscript(text) {
    const result = {};
    const lower = text.toLowerCase();

    // Extract quantity — number followed by kg / kilo / किलो / কেজি etc.
    const qtyMatch = text.match(/(\d+)\s*(?:kg|kilo|kilos|किलो|কেজি|கிலோ|കിലോ|ਕਿਲੋ|કિલો|किलो)/i);
    if (qtyMatch) result.quantity = qtyMatch[1];

    // Extract price — number followed by rupees / rupee / ₹ / रुपये / টাকা etc.
    const priceMatch = text.match(/(\d+)\s*(?:rupees?|₹|रुपये|रुपया|টাকা|ரூபாய்|രൂപ|ਰੁਪਏ|રૂપિયા|रुपये)/i);
    if (priceMatch) result.pricePerKg = priceMatch[1];

    // Extract location — text after "from" / "से" / "location" / "স্থান"
    const locMatch = text.match(/(?:from|location|से|স্থান|இடம்|സ്ഥലം|ਤੋਂ|થી|स्थान)\s+(.+?)(?:,|\.|$)/i);
    if (locMatch) result.location = locMatch[1].trim();

    // Category matching
    const categoryMap = {
        grains: ['wheat', 'rice', 'corn', 'maize', 'barley', 'millet', 'गेहूं', 'चावल', 'ধান', 'গম', 'கோதுமை', 'ഗോതമ്പ്', 'ਕਣਕ', 'ઘઉં', 'गहू', 'तांदूळ'],
        vegetables: ['tomato', 'potato', 'onion', 'cabbage', 'spinach', 'टमाटर', 'आलू', 'प्याज', 'টমেটো', 'আলু', 'தக்காளி', 'തക്കാളി', 'ਟਮਾਟਰ', 'ટમેટા', 'कांदा'],
        fruits: ['mango', 'apple', 'banana', 'grape', 'orange', 'आम', 'सेब', 'কলা', 'আম', 'மாம்பழம்', 'മാമ്പഴം', 'ਅੰਬ', 'કેરી', 'आंबा'],
        pulses: ['dal', 'lentil', 'chickpea', 'moong', 'chana', 'दाल', 'চানা', 'ডাল', 'பருப்பு', 'പയർ', 'ਦਾਲ', 'દાળ', 'डाळ'],
        spices: ['chilli', 'turmeric', 'cumin', 'pepper', 'coriander', 'मिर्च', 'हल्दी', 'মরিচ', 'হলুদ', 'மிளகாய்', 'മുളക്', 'ਮਿਰਚ', 'મરચું', 'मिरची', 'हळद'],
        cash_crops: ['cotton', 'sugarcane', 'jute', 'tobacco', 'coffee', 'कपास', 'गन्ना', 'তুলা', 'আখ', 'பருத்தி', 'കരിമ്പ്', 'ਕਪਾਹ', 'કપાસ', 'कापूस', 'ऊस'],
    };

    for (const [cat, keywords] of Object.entries(categoryMap)) {
        if (keywords.some(k => lower.includes(k))) {
            result.category = cat;
            break;
        }
    }

    // Crop name — try to extract from beginning (before any numbers)
    const nameMatch = text.match(/^([a-zA-Z\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\s]+?)(?:,|\d|$)/);
    if (nameMatch) {
        const name = nameMatch[1].trim();
        if (name.length > 1) result.name = name;
    }

    return result;
}

export default function FarmerUploadCrop() {
    const { t, i18n } = useTranslation();
    const [form, setForm] = useState({
        name: '', quantity: '', pricePerKg: '', location: '', description: '', category: 'grains'
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [flashFields, setFlashFields] = useState({});

    // Voice hook for full-form fill
    const mainVoice = useVoiceInput();
    // Voice hook for per-field input
    const fieldVoice = useVoiceInput();
    const [activeField, setActiveField] = useState(null);

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    // Flash a field green briefly
    const flashField = useCallback((fields) => {
        setFlashFields(fields);
        setTimeout(() => setFlashFields({}), 800);
    }, []);

    // Handle main voice result — parse and fill all fields
    const handleMainVoiceResult = useCallback((transcript) => {
        const parsed = parseVoiceTranscript(transcript);
        const updates = {};
        const flashed = {};

        if (parsed.name) { updates.name = parsed.name; flashed.name = true; }
        if (parsed.quantity) { updates.quantity = parsed.quantity; flashed.quantity = true; }
        if (parsed.pricePerKg) { updates.pricePerKg = parsed.pricePerKg; flashed.pricePerKg = true; }
        if (parsed.location) { updates.location = parsed.location; flashed.location = true; }
        if (parsed.category) { updates.category = parsed.category; flashed.category = true; }

        if (Object.keys(updates).length > 0) {
            setForm(prev => ({ ...prev, ...updates }));
            flashField(flashed);
        }
    }, [flashField]);

    // Handle per-field voice result
    const handleFieldVoiceResult = useCallback((field, transcript) => {
        setForm(prev => ({ ...prev, [field]: transcript }));
        flashField({ [field]: true });
        setActiveField(null);
    }, [flashField]);

    // Toggle main voice
    const toggleMainVoice = useCallback(() => {
        if (mainVoice.isListening) {
            mainVoice.stopListening();
        } else {
            mainVoice.startListening(i18n.language, handleMainVoiceResult);
        }
    }, [mainVoice, i18n.language, handleMainVoiceResult]);

    // Toggle per-field voice
    const toggleFieldVoice = useCallback((field) => {
        if (fieldVoice.isListening && activeField === field) {
            fieldVoice.stopListening();
            setActiveField(null);
        } else {
            setActiveField(field);
            fieldVoice.startListening(i18n.language, (transcript) => handleFieldVoiceResult(field, transcript));
        }
    }, [fieldVoice, activeField, i18n.language, handleFieldVoiceResult]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(f => ({
            file: f,
            preview: URL.createObjectURL(f),
            name: f.name
        }));
        setImages(prev => [...prev, ...newImages].slice(0, 5));
    };

    const removeImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('cropName', form.name);
            formData.append('quantity', form.quantity);
            formData.append('unit', 'kg');
            formData.append('priceRange', JSON.stringify({ min: Number(form.pricePerKg), max: Number(form.pricePerKg) }));
            formData.append('location', form.location);
            formData.append('description', form.description);
            formData.append('category', form.category);

            images.forEach(img => {
                formData.append('images', img.file);
            });

            await cropAPI.add(formData);

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setForm({ name: '', quantity: '', pricePerKg: '', location: '', description: '', category: 'grains' });
                setImages([]);
            }, 3000);
        } catch (error) {
            console.error('Error uploading crop:', error);
            alert(t('upload_page.upload_failed'));
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: 'grains', label: t('upload_page.cat_grains') },
        { value: 'vegetables', label: t('upload_page.cat_vegetables') },
        { value: 'fruits', label: t('upload_page.cat_fruits') },
        { value: 'pulses', label: t('upload_page.cat_pulses') },
        { value: 'spices', label: t('upload_page.cat_spices') },
        { value: 'cash_crops', label: t('upload_page.cat_cash_crops') },
    ];

    // Helper: field class with optional flash
    const fieldClass = (fieldName, extra = '') =>
        `input-field ${extra} ${flashFields[fieldName] ? 'voice-field-flash' : ''}`;

    // Helper: render small mic button for a field
    const FieldMic = ({ field }) => (
        mainVoice.isSupported ? (
            <VoiceInputButton
                size="sm"
                isListening={fieldVoice.isListening && activeField === field}
                isSupported={mainVoice.isSupported}
                interimTranscript={activeField === field ? fieldVoice.interimTranscript : ''}
                error={activeField === field ? fieldVoice.error : null}
                onToggle={() => toggleFieldVoice(field)}
            />
        ) : null
    );

    return (
        <DashboardLayout>
            <div className="max-w-2xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="page-title flex items-center gap-2">
                        <Upload className="w-7 h-7 text-primary-600" /> {t('upload_page.title')}
                    </h1>
                    <p className="page-subtitle">{t('upload_page.subtitle')}</p>
                </div>

                {/* ─── Voice Fill Section ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <VoiceInputButton
                        size="lg"
                        isListening={mainVoice.isListening}
                        isSupported={mainVoice.isSupported}
                        interimTranscript={mainVoice.interimTranscript}
                        error={mainVoice.error}
                        onToggle={toggleMainVoice}
                    />
                </motion.div>

                 {/* Success Banner */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-green-800">{t('upload_page.listing_published')}</p>
                            <p className="text-sm text-green-600">{t('upload_page.listing_success')}</p>
                        </div>
                    </motion.div>
                )}

                {/* Form */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Crop Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.crop_name')} *</label>
                            <div className="flex items-center gap-2">
                                <input type="text" className={fieldClass('name', 'flex-1')} placeholder={t('upload_page.crop_placeholder')}
                                    value={form.name} onChange={set('name')} required />
                                <FieldMic field="name" />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.category')}</label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {categories.map(c => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setForm({ ...form, category: c.value })}
                                        className={`py-2 px-2 rounded-lg text-xs font-medium transition-all text-center ${form.category === c.value
                                            ? 'bg-primary-100 text-primary-700 border-2 border-primary-400'
                                            : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                                            } ${flashFields.category && form.category === c.value ? 'voice-field-flash' : ''}`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.quantity_kg')} *</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" className={fieldClass('quantity', 'flex-1')} placeholder={t('upload_page.quantity_placeholder')}
                                        value={form.quantity} onChange={set('quantity')} required />
                                    <FieldMic field="quantity" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.price_per_kg')} *</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" className={fieldClass('pricePerKg', 'flex-1')} placeholder={t('upload_page.price_placeholder')}
                                        value={form.pricePerKg} onChange={set('pricePerKg')} required />
                                    <FieldMic field="pricePerKg" />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.location')} *</label>
                            <div className="relative flex items-center gap-2">
                                <div className="relative flex-1">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" className={fieldClass('location', 'pl-10')} placeholder={t('upload_page.location_placeholder')}
                                        value={form.location} onChange={set('location')} required />
                                </div>
                                <FieldMic field="location" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('upload_page.description')}</label>
                            <div className="flex items-start gap-2">
                                <textarea className={fieldClass('description', 'h-24 resize-none flex-1')} placeholder={t('upload_page.desc_placeholder')}
                                    value={form.description} onChange={set('description')} />
                                <FieldMic field="description" />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                {t('upload_page.upload_images')} <span className="text-gray-400 font-normal">({t('upload_page.max_images')})</span>
                            </label>
                            {images.length > 0 && (
                                <div className="flex gap-3 mb-3 overflow-x-auto pb-2">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
                                            <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {images.length < 5 && (
                                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors cursor-pointer block">
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">{t('upload_page.click_upload')}</p>
                                    <p className="text-xs text-gray-400 mt-1">{t('upload_page.file_hint')}</p>
                                </label>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !form.name || !form.quantity || !form.pricePerKg || !form.location}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><Upload className="w-5 h-5" /> {t('upload_page.publish_listing')}</>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
