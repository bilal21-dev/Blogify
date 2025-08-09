import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Heart, Edit3, Key, BookOpen, Users, Sparkles } from 'lucide-react';

const faqData = [
  {
    id: '1',
    question: 'How do I create a blog on verse?',
    icon: <Edit3 className="w-5 h-5" />,
    answer: {
      title: 'To create a blog:',
      steps: [
        'Sign up for an account or log in if you already have one.',
        'Navigate to your profile and click on the "Create Blog" button.',
        'Fill in the required details like title, content, and tags.',
        'Click "Publish" to share your blog with the world.'
      ]
    }
  },
  {
    id: '2',
    question: 'Can I edit or delete a blog after publishing it?',
    icon: <BookOpen className="w-5 h-5" />,
    answer: {
      text: 'Yes, you can edit or delete your blogs anytime. Go to your profile, find the blog you want to modify, and select the "Edit" or "Delete" option.'
    }
  },
  {
    id: '3',
    question: 'Is there a way to like or comment on blogs?',
    icon: <Heart className="w-5 h-5" />,
    answer: {
      text: 'Absolutely! You can like blogs by clicking the heart icon and share your thoughts by leaving comments at the bottom of each blog post.'
    }
  },
  {
    id: '4',
    question: 'What should I do if I forget my password?',
    icon: <Key className="w-5 h-5" />,
    answer: {
      text: 'If you forget your password, click on the "Forgot Password" link on the login page. Enter your email, and you\'ll receive instructions to reset your password.'
    }
  }
];

const PremiumFAQ = () => {
  const [activeItems, setActiveItems] = useState(['1']);

  const toggleItem = (id) => {
    setActiveItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-200 to-purple-400 relative overflow-hidden z-[-999]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-black/80 text-sm font-medium">Support Center</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-black via-blue-800 to-blue-200 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-black/60 text-lg max-w-2xl mx-auto">
              Everything you need to know about creating and managing your blogs on Verse
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-black/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-purple-800 transition-colors duration-300">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-black/60 transition-all duration-300 ${
                      activeItems.includes(item.id) ? 'rotate-180 text-purple-400' : 'group-hover:text-purple-600'
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    activeItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 border-t border-white/10">
                    {item.answer.title && (
                      <p className="font-semibold text-black mb-4">{item.answer.title}</p>
                    )}
                    
                    {item.answer.steps ? (
                      <ol className="space-y-3">
                        {item.answer.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3 text-black/70">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <span className="leading-relaxed text-black/70">{step}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-black/70 leading-relaxed">{item.answer.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 p-8 bg-white/30 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-black text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-black/60 mb-6">Our support team is here to help you 24/7</p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Contact Support
            </button>
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

export default PremiumFAQ;