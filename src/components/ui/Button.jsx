import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className,
    isLoading,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/50 rounded-xl";
    
    const variants = {
        primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 active:scale-[0.98]",
        secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/40 active:scale-[0.98]",
        outline: "border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:bg-primary-50 active:scale-[0.98]",
        ghost: "text-neutral-700 hover:text-primary-600 hover:bg-primary-50 active:scale-[0.98]",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98]",
    };
    
    const sizes = {
        small: "px-4 py-2 text-sm gap-2",
        medium: "px-6 py-3 text-base gap-3",
        large: "px-8 py-4 text-lg gap-3",
        xlarge: "px-10 py-5 text-xl gap-4",
    };

    const iconSizes = {
        small: 16,
        medium: 20,
        large: 24,
        xlarge: 24,
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span className={clsx("transition-transform", isLoading && "animate-spin")}>
                            {icon}
                        </span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className={clsx("transition-transform", isLoading && "animate-spin")}>
                            {icon}
                        </span>
                    )}
                </>
            )}
        </motion.button>
    );
};

export default Button;