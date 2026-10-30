import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeroAnimatedSection from "@/components/HeroAnimatedSection";
import CurriculumCarousel from "@/components/CurriculumCarousel";
import EarningsCalculator from "@/components/EarningsCalculator";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Baby,
  Compass,
  Cpu,
  BookmarkCheck,
  ShieldCheck,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let formattedProducts: any[] = [];
  let sellers: any[] = [];

  try {
    const products = await prisma.product.findMany({
      include: {
        seller: true,
      },
      take: 8,
      orderBy: {
        totalDownloads: "desc",
      },
    });

    sellers = await prisma.sellerProfile.findMany({
      take: 3,
      orderBy: {
        totalSales: "desc",
      },
    });

    formattedProducts = products.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.priceCents / 100,
      priceCents: p.priceCents,
      isFree: p.isFree,
      gradeLevels: JSON.parse(p.gradeLevels || "[]"),
      subjects: JSON.parse(p.subjects || "[]"),
      hasEaselActivity: p.isEaselReady,
      isEaselReady: p.isEaselReady,
      fileFormats: p.fileFormats,
      pageCount: p.pageCount,
      coverImage: p.coverImageUrl,
      coverImageUrl: p.coverImageUrl,
      ratingAvg: p.ratingAverage,
      ratingAverage: p.ratingAverage,
      ratingCount: p.ratingCount,
      standards: p.standardsAlignment ? JSON.parse(p.standardsAlignment) : [],
      seller: {
        storeName: p.seller?.storeName || "Master Educator",
        storeSlug: p.seller?.storeSlug || "master-educator",
        avatarUrl: p.seller?.avatarUrl,
        isExclusive: p.seller?.tier === "EXCLUSIVE",
      },
      sellerStoreName: p.seller?.storeName || "Master Educator",
    }));
  } catch (error) {
    console.error("HomePage: Database query failed, using resilient fallback data", error);
    formattedProducts = [
      {
        id: "fb-1",
        title: "5th Grade Complete Fractions Master Unit: Operations, Visual Models & Real-World Word Problems",
        slug: "5th-grade-fractions-master-unit",
        description: "Conquer fraction anxiety with this comprehensive 4-week instructional unit.",
        price: 8.5,
        priceCents: 850,
        isFree: false,
        gradeLevels: ["5th Grade", "6th Grade"],
        subjects: ["Math", "Fractions"],
        fileFormats: "PDF, Google Slides",
        pageCount: 142,
        coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
        ratingAvg: 4.9,
        ratingAverage: 4.9,
        ratingCount: 124,
        standards: ["CCSS.MATH.CONTENT.5.NF.A.1"],
        seller: {
          storeName: "MathCraft Studios",
          storeSlug: "mathcraft-studios",
          avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
          isExclusive: true,
        },
        sellerStoreName: "MathCraft Studios",
      },
      {
        id: "fb-2",
        title: "Science of Reading CVC Word Decodable Readers & Orthographic Mapping Mats",
        slug: "science-of-reading-cvc-decodables",
        description: "Systematic, explicit synthetic phonics decodable readers targeting short vowel families.",
        price: 6.0,
        priceCents: 600,
        isFree: false,
        gradeLevels: ["Kindergarten", "1st Grade"],
        subjects: ["ELA", "Phonics"],
        fileFormats: "PDF, Printable Booklets",
        pageCount: 96,
        coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
        ratingAvg: 5.0,
        ratingAverage: 5.0,
        ratingCount: 89,
        standards: ["CCSS.ELA-LITERACY.RF.K.2"],
        seller: {
          storeName: "Little Learners Early Phonics",
          storeSlug: "little-learners",
          avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150",
          isExclusive: true,
        },
        sellerStoreName: "Little Learners Early Phonics",
      },
      {
        id: "fb-3",
        title: "Plate Tectonics, Earthquakes & Volcanoes: Interactive NGSS Investigation Lab",
        slug: "plate-tectonics-ngss-lab",
        description: "Middle school Earth science unit fully aligned to MS-ESS2-1, MS-ESS2-2, and MS-ESS2-3.",
        price: 5.25,
        priceCents: 525,
        isFree: false,
        gradeLevels: ["6th Grade", "7th Grade"],
        subjects: ["Science", "Earth Science"],
        fileFormats: "PDF, Google Slides, Google Forms Quiz",
        pageCount: 68,
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
        ratingAvg: 4.9,
        ratingAverage: 4.9,
        ratingCount: 67,
        standards: ["MS-ESS2-2"],
        seller: {
          storeName: "STEM Discovery Lab",
          storeSlug: "stem-discovery",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          isExclusive: false,
        },
        sellerStoreName: "STEM Discovery Lab",
      },
      {
        id: "fb-4",
        title: "Back-to-School Classroom Routines & Positive Behavior Visual Anchor Charts (FREE)",
        slug: "back-to-school-visual-routines",
        description: "Calm the chaos in your first six weeks of school with 18 high-resolution visual reminder cards.",
        price: 0,
        priceCents: 0,
        isFree: true,
        gradeLevels: ["Kindergarten", "1st Grade"],
        subjects: ["Classroom Management"],
        fileFormats: "PDF, High-Res PNGs",
        pageCount: 22,
        coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
        ratingAvg: 5.0,
        ratingAverage: 5.0,
        ratingCount: 380,
        standards: [],
        seller: {
          storeName: "MathCraft Studios",
          storeSlug: "mathcraft-studios",
          avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
          isExclusive: true,
        },
        sellerStoreName: "MathCraft Studios",
      },
      {
        id: "fb-5",
        title: "Area & Perimeter Hands-On Task Cards, Real-World Blueprints & Error Analysis",
        slug: "area-and-perimeter-task-cards",
        description: "Transform 3rd and 4th grade geometry into a joyful architecture studio design challenge.",
        price: 4.5,
        priceCents: 450,
        isFree: false,
        gradeLevels: ["3rd Grade", "4th Grade"],
        subjects: ["Math", "Geometry"],
        fileFormats: "PDF, Task Cards",
        pageCount: 52,
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
        ratingAvg: 4.9,
        ratingAverage: 4.9,
        ratingCount: 78,
        standards: ["CCSS.MATH.CONTENT.3.MD.C.7"],
        seller: {
          storeName: "MathCraft Studios",
          storeSlug: "mathcraft-studios",
          avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
          isExclusive: true,
        },
        sellerStoreName: "MathCraft Studios",
      },
    ];

    sellers = [
      {
        id: "s-1",
        storeName: "MathCraft Studios",
        tier: "EXCLUSIVE",
        ratingAverage: 5.0,
        ratingCount: 202,
        totalSales: 1240,
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        bio: "12-year National Board Certified 5th grade math specialist crafting visual scaffolds and rigorous conceptual units.",
      },
      {
        id: "s-2",
        storeName: "Little Learners Early Phonics",
        tier: "EXCLUSIVE",
        ratingAverage: 4.9,
        ratingCount: 89,
        totalSales: 890,
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150",
        bio: "Reading specialist and kindergarten mentor dedicated to structured phonics decodables and orthographic mapping.",
      },
      {
        id: "s-3",
        storeName: "STEM Discovery Lab",
        tier: "BASIC",
        ratingAverage: 4.8,
        ratingCount: 67,
        totalSales: 620,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        bio: "Middle school science department chair publishing phenomenon-based NGSS inquiry labs.",
      },
    ];
  }

  return (
    <div className="space-y-20 pb-28 bg-paper-100 font-sans">
      {/* 1. Hero Section - Dynamic Animated Entrance with Topic Cycler & Metric Count-Up */}
      <HeroAnimatedSection />

      {/* 2. Interactive Semi-Circle Curved Carousel: Acclaimed Masterpieces */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurriculumCarousel
          products={formattedProducts}
          badge="Curator's Choice"
          title="Acclaimed Teacher Masterpieces & Folios"
          subtitle="Top acquired peer-reviewed curriculum units and printable bundles this semester"
          autoPlayInterval={2800}
        />
      </section>

      {/* 3. Grade Band Explorer - Intentional Educational Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-paper-300 pb-4">
          <div>
            <span className="text-[11px] font-bold text-brass-600 uppercase tracking-wider block">
              Curriculum Navigation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-ink-900 mt-0.5">
              Explore by Grade Band
            </h2>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Targeted instructional packages calibrated to developmental milestones
            </p>
          </div>
          <Link
            href="/search"
            className="btn-tactile text-xs font-bold text-forest-700 hover:text-forest-600 flex items-center gap-1.5 group"
          >
            <span>Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {[
            {
              name: "Pre-K & Kindergarten",
              grade: "Kindergarten",
              tag: "Early Childhood",
              desc: "Letter sounds, fine motor, counting & social-emotional foundations",
              icon: Baby,
              count: "1,240 manuscripts",
            },
            {
              name: "1st â€“ 2nd Grade",
              grade: "1st Grade",
              tag: "Primary Elementary",
              desc: "Structured phonics, word families, addition & early reading",
              icon: BookOpen,
              count: "2,150 manuscripts",
            },
            {
              name: "3rd â€“ 5th Grade",
              grade: "5th Grade",
              tag: "Upper Elementary",
              desc: "Fraction operations, passage analysis, ecosystems & novel studies",
              icon: Compass,
              count: "3,890 manuscripts",
            },
            {
              name: "Middle School (6â€“8)",
              grade: "6th Grade",
              tag: "Junior Academy",
              desc: "Pre-algebra, plate tectonics, argumentative essays & ancient history",
              icon: Cpu,
              count: "1,980 manuscripts",
            },
            {
              name: "High School (9â€“12)",
              grade: "High School",
              tag: "Upper Academy",
              desc: "Advanced calculus, AP chemistry, literary criticism & civics",
              icon: GraduationCap,
              count: "1,450 manuscripts",
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={idx}
                href={`/search?grade=${encodeURIComponent(item.grade)}`}
                className="card-depth p-5 bg-paper-50 border border-paper-400 hover:border-forest-700 rounded-2xl flex flex-col justify-between border-l-4 border-l-forest-600/70 hover:border-l-forest-700 shadow-editorial-xs group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-paper-200 group-hover:bg-forest-100 text-forest-800 flex items-center justify-center mb-4 transition-colors border border-paper-400">
                    <IconComponent className="w-5 h-5 text-forest-700 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-bold text-brass-600 uppercase tracking-wider block">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-ink-900 text-base group-hover:text-forest-700 transition-colors mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-paper-300 flex items-center justify-between text-xs">
                  <span className="text-ink-500 tabular-nums">{item.count}</span>
                  <span className="text-forest-700 font-bold group-hover:translate-x-1.5 transition-transform">â†’</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Teacher Author Creator Economy & Royalty Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EarningsCalculator />
      </section>

      {/* 6. Distinguished Educator-Scholars */}
      <section className="bg-paper-200 border-y border-paper-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-brass-600 uppercase tracking-wider block">
              Educator Provenance
            </span>
            <h2 className="text-3xl font-serif font-black text-ink-900 mt-1">
              Distinguished Teacher-Authors
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-2 leading-relaxed">
              Follow peer-recognized master teachers publishing original research, pedagogical visual scaffolds, and standards-aligned folios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <div
                key={seller.id}
                className="card-depth bg-paper-50 rounded-3xl border border-paper-400 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={seller.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"}
                      alt={seller.storeName}
                      className="w-14 h-14 rounded-2xl object-cover border border-paper-400 shadow-editorial-xs"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-ink-900 text-base">{seller.storeName}</h3>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-forest-800 border border-forest-200 mt-0.5">
                        {seller.tier} Tier Author
                      </span>
                      <div className="flex items-center gap-1 text-xs text-brass-600 font-bold mt-1">
                        <span>â˜… {seller.ratingAverage.toFixed(1)}</span>
                        <span className="text-ink-500 font-normal tabular-nums">({seller.ratingCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-ink-600 line-clamp-3 leading-relaxed">
                    {seller.bio || seller.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-paper-300 flex items-center justify-between text-xs">
                  <span className="text-ink-500 tabular-nums font-medium">
                    {seller.totalSales.toLocaleString()} curriculum downloads
                  </span>
                  <Link
                    href={`/search?seller=${encodeURIComponent(seller.storeName)}`}
                    className="btn-tactile font-bold text-forest-700 hover:text-forest-600 flex items-center gap-1 group"
                  >
                    <span>View Store</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pedagogical Pillars Trust Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brass-600 uppercase tracking-wider block">
            Academic Integrity
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 mt-1">
            Built on Institutional Educator Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-paper-50 p-6 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ink-900">Peer-Reviewed</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Every unit is tested in real classrooms and vetted by certified educators before catalog inclusion.
            </p>
          </div>

          <div className="bg-paper-50 p-6 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ink-900">CCSS & NGSS Mapped</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Standard-tagged resources ensure instructional alignment with state and national pacing guidelines.
            </p>
          </div>

          <div className="bg-paper-50 p-6 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ink-900">COPPA & FERPA Safe</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Zero student PII storage. Compliant digital environments designed for public school districts.
            </p>
          </div>

          <div className="bg-paper-50 p-6 rounded-editorial border border-paper-300 shadow-editorial-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ink-900">Lifetime Vault Backup</h4>
            <p className="text-xs text-ink-600 leading-relaxed">
              Instant permanent re-downloads and free revision updates for all acquired units.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
