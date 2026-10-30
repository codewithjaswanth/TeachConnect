import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Star,
  Layers,
  TrendingUp,
  Upload,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage() {
  let seller: any = null;
  let recentOrders: any[] = [];

  try {
    seller = await prisma.sellerProfile.findFirst({
      where: { storeSlug: "mathcraft-studios" },
      include: {
        products: {
          include: {
            reviews: true,
            files: true,
          },
          orderBy: { totalDownloads: "desc" },
        },
        payouts: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (seller) {
      const productIds = seller.products.map((p: any) => p.id);
      recentOrders = await prisma.orderItem.findMany({
        where: { productId: { in: productIds } },
        include: {
          order: { include: { user: true } },
          product: true,
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (err) {
    console.error("SellerDashboardPage: database query failed", err);
  }

  if (!seller) {
    seller = {
      storeName: "MathCraft Studios",
      tier: "EXCLUSIVE",
      totalEarningsCents: 96100,
      totalSales: 1240,
      ratingAverage: 5.0,
      ratingCount: 202,
      products: [],
      payouts: [],
    };
  }

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Royalties */}
        <div className="card-depth-subtle bg-paper-50 rounded-2xl border border-paper-400 p-5 shadow-editorial-xs">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Net Royalties</span>
            <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-forest-700" />
            </div>
          </div>
          <p className="text-2xl font-black text-ink-900 tabular-nums">
            {formatPrice(seller.totalEarningsCents)}
          </p>
          <p className="text-[11px] text-forest-800 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 77.5% Royalty (Exclusive Plan)
          </p>
        </div>

        {/* Curricula Sold */}
        <div className="card-depth-subtle bg-paper-50 rounded-2xl border border-paper-400 p-5 shadow-editorial-xs">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Curricula Sold</span>
            <div className="w-8 h-8 rounded-lg bg-paper-200 text-forest-700 flex items-center justify-center border border-paper-400">
              <ShoppingBag className="w-4 h-4 text-brass-500" />
            </div>
          </div>
          <p className="text-2xl font-black text-ink-900 tabular-nums">
            {seller.totalSales.toLocaleString()} folios
          </p>
          <p className="text-[11px] text-ink-600 font-medium mt-1">Classroom & School licenses</p>
        </div>

        {/* Store Rating */}
        <div className="card-depth-subtle bg-paper-50 rounded-2xl border border-paper-400 p-5 shadow-editorial-xs">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Store Rating</span>
            <div className="w-8 h-8 rounded-lg bg-brass-100 text-brass-700 flex items-center justify-center border border-brass-200">
              <Star className="w-4 h-4 fill-brass-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-ink-900 tabular-nums">{seller.ratingAverage.toFixed(2)}</p>
            <span className="text-xs text-brass-600 font-bold">★★★★★</span>
          </div>
          <p className="text-[11px] text-ink-500 mt-1 tabular-nums">
            Based on {seller.ratingCount} educator reviews
          </p>
        </div>

        {/* Active Products */}
        <div className="card-depth-subtle bg-paper-50 rounded-2xl border border-paper-400 p-5 shadow-editorial-xs">
          <div className="flex items-center justify-between text-ink-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Units</span>
            <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-700 flex items-center justify-center">
              <Layers className="w-4 h-4 text-forest-700" />
            </div>
          </div>
          <p className="text-2xl font-black text-ink-900 tabular-nums">
            {seller.products.length} units listed
          </p>
          <Link
            href="/seller/products/new"
            className="btn-tactile text-[11px] text-forest-800 font-bold mt-1 inline-flex items-center gap-0.5 hover:underline"
          >
            <span>+ Upload new curriculum</span>
          </Link>
        </div>
      </div>

      {/* Published Products Table */}
      <div className="bg-paper-50 rounded-3xl border border-paper-400 shadow-editorial-xs overflow-hidden">
        <div className="p-6 border-b border-paper-300 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-ink-900">
              Your Published Curriculum Units
            </h2>
            <p className="text-xs text-ink-500">
              Live resources actively discoverable in the TeachConnect marketplace
            </p>
          </div>

          <Link
            href="/seller/products/new"
            className="btn-tactile px-3.5 py-2 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl text-xs font-bold transition shadow-editorial-xs flex items-center gap-1.5 border border-forest-850"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Unit</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-paper-300 bg-paper-200 text-ink-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">Curriculum Title</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Downloads</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Formats</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-300">
              {seller.products?.map((product: any) => (
                <tr key={product.id} className="hover:bg-paper-200/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.coverImageUrl}
                        alt={product.title}
                        className="w-12 h-12 rounded-xl object-cover bg-paper-200 flex-shrink-0 border border-paper-400"
                      />
                      <div className="min-w-0 max-w-sm">
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-bold text-ink-900 hover:text-forest-700 line-clamp-1 transition-colors"
                        >
                          {product.title}
                        </Link>
                        <p className="text-[11px] text-ink-500 mt-0.5 tabular-nums">
                          {product.pageCount} pages • {product.files.length} download files
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-ink-900 tabular-nums">
                    {product.isFree ? "Free" : formatPrice(product.priceCents)}
                  </td>
                  <td className="py-4 px-4 font-semibold text-ink-600 tabular-nums">
                    {product.totalDownloads}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 font-bold text-ink-900">
                      <Star className="w-3.5 h-3.5 text-brass-500 fill-brass-500" />
                      <span className="tabular-nums">{product.ratingAverage.toFixed(1)}</span>
                      <span className="text-ink-500 font-normal tabular-nums">({product.ratingCount})</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block text-[10px] font-semibold bg-forest-100 text-forest-800 px-2 py-0.5 rounded-md border border-forest-200">
                      {product.fileFormats}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/product/${product.slug}`}
                      className="btn-tactile text-xs font-bold text-forest-800 hover:underline"
                    >
                      View Live →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Order Stream */}
      {recentOrders.length > 0 && (
        <div className="bg-paper-50 rounded-3xl border border-paper-400 p-6 shadow-editorial-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-paper-300">
            <h3 className="text-base font-serif font-bold text-ink-900">
              Recent Customer Acquisitions
            </h3>
            <span className="text-xs text-ink-500">Live verified transaction stream</span>
          </div>

          <div className="space-y-3">
            {recentOrders?.map((ro: any) => (
              <div
                key={ro.id}
                className="p-4 rounded-2xl border border-paper-400 bg-paper-200/60 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-ink-900">{ro.product.title}</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Purchased by {ro.order.user.name} • {new Date(ro.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-black text-forest-800 text-sm tabular-nums">
                    +{formatPrice(ro.sellerShareCents)}
                  </span>
                  <p className="text-[10px] text-ink-500">Your 77.5% royalty</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
