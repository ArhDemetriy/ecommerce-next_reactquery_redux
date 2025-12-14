'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from './store';
import type { AppStore } from './types';

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    if (!storeRef.current) return;

    const unsubscribe = setupListeners(storeRef.current.dispatch);
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
