import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Target, Eye, Sparkles, ArrowRight, Check, Zap, Heart, Globe, BookOpen, MessageCircle } from 'lucide-react';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 'what-we-do',
      title: 'What We Do',
      icon: <BookOpen className="w-8 h-8" />,
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      content: {
        description: 'Our platform simplifies the blogging experience, enabling you to focus on what matters most: your content. Here\'s how we support your blogging journey:',
        features: [
          { icon: <Zap className="w-5 h-5" />, title: 'Write & Share', desc: 'Easily create and share blogs with a few clicks.' },
          { icon: <Heart className="w-5 h-5" />, title: 'Engage Your Audience', desc: 'Allow readers to like, comment, and share your posts.' },
          { icon: <Target className="w-5 h-5" />, title: 'Manage Content', desc: 'Organize your posts and keep track of shared blogs effortlessly.' },
          { icon: <Users className="w-5 h-5" />, title: 'Community Interaction', desc: 'Explore content from fellow bloggers and grow your network.' }
        ]
      }
    },
    {
      id: 'mission',
      title: 'Our Mission',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      content: {
        text: 'At Your Voice, we believe in the power of storytelling. Our mission is to provide a platform that amplifies your ideas and fosters a vibrant community of readers and writers. Whether it\'s your personal experiences, creative fiction, or insights into the world, we\'re here to bring your stories to life.'
      }
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: <Eye className="w-8 h-8" />,
      gradient: 'from-teal-500 via-blue-500 to-purple-500',
      content: {
        text: 'Our vision is to become a hub for storytellers worldwide, creating an inclusive space where everyone feels encouraged to express themselves freely. Together, we aim to build a digital library of thoughts, emotions, and creativity.'
      }
    },
    {
      id: 'join',
      title: 'Join Our Community',
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      content: {
        cta: true
      }
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-200 to-purple-400 relative overflow-hidden z-[-999]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-black/80 text-sm font-medium">About Us</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-black via-blue-800 to-blue-200 bg-clip-text text-transparent mb-6">
            Your Voice
          </h1>
          <p className="text-black/70 text-xl max-w-3xl mx-auto leading-relaxed">
            The blogging platform where creativity, ideas, and stories come alive. Connect with like-minded individuals and make your voice heard.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-6xl relative">
            {/* Main Carousel */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-[500px] flex items-center justify-center">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      index === currentSlide 
                        ? 'opacity-100 translate-x-0 bg-white/50' 
                        : index < currentSlide 
                          ? 'opacity-0 -translate-x-full' 
                          : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className="p-12 h-full flex flex-col justify-center">
                      {/* Slide Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-16 h-16 bg-gradient-to-r ${slide.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                          {slide.icon}
                        </div>
                        <h2 className="text-4xl font-bold text-black">{slide.title}</h2>
                      </div>

                      {/* Slide Content */}
                      <div className="flex-1">
                        {slide.content.description && (
                          <p className="text-black/80 text-lg leading-relaxed mb-8">
                            {slide.content.description}
                          </p>
                        )}

                        {slide.content.features && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {slide.content.features.map((feature, featureIndex) => (
                              <div 
                                key={featureIndex}
                                className="group flex items-start gap-4 p-4 bg-black/15 rounded-xl hover:bg-black/20 text-white transition-all duration-300"
                                style={{
                                  animationDelay: `${featureIndex * 200}ms`,
                                  animation: index === currentSlide ? 'slideInUp 0.6s ease-out forwards' : 'none'
                                }}
                              >
                                <div className={`w-12 h-12 bg-gradient-to-r ${slide.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                  {feature.icon}
                                </div>
                                <div>
                                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                                  <p className="text-white/80 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {slide.content.text && (
                          <p className="text-black/80 text-lg leading-relaxed">
                            {slide.content.text}
                          </p>
                        )}

                        {slide.content.cta && (
                          <div className="text-center">
                            <h3 className="text-3xl font-bold text-black mb-6">
                              Join Our Community Today!
                            </h3>
                            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-3 mx-auto">
                              Get Started
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-black transition-all duration-300 hover:scale-110 border border-black/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-black transition-all duration-300 hover:scale-110 border border-black/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center items-center gap-4 p-6 bg-white/5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-purple-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
                
                {/* Auto-play toggle */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isAutoPlaying 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-black/20 text-white/60 hover:bg-black/40'
                  }`}
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-8 h-8" />, number: '10K+', label: 'Active Writers' },
              { icon: <BookOpen className="w-8 h-8" />, number: '50K+', label: 'Stories Published' },
              { icon: <MessageCircle className="w-8 h-8" />, number: '100K+', label: 'Conversations Started' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-black mb-2">{stat.number}</h3>
                <p className="text-black/60">{stat.label}</p>
              </div>
            ))}
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

export default About;