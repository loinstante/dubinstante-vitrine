import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, Mic, Cpu, Share2 } from 'lucide-react';

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: Layers,
      tag: t.features.f1Tag,
      title: t.features.f1Title,
      desc: t.features.f1Desc,
    },
    {
      icon: Mic,
      tag: t.features.f2Tag,
      title: t.features.f2Title,
      desc: t.features.f2Desc,
    },
    {
      icon: Cpu,
      tag: t.features.f3Tag,
      title: t.features.f3Title,
      desc: t.features.f3Desc,
    },
    {
      icon: Share2,
      tag: t.features.f4Tag,
      title: t.features.f4Title,
      desc: t.features.f4Desc,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono font-medium text-[#7a7a85] dark:text-[#8a8a9e] uppercase tracking-wider mb-2">
            {t.features.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121217] dark:text-[#f3f3f6]">
            {t.features.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* 2x2 Grid of capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-[#7c3aed] dark:text-[#926bff]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono text-[#7a7a85] dark:text-[#8a8a9e]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#121217] dark:text-[#f3f3f6] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
