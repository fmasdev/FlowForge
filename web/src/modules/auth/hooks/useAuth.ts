// src/modules/auth/hooks/useAuth.ts

'use client';

import { AuthContext } from "@/modules/auth/auth.context";
import { AuthContextType } from "@/modules/auth/types/auth.types";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};