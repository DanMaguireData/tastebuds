// Theme
import React from "react";
// Components
import { Card } from "@/components/layout/Card";
import { Spacer } from "@/components/layout/Spacer";
import { ShimmeringView } from "@/components/common/ShimmeringView";
// Hooks
import { useTheme } from "@/hooks/useTheme";

export function ProfileInfoSkeleton() {
  const { theme } = useTheme();

  return (
    <Card>
      <ShimmeringView style={{ height: 14, width: "25%", borderRadius: 4 }} />
      <Spacer size="xs" />
      <ShimmeringView style={{ height: 18, width: "60%", borderRadius: 4 }} />
    </Card>
  );
}
