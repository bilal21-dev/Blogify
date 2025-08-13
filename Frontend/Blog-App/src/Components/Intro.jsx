import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, PenTool, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlurText from "./BlurText";

const Intro = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleGetStarted = () => {
        navigate("/home");
        // console.log('Navigating to home...');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const educationalElements = [
        { icon: '📝', text: 'Write', position: { top: '15%', left: '8%' }, delay: 0 },
        { icon: '💡', text: 'Ideas', position: { top: '25%', right: '12%' }, delay: 0.5 },
        { icon: '🎨', text: 'Create', position: { top: '70%', left: '5%' }, delay: 1 },
        { icon: '📚', text: 'Learn', position: { top: '60%', right: '8%' }, delay: 1.5 },
        { icon: '🌟', text: 'Inspire', position: { top: '40%', left: '15%' }, delay: 2 },
        { icon: '🚀', text: 'Publish', position: { top: '80%', right: '15%' }, delay: 2.5 },
        { icon: '👥', text: 'Connect', position: { top: '35%', right: '25%' }, delay: 3 },
        { icon: '📖', text: 'Stories', position: { top: '75%', left: '20%' }, delay: 3.5 }
    ];

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat filter blur-sm scale-105"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/></svg>')`
                    }}
                ></div>
            </div>

            {/* Educational Floating Elements */}
            {educationalElements.map((element, index) => (
                <motion.div
                    key={index}
                    className="absolute flex` items-center gap-2 text-white/30 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-full border border-white/10"
                    style={element.position}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0]
                    }}
                    transition={{
                        delay: element.delay,
                        duration: 0.6,
                        y: {
                            duration: 3 + index * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <span className="text-lg">{element.icon}</span>
                    <span className="text-sm font-medium">{element.text}</span>
                </motion.div>
            ))}

            {/* Additional Abstract Elements */}
            <motion.div
                className="absolute top-1/4 left-1/3 w-32 h-32 border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-white/10 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Animated Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <motion.path
                    d="M 50 200 Q 300 100 550 200 T 950 200"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                />
                <motion.path
                    d="M 100 600 Q 400 500 700 600 T 1100 600"
                    stroke="url(#lineGradient2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" stopOpacity="0" />
                        <stop offset="50%" stopColor="#667eea" stopOpacity="1" />
                        <stop offset="100%" stopColor="#764ba2" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#764ba2" stopOpacity="0" />
                        <stop offset="50%" stopColor="#667eea" stopOpacity="1" />
                        <stop offset="100%" stopColor="#764ba2" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Main Content */}
            <motion.div
                className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <BlurText
                            text="Create Your Blogs"
                            delay={200}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleAnimationComplete}
                            className="whitespace-nowrap  text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight mt-5 text-white ml-12 sm:ml-20"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                            }}
                        />
                        <motion.div
                            className="flex items-center justify-center gap-3 text-white text-2xl sm:text-3xl md:text-4xl font-semibold"
                            variants={itemVariants}
                        >
                            <span>Share with the World</span>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Globe className="text-green-400" size={40} />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Express your thoughts, share your stories, and connect with readers around the globe.
                        Your voice matters, and the world is waiting to hear it.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
                    >
                        <motion.div
                            className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <PenTool className="mx-auto mb-4 text-blue-400" size={32} />
                            <h3 className="text-white font-semibold text-lg mb-2">Easy Writing</h3>
                            <p className="text-gray-300 text-sm">Intuitive editor with rich formatting options</p>
                        </motion.div>

                        <motion.div
                            className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Globe className="mx-auto mb-4 text-green-400" size={32} />
                            <h3 className="text-white font-semibold text-lg mb-2">Global Reach</h3>
                            <p className="text-gray-300 text-sm">Share your content with readers worldwide</p>
                        </motion.div>

                        <motion.div
                            className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Users className="mx-auto mb-4 text-purple-400" size={32} />
                            <h3 className="text-white font-semibold text-lg mb-2">Community</h3>
                            <p className="text-gray-300 text-sm">Connect with like-minded writers and readers</p>
                        </motion.div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants}>
                        <motion.button
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300"
                            onClick={handleGetStarted}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button onClick={handleGetStarted}>Get Started Today</button>
                            <motion.div
                                className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                                <ArrowRight size={20} />
                            </motion.div>

                            {/* Button glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                        </motion.button>
                    </motion.div>

                    {/* Bottom Text */}
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 text-sm mt-8"
                    >
                        Join thousands of writers already sharing their stories
                    </motion.p>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
};

export default Intro;