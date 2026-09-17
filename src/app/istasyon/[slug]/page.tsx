import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import radiosData from "@/data/radios.json";
import { Radio } from "@/context/PlayerContext";
import { RadioTower, Info, Headphones } from "lucide-react";
import RadioCard from "@/components/RadioCard";

export async function generateStaticParams() {
  return radiosData.map((radio) => ({
    slug: radio.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const radio = radiosData.find((r) => r.slug === p.slug);
  
  if (!radio) {
    return { title: "Radyo Bulunamadı" };
  }

  return {
    title: `${radio.name} Canlı Dinle - Kesintisiz Radyo | radiodinle.com`,
    description: radio.description,
  };
}

export default async function StationPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const radio = radiosData.find((r) => r.slug === p.slug) as Radio | undefined;

  if (!radio) {
    notFound();
  }

  // Get similar radios (same category, excluding current)
  const similarRadios = radiosData
    .filter((r) => r.category === radio.category && r.id !== radio.id)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Station Header */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        
        {/* Logo */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-card flex-shrink-0 z-10">
          <img
            src={radio.logoUrl}
            alt={radio.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(radio.name) + "&background=8b5cf6&color=fff&size=256";
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
            {radio.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {radio.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {radio.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-sm text-foreground bg-secondary px-4 py-2 rounded-lg">
              <RadioTower className="w-4 h-4 text-primary" />
              <span>{radio.frequency}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground bg-secondary px-4 py-2 rounded-lg">
              <Headphones className="w-4 h-4 text-primary" />
              <span>Canlı Yayın</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Details Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Hakkında
          </h2>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p>
              <strong>{radio.name}</strong>, Türkiye'nin önde gelen {radio.category.toLowerCase()} radyolarından biridir. Sitemiz üzerinden {radio.name} yayınını 7/24 kesintisiz, cızırtısız ve yüksek ses kalitesinde dinleyebilirsiniz.
            </p>
            <p>
              Mobil uyumlu altyapımız sayesinde ister bilgisayarınızdan, ister cep telefonunuzdan {radio.name} dinleme keyfini her yerde yaşayın. Arka planda çalma özelliği ile web sitemizde gezinirken müziğiniz asla kesilmez.
            </p>
          </div>
        </div>

        {/* Sidebar / Similar Stations */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Benzer Radyolar</h3>
          <div className="grid grid-cols-2 gap-4">
            {similarRadios.length > 0 ? (
              similarRadios.map((simRadio) => (
                <RadioCard key={simRadio.id} radio={simRadio} />
              ))
            ) : (
              <div className="col-span-2 text-sm text-muted-foreground">
                Bu kategoride başka radyo bulunamadı.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
