"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, DollarSign, Award } from "lucide-react";

export default function EarningsCalculator() {
  const [unitsSold, setUnitsSold] = useState(75);
  const [avgPrice, setAvgPrice] = useState(12);

  const grossSales = unitsSold * avgPrice;
  const exclusiveEarnings = grossSales * 0.775;
  const standardCompetitorEarnings = grossSales * 0.55 - unitsSold * 0.3;
  const monthlyAdvantage = Math.max(0, exclusiveEarnings - standardCompetitorEarnings);
  const annualAdvantage = monthlyAdvantage * 10; // 10-month school year

  return (
    <div className="bg-paper-100 border border-paper-300 rounded-editorial-lg p-6 sm:p-10 shadow-editorial my-12 relative overflow-hidden">
      {/* Background Scholastic Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brass-100/50 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-700 text-xs font-semibold mb-3 border border-forest-200">
              <Sparkles className="w-3.5 h-3.5 text-brass-500" />
              <span>Creator-First Economics</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
              Calculate Your Teacher-Author Royalty Advantage
            </h3>
            <p className="text-sm sm:text-base text-ink-600 mt-2">
              Unlike legacy marketplaces that take up to 45% of your hard-earned curriculum sales, TeachConnect offers an industry-leading <strong className="text-forest-700 font-semibold">77.5% royalty split</strong> on exclusive unit folios.
            </p>
          </div>

          {/* Slider 1: Units Sold */}
          <div className="bg-paper-50 p-5 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-ink-700">Monthly Curriculum Downloads</span>
              <span className="font-serif text-lg font-bold text-forest-700 tabular-nums">
                {unitsSold} units
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={400}
              step={5}
              value={unitsSold}
              onChange={(e) => setUnitsSold(Number(e.target.value))}
              className="w-full accent-forest-700 h-2 bg-paper-300 rounded-lg cursor-pointer"
              aria-label="Monthly curriculum downloads"
            />
            <div className="flex justify-between text-xs text-ink-500">
              <span>10 units (New author)</span>
              <span>200 units</span>
              <span>400+ units (Master author)</span>
            </div>
          </div>

          {/* Slider 2: Average Price */}
          <div className="bg-paper-50 p-5 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-ink-700">Average Unit Folio Price</span>
              <span className="font-serif text-lg font-bold text-forest-700 tabular-nums">
                ${avgPrice.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={30}
              step={1}
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              className="w-full accent-forest-700 h-2 bg-paper-300 rounded-lg cursor-pointer"
              aria-label="Average unit folio price"
            />
            <div className="flex justify-between text-xs text-ink-500">
              <span>$4 (Mini activity)</span>
              <span>$12 (Unit bundle)</span>
              <span>$30 (Semester folio)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Royalty Breakdown Card */}
        <div className="lg:col-span-5 bg-paper-50 border-2 border-brass-300/80 rounded-editorial-lg p-6 sm:p-8 shadow-editorial relative">
          <div className="absolute -top-3 right-6 bg-brass-500 text-paper-50 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>77.5% Exclusive Tier</span>
          </div>

          <div className="text-center pb-6 border-b border-paper-300">
            <p className="text-xs uppercase tracking-wider font-semibold text-ink-500">
              Your Monthly Net Take-Home
            </p>
            <div className="font-serif text-4xl sm:text-5xl font-extrabold text-forest-700 mt-2 tabular-nums">
              ${exclusiveEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Direct Stripe deposit on the 1st of every month
            </p>
          </div>

          <div className="py-5 space-y-3 text-sm">
            <div className="flex justify-between items-center text-ink-600">
              <span>Gross Marketplace Volume:</span>
              <span className="font-medium tabular-nums">${grossSales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-ink-600">
              <span>Competitor 55% Net:</span>
              <span className="font-medium line-through text-ink-400 tabular-nums">
                ${Math.max(0, standardCompetitorEarnings).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center bg-forest-50 p-2.5 rounded-lg border border-forest-200 text-forest-800 font-semibold">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-forest-600" />
                Extra in Your Pocket:
              </span>
              <span className="text-base text-forest-700 tabular-nums">
                +${monthlyAdvantage.toFixed(2)} / mo
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/seller/dashboard"
              className="btn-tactile w-full flex items-center justify-center gap-2 py-3 px-5 rounded-editorial bg-forest-700 hover:bg-forest-600 text-paper-50 font-medium text-sm shadow-editorial-xs group"
            >
              <span>Open Your Teacher Store</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-[11px] text-ink-500 mt-2.5">
              Annual advantage: <strong className="text-forest-700">+${annualAdvantage.toFixed(0)}</strong> per school year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

