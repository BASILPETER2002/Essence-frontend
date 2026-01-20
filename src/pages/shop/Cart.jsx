import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import PageWrapper from '../../animations/pageWrapper';
import { fadeUp, stagger } from '../../animations/variants';
import api from '../../utils/api';
import EmptyState from '../../components/EmptyState';

const Cart = () => {
    // Integrate global cart
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > 999 ? 0 : 50; // Free shipping logic
    const total = subtotal + deliveryCharge;

    const handleCheckout = () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/cart' } } });
            return;
        }

        const itemsList = cartItems.map(item => `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`).join('%0a');
        const message = `*New Order Request*%0a%0a${itemsList}%0a%0a*Subtotal:* ₹${subtotal}%0a*Delivery:* ₹${deliveryCharge}%0a*Total:* ₹${total}%0a%0aPlease confirm availability and payment details.`;

        const phoneNumber = "919061031307";
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handlePayment = async () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/cart' } } });
            return;
        }

        try {
            // 1. Create Order on Backend
            const { data: order } = await api.post('/payments/create', { amount: total });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: "INR",
                name: "Essence",
                description: "Natural Products from Wayanad",
                order_id: order.id,
                handler: async function (response) {
                    // Payment Success - Create Order in DB
                    try {
                        await api.post('/orders', {
                            orderItems: cartItems.map(item => ({
                                product: item._id,
                                name: item.name,
                                quantity: item.quantity,
                                price: item.price
                            })),
                            totalPrice: total,
                            paymentMethod: 'Online',
                            isPaid: true,
                            paymentResult: {
                                id: response.razorpay_payment_id,
                                status: 'success',
                                email_address: user.email
                            }
                        });
                        alert('Payment Successful! Order Placed.');
                        // Clear cart and redirect
                        // clearCart(); // Need to expose this from context if not already
                        navigate('/order-success');
                    } catch (err) {
                        console.error("Order creation failed", err);
                        alert("Payment successful but order creation failed. Contact support.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "" // Can be added if user profile has phone
                },
                theme: {
                    color: "#059669"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Could not initiate payment. Please try again.");
        }
    };

    return (
        <PageWrapper>
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-earth mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 space-y-6"
                    >
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                variants={fadeUp}
                                key={item._id}
                                className="flex gap-6 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm"
                            >
                                <div className="w-24 h-24 bg-stone-50 rounded-xl flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-earth text-lg">{item.name}</h3>
                                            <p className="text-earth/50 text-sm">₹{item.price} x {item.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-earth/30 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {/* Quantity Controls (could be added here) */}
                                        <div className="font-bold text-earth text-lg">₹{item.price * item.quantity}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-lg sticky top-32">
                            <h3 className="font-serif font-bold text-xl text-earth mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6 text-earth/70">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-earth">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span className="font-bold text-earth">
                                        {deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryCharge}`}
                                    </span>
                                </div>
                                <div className="border-t border-stone-100 pt-4 flex justify-between text-lg font-bold text-earth">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                                    <MessageCircle size={20} />
                                    Checkout on WhatsApp
                                </Button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-stone-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-stone-400 text-xs uppercase font-bold">Or Pay Online</span>
                                    <div className="flex-grow border-t border-stone-200"></div>
                                </div>

                                <Button onClick={handlePayment} variant="outline" className="w-full border-2 border-primary-600 text-primary-700 hover:bg-primary-50">
                                    <span>Pay with Razorpay</span>
                                </Button>
                            </div>

                            <p className="text-xs text-center text-earth/40 mt-4">
                                Secure payments powered by Razorpay.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Cart;
