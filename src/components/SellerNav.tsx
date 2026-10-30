"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Upload, DollarSign } from "lucide-react";

export function SellerNav() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/seller/dashboard",
      label: "Store Metrics & Sales",
      icon: LayoutDashboard,
      isActive: pathname === "/seller/dashboard",
    },
    {
      href: "/seller/products/new",
      label: "Product Ingestion Wizard",
      icon: Upload,
      isActive: pathname.startsWith("/seller/products"),
    },
    {
      href: "/seller/payouts",
      label: "Stripe Payouts & Tiers",
      icon: DollarSign,
      isActive: pathname.startsWith("/seller/payouts"),
    },
  ];

  return (
    <nav aria-label="Seller Navigation Tabs" className="flex items-center gap-2 border-b border-[#EAE4D5] pb-1 overflow-x-auto font-sans">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              tab.isActive
                ? "border-[#2D3A22] text-[#2D3A22] font-bold bg-[#E4E9DC]/60"
                : "border-transparent text-[#686E5D] hover:text-[#1C1E18] hover:bg-[#F3EFE6]"
            }`}
          >
            <IconComponent className={`w-4 h-4 ${tab.isActive ? "text-[#2D3A22]" : "text-[#9C7A3C]"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

