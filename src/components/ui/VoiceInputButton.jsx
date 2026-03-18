import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function VoiceInputButton({
  isListening,
  isSupported,
  interimTranscript,
  error,
  onToggle,
  size = 'lg', // 'sm' for per-field, 'lg' for main button
}) {
  const { t } = useTranslation();

  // Small per-field mic button
  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={onToggle}
        disabled={!isSupported}
        title={isSupported ? t('voice.fill_hint') : t('voice.unsupported')}
        className={`voice-btn-sm ${isListening ? 'voice-btn-sm-active' : ''}`}
      >
        {isListening ? (
          <div className="relative">
            <Mic className="w-4 h-4 text-white" />
            <span className="voice-pulse-sm" />
          </div>
        ) : (
          <Mic className="w-4 h-4 text-primary-600" />
        )}
      </button>
    );
  }

  // Large main voice button
  return (
    <div className="voice-card">
      <div className="flex flex-col items-center gap-3">
        {/* Mic Button */}
        <button
          type="button"
          onClick={onToggle}
          disabled={!isSupported}
          className={`voice-btn-lg ${isListening ? 'voice-btn-lg-active' : ''}`}
        >
          {/* Pulse rings */}
          {isListening && (
            <>
              <span className="voice-pulse-ring voice-pulse-ring-1" />
              <span className="voice-pulse-ring voice-pulse-ring-2" />
              <span className="voice-pulse-ring voice-pulse-ring-3" />
            </>
          )}

          {isListening ? (
            <div className="relative z-10 flex items-center gap-1">
              {/* Sound wave bars */}
              <div className="voice-wave-bars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="voice-wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <Mic className="w-7 h-7 relative z-10" />
          )}
        </button>

        {/* Status Label */}
        <p className={`text-sm font-medium ${isListening ? 'text-primary-600' : 'text-gray-500'}`}>
          {!isSupported
            ? t('voice.unsupported')
            : isListening
              ? t('voice.listening')
              : t('voice.start')}
        </p>

        {/* Interim transcript preview */}
        <AnimatePresence>
          {isListening && interimTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-2 max-w-sm text-center"
            >
              <p className="text-sm text-primary-700 italic">"{interimTranscript}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {error && error !== 'no-speech' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{t('voice.error')}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!isListening && !error && isSupported && (
          <p className="text-xs text-gray-400 text-center max-w-xs">
            {t('voice.hint')}
          </p>
        )}
      </div>
    </div>
  );
}
