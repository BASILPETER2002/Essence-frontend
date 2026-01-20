import { motion } from 'framer-motion';
import PageWrapper from '../animations/pageWrapper';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const OrderSuccess = () => {
    return (
        <PageWrapper>
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-8 shadow-green-200 shadow-xl"
                >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-serif text-earth mb-4"
                >
                    Order Placed Successfully
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-earth/70 max-w-md mb-8 text-lg"
                >
                    Thank you for choosing Essence 🌿<br />
                    Your natural products from Wayanad are getting ready for their journey to you.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default OrderSuccess;
