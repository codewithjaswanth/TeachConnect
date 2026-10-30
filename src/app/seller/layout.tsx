import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SellerNav } from "@/components/SellerNav";
import {
  Upload,
  Store,
  Award,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let seller: any = null;
  try {
    seller = await prisma.sellerProfile.findFirst({
      where: { storeSlug: "mathcraft-studios" },
    });
  } catch (err) {
    console.error("SellerLayout: database query failed", err);
  }

  if (!seller) {
    seller = {
      storeName: "MathCraft Studios",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      tagline: "National Board Certified 5th grade teacher crafting visual math scaffolds",
    };
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Seller Store Banner Card */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-7 shadow-editorial-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={seller?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"}
              alt="Store Avatar"
              className="w-16 h-16 rounded-2xl object-cover border border-[#DDD4C1] shadow-2xs"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-serif font-black text-[#1C1E18]">
                  {seller?.storeName}
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#E4E9DC] text-[#2D3A22] border border-[#C7D4B8] flex items-center gap-1.5 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-[#2D3A22]" />
                  <span>Exclusive Tier (77.5% Royalty)</span>
                </span>
              </div>
              <p className="text-xs text-[#4D5244] mt-1 line-clamp-1">
                {seller?.tagline || "National Board Certified 5th grade teacher crafting visual math scaffolds"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/search?seller=${encodeURIComponent(seller?.storeName || "")}`}
              className="px-3.5 py-2 bg-[#F3EFE6] border border-[#DDD4C1] hover:bg-[#EAE4D5] text-[#1C1E18] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
            >
              <Store className="w-4 h-4 text-[#9C7A3C]" />
              <span>Public Store</span>
            </Link>

            <Link
              href="/seller/products/new"
              className="px-4 py-2 bg-[#2D3A22] hover:bg-[#3B4D2B] text-[#FAF9F5] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-editorial-xs transition border border-[#222C1A]"
            >
              <Upload className="w-4 h-4" />
              <span>Publish New Unit</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation with Dynamic Active State */}
        <SellerNav />

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
