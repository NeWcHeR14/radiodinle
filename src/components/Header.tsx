import React from "react";
import Link from "next/link";
import { RadioTower, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <div className="bg-primary/10 p-2 rounded-xl">
            <RadioTower className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground hidden sm:inline-block">
            radyodinle.com
          </span>
        </Link>

        {/* Navigation - Simplified */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Keşfet
            </Link>
          </nav>
        </div>
        
      </div>
    </header>
  );
}
