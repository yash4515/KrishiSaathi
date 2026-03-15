import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const variants = {
    success: { bg: 'bg-green-50 border-green-200', icon: CheckCircle, iconColor: 'text-green-500', text: 'text-green-800' },
    error: { bg: 'bg-red-50 border-red-200', icon: AlertCircle, iconColor: 'text-red-500', text: 'text-red-800' },
    warning: { bg: 'bg-yellow-50 border-yellow-200', icon: AlertTriangle, iconColor: 'text-yellow-500', text: 'text-yellow-800' },
    info: { bg: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-500', text: 'text-blue-800' },
};

export default function NotificationAlert({ type = 'info', message, show, onClose }) {
    const v = variants[type];
    const Icon = v.icon;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className={`fixed top-20 right-4 z-[100] max-w-sm w-full ${v.bg} border rounded-xl p-4 shadow-xl flex items-start gap-3`}
                >
                    <Icon className={`w-5 h-5 ${v.iconColor} flex-shrink-0 mt-0.5`} />
                    <p className={`text-sm font-medium ${v.text} flex-1`}>{message}</p>
                    {onClose && (
                        <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
