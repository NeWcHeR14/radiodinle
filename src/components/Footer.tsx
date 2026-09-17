import React from "react";
import Link from "next/link";
import { RadioTower } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-primary mb-4">
              <RadioTower className="w-5 h-5" />
              <span className="font-bold text-lg text-foreground">radyodinle.com</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Türkiye'nin en sevilen radyolarını kesintisiz, reklamsız ve yüksek kalitede dinleyin. Modern ve hızlı radyo dinleme platformu.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Pop</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Arabesk</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Haber</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Slow</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">İletişim & DMCA</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} radiodinle.com. Tüm hakları saklıdır.</p>
          <p className="mt-2 md:mt-0 max-w-2xl text-center md:text-right">
            Sitemizde yayınlanan radyo yayınları kendi resmi web sitelerinden alınmaktadır. Telif hakkı sahipleri içeriklerinin kaldırılması için bizimle iletişime geçebilirler.
          </p>
        </div>
      </div>
      
      {/* Pad bottom for the sticky player */}
      <div className="h-24 md:h-28"></div>
    </footer>
  );
}
