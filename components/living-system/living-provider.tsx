'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createMotionEngine, type MotionEngine } from './motion-engine';

const LivingContext = createContext<MotionEngine | null>(null);
export function LivingProvider({ children }: { children: ReactNode }) {
  const [engine] = useState(createMotionEngine);
  useEffect(() => engine.mount(), [engine]);
  return <LivingContext.Provider value={engine}>{children}</LivingContext.Provider>;
}
export function useLivingSystem() {
  const engine = useContext(LivingContext);
  if (!engine) throw new Error('LivingProvider is required for Greenway motion.');
  return engine;
}
