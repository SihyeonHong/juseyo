"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// next-themes의 ThemeProvider wrapper
export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
