import React, { useState } from 'react';
import { useLoading } from './LoadingContext';
import { LoadingButton, InlineLoader } from './LoadingSpinner';

const LoadingDemo = () => {
  const { showLoading, hideLoading } = useLoading();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inlineLoading, setInlineLoading] = useState(false);

  const simulateAPICall = async (duration = 3000) => {
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  const handleGlobalLoading = async () => {
    showLoading('Processing your request...');
    await simulateAPICall(3000);
    hideLoading();
  };

  const handleButtonLoading = async () => {
    setButtonLoading(true);
    await simulateAPICall(2000);
    setButtonLoading(false);
  };

  const handleInlineLoading = async () => {
    setInlineLoading(true);
    await simulateAPICall(2000);
    setInlineLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Loading System Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Demonstration of the global loading system and loading components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Global Loading Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Global Loading</h3>
            <p className="text-gray-600 mb-6">
              Shows a full-screen overlay with spinner. Perfect for API calls and page transitions.
            </p>
            <button
              onClick={handleGlobalLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Show Global Loading
            </button>
          </div>

          {/* Button Loading Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Loading Button</h3>
            <p className="text-gray-600 mb-6">
              Button with integrated loading state. Shows spinner and custom text while processing.
            </p>
            <LoadingButton
              onClick={handleButtonLoading}
              loading={buttonLoading}
              loadingText="Processing..."
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Click Me!
            </LoadingButton>
          </div>

          {/* Inline Loading Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Inline Loader</h3>
            <p className="text-gray-600 mb-6">
              Compact spinner for smaller spaces. Great for inline loading states.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleInlineLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Show Inline Loader
              </button>
              <div className="flex justify-center">
                {inlineLoading && <InlineLoader size="lg" message="Loading..." />}
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
          <h3 className="text-white text-lg font-semibold mb-4">Usage Examples:</h3>
          <pre className="whitespace-pre-wrap">
{`// Global Loading
import { useLoading } from './LoadingContext';

const { showLoading, hideLoading } = useLoading();

// Show global loading
showLoading('Custom message...');

// Hide global loading
hideLoading();

// Loading Button
import { LoadingButton } from './LoadingSpinner';

<LoadingButton
  loading={isLoading}
  loadingText="Processing..."
  onClick={handleClick}
>
  Click Me
</LoadingButton>

// Inline Loader
import { InlineLoader } from './LoadingSpinner';

<InlineLoader size="lg" message="Loading..." />

// API Calls (Automatic Loading)
// Just use apiClient instead of axios - loading is automatic!
import apiClient from '../utils/apiClient';

const response = await apiClient.post('/endpoint', data, {
  loadingMessage: 'Custom loading message...'
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
