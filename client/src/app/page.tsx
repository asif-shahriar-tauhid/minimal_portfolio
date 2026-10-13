import { Suspense } from "react";
import { getPortfolioData } from "@/lib/api";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";

export const instant = false;

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PortfolioClient initialData={data} />
    </Suspense>
  );
}
