import { motion } from 'framer-motion';

const EmptyState = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 flex flex-col items-center justify-center h-full"
    >
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-6xl mb-6 relative"
        >
            <div className="absolute inset-0 bg-honey/20 blur-xl rounded-full scale-150 transform -z-10"></div>
            🌿
        </motion.div>

        <h3 className="text-xl font-serif font-bold text-earth mb-2">{title}</h3>
        <p className="text-earth/60 max-w-sm mx-auto">{subtitle}</p>
    </motion.div>
);

export default EmptyState;
