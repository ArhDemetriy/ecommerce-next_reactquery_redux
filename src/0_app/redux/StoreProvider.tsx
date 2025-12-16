'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import type { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { makePersistor, makeStore } from './store';

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = makePersistor(storeRef.current);
  }

  useEffect(() => {
    if (!storeRef.current) return;

    const unsubscribe = setupListeners(storeRef.current.dispatch);
    return unsubscribe;
  }, []);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
