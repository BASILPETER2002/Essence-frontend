import { motion } from 'framer-motion';

const RouteTransition = () => {
    return (
        <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-honey origin-top pointer-events-none"
        />
    );
};

export default RouteTransition;
