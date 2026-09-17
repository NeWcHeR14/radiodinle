"use client";

import React, { useState, useMemo } from "react";
import RadioCard from "@/components/RadioCard";
import radiosData from "@/data/radios.json";
import { Sparkles, TrendingUp, Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const categories = Array.from(new Set(radiosData.map((r) => r.category)));
  
  // Custom category sorting to bring popular ones first
  const sortedCategories = ["Tümü", ...categories.sort((a, b) => {
    const popular = ["Pop", "Slow", "Arabesk", "Yabancı", "Haber", "Dini", "Karma", "Kültür", "Yöresel"];
    const indexA = popular.indexOf(a);
    const indexB = popular.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  })];

  const filteredRadios = useMemo(() => {
    return radiosData.filter((radio) => {
      const matchesSearch = radio.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            radio.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Tümü" || radio.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 px-4 py-12 md:py-16 mb-12 text-center flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            Müziğin Ritmini <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
              Kesintisiz Yaşa
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl">
            Türkiye'nin en seçkin radyoları tek bir platformda. Arka planda çalmaya devam eden premium deneyimle favori frekansını keşfet.
          </p>
          
          {/* Main Search Bar */}
          <div className="w-full max-w-xl relative group mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Radyo, frekans veya kategori ara..."
              className="w-full bg-secondary/40 backdrop-blur-md border border-white/10 focus:border-primary/50 focus:bg-secondary/60 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] rounded-full py-4 pl-12 pr-6 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="w-full max-w-3xl flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center px-4 md:px-0 mask-image-fade">
            {sortedCategories.map(category => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                    : 'bg-card/50 backdrop-blur-sm text-muted-foreground border-white/5 hover:bg-secondary hover:text-foreground hover:border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stations / Search Results */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery ? "Arama Sonuçları" : selectedCategory !== "Tümü" ? `${selectedCategory} Radyoları` : "Tüm Radyolar"}
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredRadios.length} istasyon
          </div>
        </div>
        
        {filteredRadios.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredRadios.map((radio) => (
              <RadioCard key={radio.id} radio={radio} />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 text-center glass-panel rounded-3xl border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Sonuç Bulunamadı</h3>
            <p className="text-muted-foreground">
              Aramanıza veya seçtiğiniz kategoriye uygun radyo istasyonu bulunamadı.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tümü");
              }}
              className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>
      
    </div>
  );
}
