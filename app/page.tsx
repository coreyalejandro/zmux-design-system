import { Suspense } from "react";
import { SkipLink } from "@/components/layout";
import { DesignSystemShowcase } from "@/components/showcase/DesignSystemShowcase";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-sanctuary-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading ZMUX Design System...</p>
            </div>
          </div>
        }
      >
        <DesignSystemShowcase />
      </Suspense>
    </>
  );
}
