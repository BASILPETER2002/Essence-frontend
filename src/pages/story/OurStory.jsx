import { motion } from 'framer-motion';
import { Award, Leaf, Heart } from 'lucide-react';
import PageWrapper from '../../animations/pageWrapper';
import { fadeUp, stagger } from '../../animations/variants';

const OurStory = () => {
    return (
        <PageWrapper>
            <div className="min-h-screen bg-neutral-50">
                {/* Hero Section */}
                <div className="relative py-24 bg-primary-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-7xl font-serif font-bold mb-6"
                        >
                            Our Story
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="text-xl text-primary-100 max-w-2xl mx-auto"
                        >
                            From the pristine forests of Wayanad to your home, a journey of passion, purity, and tradition.
                        </motion.p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-6">
                                The Beekeeper of Wayanad
                            </h2>
                            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                                Meet <span className="font-bold text-primary-700">Mr. K M Rajan</span>, the heart and soul behind our pristine honey collection. Located in Kuppady, Sulthan Bathery, his dedication to sustainable beekeeping has earned him recognition as the
                                <span className="font-bold text-amber-600"> "Best Beekeeper"</span> from the Khadi & Village Industries Commission.
                            </p>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Unlike commercial honey, our products are collected from deep forest hives where bees forage on medicinal wild flora. This ensures every drop is raw, unfiltered, and packed with natural goodness.
                            </p>

                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full font-medium">
                                    <Award size={20} />
                                    <span>Award Winning</span>
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full font-medium">
                                    <Leaf size={20} />
                                    <span>100% Organic</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="/assets/story/beekeeper.jpg"
                                alt="Mr. K M Rajan with Honeycomb"
                                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                            />
                            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                                <p className="font-serif italic text-neutral-600 text-lg">
                                    "Nature gives us its best, only when we treat it with respect."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Legacy & Awards Grid */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-serif font-bold text-neutral-900 text-center mb-16">Celebrating Excellence</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { img: '/assets/story/award_poster.jpg', title: 'Recognition', desc: 'Honored as Best Beekeeper' },
                                { img: '/assets/story/honey_pot.jpg', title: 'Pure Harvest', desc: 'Raw honey straight from the hive' },
                                { img: '/assets/story/award_ceremony.jpg', title: 'Our Achievement', desc: 'Receiving the prestigious award' },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                                        <h3 className="text-white text-xl font-bold font-serif mb-1">{item.title}</h3>
                                        <p className="text-gray-300 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Values */}
                    <div className="bg-primary-50 rounded-3xl p-12 md:p-20 text-center">
                        <Heart className="w-16 h-16 text-primary-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-6">Our Promise</h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            We promise to bring you only what nature intended. No additives, no processing, and no compromise. Just pure, wholesome products that honor the land they come from.
                        </p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default OurStory;
