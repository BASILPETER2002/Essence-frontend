import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import api from '../../utils/api';

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Honey',
        price: '',
        stock: '',
        weight: '',
        isInstant: false,
        image: '' // Simple string for now
    });

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error('Delete failed', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            setIsModalOpen(false);
            setFormData({
                name: '',
                category: 'Honey',
                price: '',
                stock: '',
                weight: '',
                isInstant: false,
                image: ''
            });
            fetchProducts();
        } catch (error) {
            console.error('Add failed', error);
            const message = error.response?.data?.message || 'Failed to add product';
            alert(`Error: ${message}`);
        }
    };

    const StatusBadge = ({ status, stock, isInstant }) => {
        if (isInstant) {
            if (stock === 0) return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-500 border border-stone-200">
                    Out of Stock
                </span>
            );
            if (stock < 10) return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 animate-pulse">
                    Low Stock ({stock})
                </span>
            );
            return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-leaf/10 text-leaf border border-leaf/20 flex items-center gap-1">
                    <span className="w-2 h-2 bg-leaf rounded-full animate-pulse" />
                    Fresh
                </span>
            );
        }

        // Determine status dynamically if needed, or rely on backend status
        // For now, using simple stock check for display
        const displayStatus = stock > 0 ? 'Available' : 'Out of Stock';

        if (displayStatus === 'Out of Stock') return <span className="text-red-500 bg-red-50 text-xs px-2 py-1 rounded">Out of Stock</span>;

        return <span className="text-leaf bg-leaf/10 text-xs px-2 py-1 rounded">Available</span>;
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-earth mb-2">Products</h1>
                    <p className="text-earth/60">Manage your inventory and product listings.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    <span>Add Product</span>
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth/40" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-50 border-none outline-none focus:ring-2 focus:ring-leaf/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-2 text-earth/60 hover:text-earth hover:bg-stone-50 rounded-lg transition-colors border border-stone-200">
                    <Filter size={20} />
                </button>
            </div>

            {/* Product Grid/Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50 border-b border-stone-100 text-xs uppercase tracking-wider text-earth/50 font-semibold">
                                <th className="p-4 rounded-tl-lg">Product Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-earth/50">Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-earth/50">No products found.</td></tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ backgroundColor: '#FAF9F6' }}
                                        className="group transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="font-medium text-earth">{product.name}</div>
                                            <div className="text-xs text-earth/40">{product.weight}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-stone-100 text-earth/60 px-2 py-1 rounded text-xs">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium text-earth">₹{product.price}</td>
                                        <td className="p-4 text-earth/70">{product.stock}</td>
                                        <td className="p-4">
                                            <StatusBadge {...product} />
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Product Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Product"
            >
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <Input
                        label="Product Name"
                        placeholder="e.g. Honey"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-earth/70 ml-1">Description</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-stone-200 outline-none focus:border-leaf/50 text-earth min-h-[100px]"
                            placeholder="Product description..."
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Price (₹)"
                            type="number"
                            placeholder="0.00"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                        <Input
                            label="Stock"
                            type="number"
                            placeholder="0"
                            required
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Weight"
                            placeholder="e.g. 500g"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                        {/* Simple image input for now */}
                        <Input
                            label="Image URL"
                            placeholder="/assets/..."
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-earth/70 mb-2 ml-1">Category</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-stone-200 outline-none focus:border-leaf/50 text-earth"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Honey</option>
                            <option>Spices</option>
                            <option>Instant Mushrooms</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="instant"
                            className="accent-leaf w-4 h-4"
                            checked={formData.isInstant}
                            onChange={(e) => setFormData({ ...formData, isInstant: e.target.checked })}
                        />
                        <label htmlFor="instant" className="text-sm text-earth cursor-pointer">
                            Mark as Instant Product (Special stock logic)
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;
