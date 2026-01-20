export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

export const scaleHover = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.98 }
};
