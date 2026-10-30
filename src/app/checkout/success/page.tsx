import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import {
  CheckCircle2,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Receipt,
  FileText,
  School,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: {
          product: {
            include: {
              files: true,
              seller: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  // Get user's library items corresponding to this order
  const libraryItems = await prisma.libraryItem.findMany({
    where: {
      userId: order.userId,
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      {/* Success Hero Header */}
      <div className="bg-[#E4E9DC] border border-[#C7D4B8] rounded-3xl p-8 text-center space-y-4 shadow-editorial-xs">
        <div className="w-16 h-16 bg-[#2D3A22] text-[#FAF9F5] rounded-2xl flex items-center justify-center mx-auto shadow-editorial-sm">
          <CheckCircle2 className="w-9 h-9 text-[#E9DAA2]" />
        </div>
        <h1 className="text-3xl font-serif font-black text-[#1C1E18]">
          Order Confirmed! Resources Archived to Your Vault
        </h1>
        <p className="text-xs sm:text-sm text-[#4D5244] max-w-lg mx-auto leading-relaxed">
          Thank you for your order, <span className="font-bold text-[#1C1E18]">{order.user.name}</span>. An itemized invoice receipt and download links have been delivered to{" "}
          <span className="font-semibold text-[#1C1E18] underline">{order.user.email}</span>.
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FAF9F5] text-[#2D3A22] rounded-full text-xs font-mono font-bold border border-[#C7D4B8] shadow-2xs">
          <Receipt className="w-3.5 h-3.5 text-[#9C7A3C]" />
          <span>Order #{order.orderNumber}</span>
        </div>
      </div>

      {/* Immediate Download Vault Cards */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-8 shadow-editorial-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D5]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1C1E18]">Your Immediate Download Vault</h2>
            <p className="text-xs text-[#686E5D]">Download un-watermarked master curriculum packages below</p>
          </div>
          <Link
            href="/library"
            className="text-xs font-bold text-[#2D3A22] hover:text-[#3B4D2B] flex items-center gap-1 group"
          >
            <span>View All in Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => {
            const libItem = libraryItems.find((l) => l.productId === item.productId);
            const downloadToken = libItem ? libItem.downloadToken : "demo-token";

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-[#DDD4C1] bg-[#F3EFE6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.product.coverImageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover bg-[#FAF9F5] flex-shrink-0 border border-[#DDD4C1]"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-serif font-bold text-[#1C1E18] truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-[#686E5D] mt-0.5">
                      By {item.product.seller.storeName} • {item.licenseType === "SCHOOL_SEAT" ? `${item.seatCount} School Seats` : "Classroom License"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {item.product.files.map((f) => (
                        <span
                          key={f.id}
                          className="text-[10px] font-medium bg-[#FAF9F5] text-[#2D3A22] px-2.5 py-0.5 rounded-md border border-[#DDD4C1] flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-[#2D3A22]" />
                          <span>{f.fileName}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`/api/download/${downloadToken}`}
                    download
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#2D3A22] hover:bg-[#3B4D2B] text-[#FAF9F5] rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-editorial-xs transition border border-[#222C1A]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Files</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary & Lifetime Access Notice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-[#FAF9F5] rounded-2xl border border-[#DDD4C1] text-xs text-[#4D5244] space-y-2.5 shadow-editorial-xs">
          <h3 className="font-serif font-bold text-[#1C1E18] text-sm mb-2">Order Information</h3>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-semibold text-[#1C1E18]">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Paid:</span>
            <span className="font-bold text-[#1C1E18] tabular-nums">{formatPrice(order.totalAmountCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Order Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="p-6 bg-[#FAF9F5] rounded-2xl border border-[#DDD4C1] text-xs text-[#4D5244] space-y-2 shadow-editorial-xs">
          <div className="flex items-center gap-1.5 text-[#2D3A22] font-bold text-sm mb-1">
            <ShieldCheck className="w-4 h-4 text-[#2D3A22]" />
            <span>Lifetime Curriculum Protection</span>
          </div>
          <p className="leading-relaxed">
            All curriculum packages are permanently linked to your account. Whenever author-teachers release revised editions or additional supplementary files, you receive free lifetime downloads.
          </p>
        </div>
      </div>
    </div>
  );
}
