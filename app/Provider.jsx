
"use client";


import { ContextProvider } from "./context/Context";

export function Providers({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}
