import React from "react";

import { Card } from "@/components/shadcn-ui/card";

interface EmptySectionProps {
  title: string;
}

export default function EmptySection({ title }: EmptySectionProps) {
  return (
    <Card className="flex min-h-32 items-center justify-center border border-dashed border-border/80 bg-linear-to-b from-card to-secondary/30 shadow-xs ring-0 dark:border-border dark:bg-muted/10">
      <span className="text-xs text-muted-foreground/80">
        {title} 콘텐츠 영역
      </span>
    </Card>
  );
}
