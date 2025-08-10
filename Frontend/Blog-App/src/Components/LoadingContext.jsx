import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');

    const showLoading = (message = 'Loading...') => {
        setLoadingMessage(message);
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
        setLoadingMessage('Loading...');
    };

    return (
        <LoadingContext.Provider 
            value={{ 
                loading, 
                loadingMessage, 
                showLoading, 
                hideLoading 
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
