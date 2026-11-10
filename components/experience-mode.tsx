"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ExperienceMode = "systems" | "design";
type ExperienceModeContextValue = { mode: ExperienceMode; setMode: (mode: ExperienceMode) => void };
const ExperienceModeContext = createContext<ExperienceModeContextValue | null>(null);

export function ExperienceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ExperienceMode>("systems");
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ExperienceModeContext.Provider value={value}><div className="portfolio-shell" data-mode={mode}>{children}</div></ExperienceModeContext.Provider>;
}

export function useExperienceMode() {
  const value = useContext(ExperienceModeContext);
  if (!value) throw new Error("useExperienceMode must be used inside ExperienceModeProvider");
  return value;
}
