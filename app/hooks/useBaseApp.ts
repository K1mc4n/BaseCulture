'use client';

import { useEffect, useState } from 'react';

export interface BaseAppContext {
  isBaseApp: boolean;
  user?: {
    address: string;
    chainId: number;
  };
}

export function useBaseApp(): BaseAppContext {
  const [context, setContext] = useState<BaseAppContext>({
    isBaseApp: false,
  });

  useEffect(() => {
    // Check if running in Base App
    if (typeof window !== 'undefined' && (window as any).baseApp) {
      const baseApp = (window as any).baseApp;
      setContext({
        isBaseApp: true,
        user: baseApp.user,
      });
    }
  }, []);

  return context;
}
