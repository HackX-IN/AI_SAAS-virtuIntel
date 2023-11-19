"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const websiteUsage = [
  {
    purpose: "Code Optimization",
    benefit:
      "Facilitates efficient code analysis and optimization for improved software performance.",
  },
  {
    purpose: "Design Innovation",
    benefit:
      "Enhances design workflows by providing quick ideation and creating visually stunning graphics.",
  },
  {
    purpose: "Strategic Decision-Making",
    benefit:
      "Supports CEOs in strategic decision-making processes with valuable insights for business development and market analysis.",
  },
  {
    purpose: "Financial Analysis",
    benefit:
      "Contributes to data-driven financial analysis, risk assessment, and strategic planning for CFOs.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Core Capabilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {websiteUsage.map((item, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="text-lg">{item.purpose}</CardTitle>
              <CardContent className="pt-4 px-0">{item.benefit}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
