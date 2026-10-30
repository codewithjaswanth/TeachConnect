import { prisma } from "./prisma";

export interface SearchParams {
  q?: string;
  grade?: string;
  subject?: string;
  price?: string;
  format?: string;
  sort?: string;
  seller?: string;
}

export async function searchProducts(params: SearchParams): Promise<any[]> {
  const { q, grade, subject, price, format, sort, seller } = params;

  // Build Prisma where clause
  const where: any = {};

  if (q && q.trim()) {
    const term = q.trim();
    where.OR = [
      { title: { contains: term } },
      { description: { contains: term } },
      { subjects: { contains: term } },
      { gradeLevels: { contains: term } },
      { standardsAlignment: { contains: term } },
    ];
  }

  if (grade && grade !== "all") {
    where.gradeLevels = { contains: grade };
  }

  if (subject && subject !== "all") {
    where.subjects = { contains: subject };
  }

  if (format && format !== "all") {
    if (format === "Easel") {
      where.isEaselReady = true;
    } else {
      where.fileFormats = { contains: format };
    }
  }

  if (seller && seller !== "all") {
    where.seller = {
      storeName: { contains: seller },
    };
  }

  if (price && price !== "all") {
    if (price === "free") {
      where.isFree = true;
    } else if (price === "under-5") {
      where.priceCents = { gt: 0, lte: 500 };
    } else if (price === "5-to-10") {
      where.priceCents = { gt: 500, lte: 1000 };
    } else if (price === "10-plus") {
      where.priceCents = { gt: 1000 };
    }
  }

  // Sorting
  let orderBy: any = { totalDownloads: "desc" };
  if (sort === "rating") {
    orderBy = { ratingAverage: "desc" };
  } else if (sort === "newest") {
    orderBy = { createdAt: "desc" };
  } else if (sort === "price-low") {
    orderBy = { priceCents: "asc" };
  } else if (sort === "price-high") {
    orderBy = { priceCents: "desc" };
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        seller: true,
        previews: true,
      },
    });

    return products;
  } catch (error) {
    console.error("searchProducts: Database query failed, returning fallback catalog", error);
    return getFallbackSearchProducts(params);
  }
}

function getFallbackSearchProducts(params: SearchParams) {
  const allFallbacks = [
    {
      id: "fb-1",
      title: "5th Grade Complete Fractions Master Unit: Operations, Visual Models & Real-World Word Problems",
      slug: "5th-grade-fractions-master-unit",
      description: "Conquer fraction anxiety with this comprehensive 4-week instructional unit.",
      priceCents: 850,
      isFree: false,
      gradeLevels: JSON.stringify(["5th Grade", "6th Grade"]),
      subjects: JSON.stringify(["Math", "Fractions"]),
      fileFormats: "PDF, Google Slides",
      pageCount: 142,
      coverImageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
      ratingAverage: 4.9,
      ratingCount: 124,
      totalDownloads: 1240,
      isEaselReady: true,
      standardsAlignment: JSON.stringify(["CCSS.MATH.CONTENT.5.NF.A.1"]),
      createdAt: new Date(),
      seller: {
        storeName: "MathCraft Studios",
        storeSlug: "mathcraft-studios",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        tier: "EXCLUSIVE",
      },
      previews: [],
    },
    {
      id: "fb-2",
      title: "Science of Reading CVC Word Decodable Readers & Orthographic Mapping Mats",
      slug: "science-of-reading-cvc-decodables",
      description: "Systematic, explicit synthetic phonics decodable readers targeting short vowel families.",
      priceCents: 600,
      isFree: false,
      gradeLevels: JSON.stringify(["Kindergarten", "1st Grade"]),
      subjects: JSON.stringify(["ELA", "Phonics"]),
      fileFormats: "PDF, Printable Booklets",
      pageCount: 96,
      coverImageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
      ratingAverage: 5.0,
      ratingCount: 89,
      totalDownloads: 890,
      isEaselReady: true,
      standardsAlignment: JSON.stringify(["CCSS.ELA-LITERACY.RF.K.2"]),
      createdAt: new Date(),
      seller: {
        storeName: "Little Learners Early Phonics",
        storeSlug: "little-learners",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150",
        tier: "EXCLUSIVE",
      },
      previews: [],
    },
    {
      id: "fb-3",
      title: "Plate Tectonics, Earthquakes & Volcanoes: Interactive NGSS Investigation Lab",
      slug: "plate-tectonics-ngss-lab",
      description: "Middle school Earth science unit fully aligned to MS-ESS2-1, MS-ESS2-2, and MS-ESS2-3.",
      priceCents: 525,
      isFree: false,
      gradeLevels: JSON.stringify(["6th Grade", "7th Grade"]),
      subjects: JSON.stringify(["Science", "Earth Science"]),
      fileFormats: "PDF, Google Slides, Google Forms Quiz",
      pageCount: 68,
      coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      ratingAverage: 4.9,
      ratingCount: 67,
      totalDownloads: 620,
      isEaselReady: true,
      standardsAlignment: JSON.stringify(["MS-ESS2-2"]),
      createdAt: new Date(),
      seller: {
        storeName: "STEM Discovery Lab",
        storeSlug: "stem-discovery",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        tier: "BASIC",
      },
      previews: [],
    },
    {
      id: "fb-4",
      title: "Back-to-School Classroom Routines & Positive Behavior Visual Anchor Charts (FREE)",
      slug: "back-to-school-visual-routines",
      description: "Calm the chaos in your first six weeks of school with 18 high-resolution visual reminder cards.",
      priceCents: 0,
      isFree: true,
      gradeLevels: JSON.stringify(["Kindergarten", "1st Grade"]),
      subjects: JSON.stringify(["Classroom Management"]),
      fileFormats: "PDF, High-Res PNGs",
      pageCount: 22,
      coverImageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
      ratingAverage: 5.0,
      ratingCount: 380,
      totalDownloads: 2150,
      isEaselReady: false,
      standardsAlignment: null,
      createdAt: new Date(),
      seller: {
        storeName: "MathCraft Studios",
        storeSlug: "mathcraft-studios",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        tier: "EXCLUSIVE",
      },
      previews: [],
    },
    {
      id: "fb-5",
      title: "Area & Perimeter Hands-On Task Cards, Real-World Blueprints & Error Analysis",
      slug: "area-and-perimeter-task-cards",
      description: "Transform 3rd and 4th grade geometry into a joyful architecture studio design challenge.",
      priceCents: 450,
      isFree: false,
      gradeLevels: JSON.stringify(["3rd Grade", "4th Grade"]),
      subjects: JSON.stringify(["Math", "Geometry"]),
      fileFormats: "PDF, Task Cards",
      pageCount: 52,
      coverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
      ratingAverage: 4.9,
      ratingCount: 78,
      totalDownloads: 430,
      isEaselReady: false,
      standardsAlignment: JSON.stringify(["CCSS.MATH.CONTENT.3.MD.C.7"]),
      createdAt: new Date(),
      seller: {
        storeName: "MathCraft Studios",
        storeSlug: "mathcraft-studios",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        tier: "EXCLUSIVE",
      },
      previews: [],
    },
  ];

  return allFallbacks as any;
}

