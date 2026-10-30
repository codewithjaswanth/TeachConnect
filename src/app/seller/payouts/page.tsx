import React from "react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import {
  DollarSign,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SellerPayoutsPage() {
  const seller = await prisma.sellerProfile.findFirst({
    where: { storeSlug: "mathcraft-studios" },
    include: {
      payouts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!seller) return null;

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Tier Comparison Banner */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-8 shadow-editorial-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE4D5] gap-4">
          <div>
            <span className="text-xs font-bold text-[#2D3A22] uppercase tracking-wider">
              TeachConnect Royalty Structure
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1C1E18] mt-1">
              Seller Membership & Commission Splits
            </h2>
            <p className="text-xs text-[#4D5244] mt-1">
              Transparent, creator-first royalty tiers designed to reward dedicated teacher curriculum authors
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#E4E9DC] text-[#2D3A22] rounded-full text-xs font-bold border border-[#C7D4B8] shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#2D3A22]" />
            <span>Active: Exclusive Membership (77.5%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Tier */}
          <div className="p-6 rounded-2xl border border-[#DDD4C1] bg-[#F3EFE6]/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#1C1E18]">Basic Seller</h3>
              <span className="text-xs text-[#686E5D] font-semibold">$29 One-Time Setup</span>
            </div>
            <div className="text-4xl font-serif font-black text-[#1C1E18]">55%</div>
            <p className="text-xs text-[#4D5244] leading-relaxed">
              Creator keeps 55% of all gross sales with a $0.30 transaction fee per resource sold. No exclusivity required—you may cross-post on Etsy or personal websites.
            </p>
            <ul className="space-y-2 text-xs text-[#686E5D] pt-3 border-t border-[#DDD4C1]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#686E5D]" /> Non-exclusive licensing freedom
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#686E5D]" /> Standard store traffic analytics
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#686E5D]" /> Standard monthly payout schedule
              </li>
            </ul>
          </div>

          {/* Exclusive Tier */}
          <div className="p-6 rounded-2xl border-2 border-[#2D3A22] bg-[#E4E9DC]/40 space-y-4 relative shadow-editorial-xs">
            <div className="absolute top-4 right-4 bg-[#2D3A22] text-[#FAF9F5] text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-2xs">
              Your Active Plan
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#1C1E18]">Exclusive Seller</h3>
              <span className="text-xs text-[#2D3A22] font-bold">$59.95 / year</span>
            </div>
            <div className="text-4xl font-serif font-black text-[#2D3A22]">77.5%</div>
            <p className="text-xs text-[#4D5244] leading-relaxed">
              Creator keeps 77.5% of all gross sales with $0 transaction fees on orders of $3 or more ($0.15 on orders under $3). Requires exclusive listing on TeachConnect.
            </p>
            <ul className="space-y-2 text-xs text-[#2D3A22] font-semibold pt-3 border-t border-[#C7D4B8]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D3A22]" /> Maximized revenue retention (77.5%)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D3A22]" /> $0 transaction fees on standard carts
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D3A22]" /> Advanced search keyword & standard analytics
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2D3A22]" /> Priority promotional catalog placement
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stripe Connect Account Card */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 shadow-editorial-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E4E9DC] text-[#2D3A22] flex items-center justify-center flex-shrink-0 border border-[#C7D4B8]">
            <CreditCard className="w-6 h-6 text-[#2D3A22]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1C1E18]">Stripe Connect Direct Payouts</h3>
              <span className="text-[10px] font-semibold text-[#2D3A22] bg-[#E4E9DC] px-2 py-0.5 rounded border border-[#C7D4B8]">
                Active & Verified
              </span>
            </div>
            <p className="text-xs text-[#686E5D] mt-0.5">
              Connected to Account <span className="font-mono text-[#1C1E18] font-bold">{seller.stripeAccountId}</span> (Direct Bank Deposit)
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#686E5D]">Next Scheduled Disbursal:</span>
          <p className="text-sm font-bold text-[#1C1E18]">November 1, 2026</p>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] shadow-editorial-xs overflow-hidden">
        <div className="p-6 border-b border-[#EAE4D5] flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-[#1C1E18]">Disbursed Payout History</h3>
            <p className="text-xs text-[#686E5D]">Official monthly revenue transfers to your connected bank account</p>
          </div>
          <span className="text-xs text-[#2D3A22] font-semibold bg-[#E4E9DC] px-3 py-1 rounded-full border border-[#C7D4B8]">
            All Transfers Complete
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAE4D5] bg-[#F3EFE6] text-[#4D5244] uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-6">Payout Period</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Transfer Reference</th>
                <th className="py-3 px-6 text-right">Date Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D5]">
              {seller.payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-[#F3EFE6]/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1C1E18]">{payout.payoutPeriod}</td>
                  <td className="py-4 px-4 font-black text-[#2D3A22] text-sm tabular-nums">
                    {formatPrice(payout.amountCents)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 bg-[#E4E9DC] text-[#2D3A22] rounded-full font-bold text-[10px] border border-[#C7D4B8]">
                      {payout.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[#686E5D]">{payout.transferRef || "tr_stripe_auto"}</td>
                  <td className="py-4 px-6 text-right text-[#686E5D]">
                    {new Date(payout.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
