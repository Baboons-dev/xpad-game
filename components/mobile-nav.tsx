"use client";

import { Home, Layers, Gamepad2, Coins } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/layerx", label: "LayerX", icon: Layers },
    { href: "/ixos", label: "IXOs", icon: Coins, disabled: true },
    { href: "/xplay", label: "xPlay", icon: Gamepad2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border h-16 px-4 md:hidden">
      <div className="h-full max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-muted transition-colors",
                pathname === item.href && "text-brand-lime",
                item.disabled && "opacity-50 pointer-events-none"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {item.disabled && (
                <span className="absolute -top-2 text-[10px] px-1 rounded-full bg-brand-lime text-background">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}