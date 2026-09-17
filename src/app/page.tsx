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
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 md:p-12 mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10 pointer-events-none" />
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Müziğin Ritmini <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Kesintisiz Yaşa
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Türkiye'nin en seçkin 30 radyo kanalı tek bir platformda. Arka planda çalmaya devam eden premium deneyimle müziği hisset.
            </p>
          </div>
          
          {/* Main Search Bar */}
          <div className="w-full md:w-96 glass-panel rounded-2xl p-4 border-white/10 bg-background/50">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              İstasyon Ara
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Örn: Kral FM, TRT..."
                className="w-full bg-secondary/80 border border-white/5 focus:border-primary focus:bg-secondary rounded-xl py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Kategoriler</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {sortedCategories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                selectedCategory === category 
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                  : 'bg-card text-muted-foreground border-white/5 hover:bg-secondary hover:text-foreground hover:border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
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
