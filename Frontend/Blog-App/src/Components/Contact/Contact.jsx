
import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Facebook, Twitter, Instagram, MapPin, Phone, Clock, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-200 to-purple-400 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col py-12 px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-black/80 text-sm font-medium">Get in Touch</span>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-black via-blue-800 to-blue-200 bg-clip-text text-transparent mb-6">
                        Contact Us
                    </h1>
                    <p className="text-black/70 text-xl max-w-3xl mx-auto leading-relaxed">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you! 
                        Connect with us and become part of our creative community.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-black mb-8">Send us a Message</h2>
                            
                            {isSubmitted && (
                                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                    <span className="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</span>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="relative">
                                    <label htmlFor="name" className="block text-black/80 font-semibold mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            className={`w-full p-4 bg-black/5 border rounded-xl text-black placeholder-black/50 transition-all duration-300 focus:outline-none focus:bg-white/10 ${
                                                focusedField === 'name' ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-white/20'
                                            }`}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                            focusedField === 'name' ? 'opacity-100' : ''
                                        }`}></div>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <label htmlFor="email" className="block text-black/80 font-semibold mb-3 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            className={`w-full p-4 bg-black/5 border rounded-xl text-black placeholder-black/50 transition-all duration-300 focus:outline-none focus:bg-white/10 ${
                                                focusedField === 'email' ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-white/20'
                                            }`}
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                            focusedField === 'email' ? 'opacity-100' : ''
                                        }`}></div>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label htmlFor="message" className="block text-black/80 font-semibold mb-3 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField('')}
                                            rows="6"
                                            className={`w-full p-4 bg-black/5 border rounded-xl text-black placeholder-black/50 transition-all duration-300 focus:outline-none focus:bg-white/10 resize-none ${
                                                focusedField === 'message' ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-white/20'
                                            }`}
                                            placeholder="Tell us what's on your mind..."
                                            required
                                        />
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                            focusedField === 'message' ? 'opacity-100' : ''
                                        }`}></div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group w-full p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3 ${
                                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info & Social */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            <h3 className="text-2xl font-bold text-black mb-6">Get in Touch</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: <Mail className="w-5 h-5" />, title: 'Email', value: 'hello@yourvoice.com', gradient: 'from-purple-500 to-pink-500' },
                                    { icon: <Phone className="w-5 h-5" />, title: 'Phone', value: '+1 (555) 123-4567', gradient: 'from-blue-500 to-purple-500' },
                                    { icon: <MapPin className="w-5 h-5" />, title: 'Address', value: '123 Creative St, Innovation City', gradient: 'from-teal-500 to-blue-500' },
                                    { icon: <Clock className="w-5 h-5" />, title: 'Hours', value: 'Mon-Fri 9AM-6PM EST', gradient: 'from-green-500 to-teal-500' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                                        <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-black font-semibold">{item.title}</h4>
                                            <p className="text-black/70 text-sm">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            <h3 className="text-2xl font-bold text-black mb-6">Follow Us</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', handle: '@yourvoice', gradient: 'from-blue-600 to-blue-500', url: 'https://facebook.com' },
                                    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', handle: '@yourvoice', gradient: 'from-sky-500 to-blue-500', url: 'https://twitter.com' },
                                    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', handle: '@yourvoice', gradient: 'from-pink-500 to-purple-500', url: 'https://instagram.com' }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-lg flex items-center justify-center text-white`}>
                                                {social.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-black font-semibold">{social.name}</h4>
                                                <p className="text-black/70 text-sm">{social.handle}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-black/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Response Promise */}
                        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h4 className="text-black font-bold text-lg mb-2">Quick Response</h4>
                                <p className="text-black/70 text-sm">We typically respond within 24 hours during business days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;