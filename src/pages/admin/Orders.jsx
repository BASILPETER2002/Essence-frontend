import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Package, Check, Truck, Box } from 'lucide-react';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/EmptyState';

const Orders = () => {
    // Mock Orders Data
    // Mock Orders Data (Empty for now until API is ready)
    const [orders, setOrders] = useState([]);

    const [expandedOrder, setExpandedOrder] = useState(null);

    const statusSteps = ['Pending', 'Packed', 'Shipped', 'Delivered'];

    const getStatusIndex = (status) => statusSteps.indexOf(status);

    const OrderRow = ({ order }) => {
        const isExpanded = expandedOrder === order.id;
        const currentStepIndex = getStatusIndex(order.status);

        return (
            <motion.div
                layout
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-stone-100 rounded-xl mb-4 overflow-hidden shadow-sm hover:shadow-md"
            >
                {/* Order Header (Clickable) */}
                <div
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="p-4 flex items-center justify-between cursor-pointer"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-leaf/10 rounded-full flex items-center justify-center text-leaf font-bold text-sm">
                            #{order.id.split('-')[1]}
                        </div>
                        <div>
                            <h4 className="font-bold text-earth">{order.customer}</h4>
                            <p className="text-sm text-earth/50">{order.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="font-bold text-earth">₹{order.total}</div>
                        <div className="flex items-center gap-2 min-w-[120px]">
                            <motion.span
                                animate={order.status === 'Pending' ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`
                w-2 h-2 rounded-full 
                ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-honey'}
              `} />
                            <span className="text-sm font-medium text-earth/80">{order.status}</span>
                        </div>
                        <div className="text-earth/40">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-stone-100 bg-stone-50/50"
                        >
                            <div className="p-6">
                                {/* Status Timeline */}
                                <div className="flex items-center justify-between mb-8 relative px-4">
                                    {/* Progress Bar Background */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-0 -translate-y-1/2 rounded-full" />

                                    {/* Active Progress Bar */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                                        className="absolute top-1/2 left-0 h-1 bg-leaf -z-0 -translate-y-1/2 rounded-full transition-all duration-500"
                                    />

                                    {statusSteps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isCurrent = index === currentStepIndex;

                                        return (
                                            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        scale: isCurrent ? 1.2 : 1,
                                                        backgroundColor: isCompleted ? '#4ADE80' : '#E7E5E4' // leaf-400 or stone-200
                                                    }}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm
                            ${isCompleted ? 'text-white' : 'text-stone-400'}
                          `}
                                                >
                                                    {isCompleted ? <Check size={14} strokeWidth={3} /> : <div className="w-2 h-2 bg-stone-400 rounded-full" />}
                                                </motion.div>
                                                <span className={`text-xs font-medium ${isCompleted ? 'text-leaf' : 'text-stone-400'}`}>
                                                    {step}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Items */}
                                <div className="bg-white rounded-xl border border-stone-100 p-4">
                                    <h5 className="font-bold text-earth mb-3 text-sm uppercase tracking-wider opacity-60">Order Items</h5>
                                    <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm">
                                                <span className="text-earth/80">{item.qty}x {item.name}</span>
                                                <span className="font-medium text-earth">₹{item.price * item.qty}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-stone-100 mt-3 pt-3 flex justify-between font-bold text-earth">
                                        <span>Total Bill</span>
                                        <span>₹{order.total}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="ghost">Cancel Order</Button>
                                    {currentStepIndex < statusSteps.length - 1 && (
                                        <Button>
                                            Move to {statusSteps[currentStepIndex + 1]}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-earth mb-2">Orders</h1>
                <p className="text-earth/60">Manage and track customer orders.</p>
            </div>

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <EmptyState
                        title="No active orders"
                        subtitle="New orders will appear here once customers checkout."
                    />
                ) : (
                    orders.map(order => (
                        <OrderRow key={order.id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
