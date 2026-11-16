/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import EstimatorSection from './components/EstimatorSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import OfferFormSection, { OfferPrefill } from './components/OfferFormSection';
import ProcessAndProofSection from './components/ProcessAndProofSection';
import StockCriteriaSection from './components/StockCriteriaSection';
import { formatRupiah } from './data/kaizoData';
import {
  EstimatorInput,
  EstimatorResult,
  StockCriteriaItem,
} from './types/kaizo';

export default function App() {
  const [offerPrefill, setOfferPrefill] = useState<OfferPrefill>({
    triggerCount: 0,
  });

  const scrollToOffer = () => {
    const el = document.getElementById('tawarin');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCriteria = (item: StockCriteriaItem) => {
    setOfferPrefill((prev) => ({
      specsSummary: item.presetSpec,
      triggerCount: prev.triggerCount + 1,
    }));
    scrollToOffer();
  };

  const handleApplyEstimate = (
    input: EstimatorInput,
    result: EstimatorResult
  ) => {
    const specialLabel =
      input.specialItem === 'old-bundle'
        ? 'ada Bundle Old / Criminal'
        : input.specialItem === 'sg2'
          ? 'ada SG2 populer'
          : 'item standar';
    const midPoint = Math.round((result.minPrice + result.maxPrice) / 2 / 5000) * 5000;

    setOfferPrefill((prev) => ({
      loginType: input.loginType,
      condition: input.condition,
      specsSummary: `Vault ${input.vaultCount} set, Evo Gun Max ${input.evoMaxCount}, ${specialLabel}.`,
      askingPrice: String(midPoint),
      estimatedBracket: `${formatRupiah(result.minPrice)} – ${formatRupiah(result.maxPrice)}`,
      triggerCount: prev.triggerCount + 1,
    }));
    scrollToOffer();
  };

  return (
    <div className="min-h-screen bg-[#090C12] text-slate-100">
      <Navbar onJumpToOffer={scrollToOffer} />
      <main>
        <HeroSection onJumpToOffer={scrollToOffer} />
        <StockCriteriaSection onSelectCriteria={handleSelectCriteria} />
        <EstimatorSection onApplyEstimate={handleApplyEstimate} />
        <ProcessAndProofSection />
        <OfferFormSection prefill={offerPrefill} />
      </main>
      <Footer />
    </div>
  );
}
