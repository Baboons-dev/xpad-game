"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, Gamepad2, Coins } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const features = [
    {
      title: "LayerX",
      icon: Layers,
      description: "Explore the revolutionary LayerX ecosystem",
      href: "/layerx",
      disabled: false,
    },
    {
      title: "IXOs",
      icon: Coins,
      description: "Coming soon - Experience the future of digital assets",
      href: "/ixos",
      disabled: true,
    },
    {
      title: "xPlay",
      icon: Gamepad2,
      description: "Play the Ultimate Fighter Championship",
      href: "/xplay",
      disabled: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-brand-lime">Xpad Features</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-4 sm:p-6 bg-card relative overflow-hidden">
                {feature.disabled && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-brand-lime text-background">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-lg bg-brand-lime/10 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-brand-lime" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-brand-white">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm mb-3 sm:mb-4">{feature.description}</p>
                <Button
                  className={cn("text-sm sm:text-base", feature.disabled && "opacity-50")}
                  disabled={feature.disabled}
                  asChild
                >
                  <Link href={feature.disabled ? "#" : feature.href}>
                    Explore {feature.title}
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}