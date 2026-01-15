'use client';

import { useEffect, useState } from 'react';

export interface BaseAppContext {
  isBaseApp: boolean;
  user?: {
    address: string;
    chainId: number;
  };
}

interface WindowWithBaseApp extends Window {
  baseApp?: {
    user?: BaseAppContext['user'];
  };
}

export function useBaseApp(): BaseAppContext {
  const [context, setContext] = useState<BaseAppContext>({
    isBaseApp: false,
  });

  useEffect(() => {
    // Check if running in Base App
    if (typeof window !== 'undefined' && (window as WindowWithBaseApp).baseApp) {
      const baseApp = (window as WindowWithBaseApp).baseApp;
      setContext({
        isBaseApp: true,
        user: baseApp?.user,
      });
    }
  }, []);

  return context;
}
