import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from './LoadingContext';

const LoadingSpinner = () => {
    const { loading, loadingMessage } = useLoading();

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-sm w-full mx-4"
                    >
                        <div className="flex flex-col items-center space-y-6">
                            {/* Modern Spinner */}
                            <div className="relative">
                                {/* Outer rotating ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                                />
                                
                                {/* Inner counter-rotating ring */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-b-pink-500 border-l-blue-400 rounded-full"
                                />
                                
                                {/* Center dot */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                />
                            </div>

                            {/* Loading Message */}
                            <div className="text-center">
                                <motion.h3
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                >
                                    {loadingMessage}
                                </motion.h3>
                                
                                {/* Animated dots */}
                                <div className="flex justify-center space-x-1 mt-2">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    animate={{ x: [-100, 100] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                    style={{ position: 'relative' }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Alternative compact inline spinner for smaller spaces
export const InlineLoader = ({ size = 'md', message = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={`${sizeClasses[size]} border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full`}
            />
            {message && (
                <span className="text-sm text-gray-600 font-medium">{message}</span>
            )}
        </div>
    );
};

// Button with integrated loading state
export const LoadingButton = ({ 
    children, 
    loading = false, 
    onClick, 
    className = '', 
    disabled = false,
    loadingText = 'Loading...',
    ...props 
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`relative overflow-hidden transition-all duration-300 ${className} ${
                loading ? 'cursor-not-allowed opacity-80' : ''
            }`}
            {...props}
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center space-x-2"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-transparent border-t-white rounded-full"
                        />
                        <span>{loadingText}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default LoadingSpinner;
