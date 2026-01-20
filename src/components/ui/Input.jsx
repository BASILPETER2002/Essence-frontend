import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-earth/70 mb-2 ml-1">
                    {label}
                </label>
            )}
            <motion.div
                initial={false}
                animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            >
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-xl bg-white border-2 border-transparent
            shadow-sm outline-none transition-all duration-300
            focus:border-leaf/50 focus:shadow-lg focus:shadow-leaf/10
            placeholder:text-earth/30 text-earth
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          `}
                    {...props}
                />
            </motion.div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
