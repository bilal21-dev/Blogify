import { useEffect } from 'react';
import { useLoading } from '../Components/LoadingContext';
import { setupAxiosInterceptors } from '../utils/apiClient';

export const useAxiosInterceptors = () => {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setupAxiosInterceptors(showLoading, hideLoading);
  }, [showLoading, hideLoading]);
};
