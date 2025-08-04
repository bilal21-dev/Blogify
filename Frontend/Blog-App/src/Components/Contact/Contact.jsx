import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return (
        <div className="bg-slate-200 min-h-screen flex flex-col items-center py-10 px-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">
                    Contact Us
                </h1>
                
                {/* Intro Section */}
                <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
                    Have questions, feedback, or just want to say hello? We’d love to hear from you! Reach out using the form below, or connect with us on our social media channels.
                </p>

                {/* Contact Form */}
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-600 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="5"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Write your message here"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-lg text-lg hover:bg-blue-950 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>

                {/* Social Media Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Follow Us</h2>
                    <div className="flex justify-center space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800">
                            <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-indigo-800">
                            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-800 hover:text-indigo-800">
                            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
