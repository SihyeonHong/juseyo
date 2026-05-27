import React from "react";

import { Card } from "@/components/shadcn-ui/card";

interface EmptySectionProps {
  title: string;
}

export default function EmptySection({ title }: EmptySectionProps) {
  return (
    <Card className="border-border/80 from-card to-secondary/30 dark:border-border dark:bg-muted/10 flex min-h-32 items-center justify-center border border-dashed bg-linear-to-b shadow-xs ring-0">
      <span className="text-muted-foreground/80 text-xs">
        {title} 콘텐츠 영역
      </span>
    </Card>
  );
}
