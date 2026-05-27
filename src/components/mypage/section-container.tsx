import React from "react";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionContainer({
  title,
  children,
}: SectionContainerProps) {
  return (
    <section className="w-full">
      <h2 className="text-foreground mb-4 text-lg font-bold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}
