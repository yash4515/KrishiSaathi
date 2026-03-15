import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, delay = 0, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={hover ? { y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
            className={`card ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
