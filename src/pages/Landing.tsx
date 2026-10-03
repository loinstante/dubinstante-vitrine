import React from 'react';
import { Hero } from '../components/Hero';
import { KeywordMarquee } from '../components/KeywordMarquee';
import { StatsBar } from '../components/StatsBar';
import { StudioPreview } from '../components/StudioPreview';
import { Features } from '../components/Features';
import { Audience } from '../components/Audience';
import { Comparison } from '../components/Comparison';
import { OpenSourceSection } from '../components/OpenSourceSection';
import { Faq } from '../components/Faq';
import { BetaCTA } from '../components/BetaCTA';

export const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <KeywordMarquee />
      <StatsBar />
      <StudioPreview />
      <Features />
      <Audience />
      <Comparison />
      <OpenSourceSection />
      <Faq />
      <BetaCTA />
    </>
  );
};
