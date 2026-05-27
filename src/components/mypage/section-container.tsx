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
      <h2 className="text-lg font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
