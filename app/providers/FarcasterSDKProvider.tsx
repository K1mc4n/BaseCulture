'use client';

import { ReactNode } from 'react';
import { useFarcasterSDK } from '@/app/hooks/useFarcasterSDK';

export function FarcasterSDKProvider({ children }: { children: ReactNode }) {
  const { error } = useFarcasterSDK();

  if (error) {
    console.error('Farcaster SDK Error:', error);
    // Continue rendering even if SDK fails to initialize
  }

  return <>{children}</>;
}
