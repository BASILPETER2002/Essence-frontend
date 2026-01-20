import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, AlertCircle, TrendingUp, Users } from 'lucide-react';
import api from '../../utils/api';

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => {
    const colorStyles = {
        leaf: "bg-leaf/10 text-leaf",
        honey: "bg-honey/10 text-honey",
        amber: "bg-amber-500/10 text-amber-600",
        earth: "bg-earth/10 text-earth"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-earth/60 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-earth">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
                    <Icon size={24} />
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-leaf font-medium">{subtext}</span>
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/analytics');
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center text-earth/60">Loading dashboard data...</div>;
    if (!analytics) return <div className="p-8 text-center text-earth/60">Failed to load data.</div>;

    const stats = [
        {
            title: "Total Revenue",
            value: `₹${analytics.totalRevenue.toLocaleString()}`,
            subtext: "Lifetime Earnings",
            icon: ShoppingBag,
            color: "leaf"
        },
        {
            title: "Total Orders",
            value: analytics.totalOrders,
            subtext: `${analytics.ordersToday} orders today`,
            icon: Package,
            color: "honey"
        },
        {
            title: "Low Stock Items",
            value: analytics.lowStockProducts.length,
            subtext: analytics.lowStockProducts.length > 0 ? "Action Required" : "All Good",
            icon: AlertCircle,
            color: "amber"
        },
        // Using totalOrders as proxy for customers for now, or could show top product sales
        {
            title: "Top Product Sold",
            value: analytics.topProducts[0]?.totalSold || 0,
            subtext: analytics.topProducts[0]?.name || "N/A",
            icon: TrendingUp,
            color: "earth"
        }
    ];

    return (
        <div className="pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-earth mb-2">Overview</h1>
                <p className="text-earth/60">Welcome back, here's what's happening today.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} delay={index * 0.1} />
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Low Stock Alerts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6"
                >
                    <h3 className="text-lg font-bold text-earth mb-6 flex items-center gap-2">
                        <AlertCircle size={20} className="text-amber-500" />
                        Low Stock Alerts
                    </h3>
                    {analytics.lowStockProducts.length === 0 ? (
                        <p className="text-earth/40 text-sm">All products are well stocked.</p>
                    ) : (
                        <div className="space-y-4">
                            {analytics.lowStockProducts.map(product => (
                                <div key={product._id} className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold">
                                            {product.stock}
                                        </div>
                                        <div>
                                            <p className="font-medium text-earth">{product.name}</p>
                                            <p className="text-xs text-earth/50">{product.category}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-amber-600 px-2 py-1 bg-white rounded-md border border-amber-100">
                                        Restock
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Top Selling Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6"
                >
                    <h3 className="text-lg font-bold text-earth mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-leaf" />
                        Best Selling Products
                    </h3>
                    {analytics.topProducts.length === 0 ? (
                        <p className="text-earth/40 text-sm">No sales data yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {analytics.topProducts.map((product, i) => (
                                <div key={product._id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="font-serif font-bold text-earth/20 w-4">#{i + 1}</div>
                                        <div>
                                            <p className="font-medium text-earth">{product.name}</p>
                                            <p className="text-xs text-earth/50">{product.totalSold} sold</p>
                                        </div>
                                    </div>
                                    <div className="h-2 w-24 bg-stone-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-leaf"
                                            style={{ width: `${(product.totalSold / analytics.topProducts[0].totalSold) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
