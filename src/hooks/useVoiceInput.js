import { useState, useRef, useCallback, useEffect } from 'react';

// Map i18n locale codes to Web Speech API BCP-47 language tags
const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  pa: 'pa-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
  mr: 'mr-IN',
  ml: 'ml-IN',
  ta: 'ta-IN',
};

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

export default function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const isSupported = !!SpeechRecognition;

  const recognitionRef = useRef(null);
  const onResultRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) { /* noop */ }
      }
    };
  }, []);

  const startListening = useCallback(
    (locale = 'en', onResult) => {
      if (!SpeechRecognition) {
        setError('unsupported');
        return;
      }

      // Stop any previous session
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) { /* noop */ }
      }

      const recognition = new SpeechRecognition();
      recognition.lang = LANG_MAP[locale] || 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      onResultRef.current = onResult;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript('');
        setInterimTranscript('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }
        if (interim) setInterimTranscript(interim);
        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          if (onResultRef.current) onResultRef.current(final);
        }
      };

      recognition.onerror = (event) => {
        // 'no-speech' and 'aborted' are non-critical
        if (event.error === 'no-speech' || event.error === 'aborted') {
          setError('no-speech');
        } else {
          setError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    },
    []
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* noop */ }
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
  };
}
