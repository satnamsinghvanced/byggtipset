import Breadcrumbs from "@/components/global/breadcrumbs";
import { getCachedCityBySlugData } from "@/services/data/getPlaceBySlug-service";
import { capitalizeTitle } from "@/utils/capitalizeTitle";
import type { Metadata } from "next";
import SlugContent from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugValue = slug;

  const titleFromSlug = capitalizeTitle(slugValue);

  const doc = await getCachedCityBySlugData(slugValue);
  const raw = doc?.data;
  const placeData = Array.isArray(raw) ? raw[0] : raw;

  if (!placeData) {
    return {
      title: "Prosjekter | Byggtipset.no",
      description: "Finn prosjekter i ditt område",
      robots: "index, follow",
      alternates: {
        canonical: `https://Byggtipset.no/entreprenor/${slugValue}`,
      },
      openGraph: {
        title: "Prosjekter | Byggtipset.no",
        description: "Finn prosjekter i ditt område",
        url: `https://Byggtipset.no/entreprenor/${slugValue}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Prosjekter | Byggtipset.no",
        description: "Finn prosjekter i ditt område",
      },
    };
  }

  const {
    metaTitle,
    metaDescription,
    metaKeywords,
    metaImage,
    ogTitle,
    ogDescription,
    canonicalUrl,
    robots,
    ogImage,
    ogType,
  } = placeData || {};

 const BASE_URL = "https://byggtipset.no";

const canonical =
  canonicalUrl &&
  canonicalUrl.startsWith(`${BASE_URL}/entreprenor/`)
    ? canonicalUrl
    : `${BASE_URL}/entreprenor/${slugValue}`;


  return {
     title:
      placeData?.data?.title ||
      placeData?.data?.companyName ||
      placeData?.companyName ||
      placeData?.title ||
      placeData?.name ||
      metaTitle ||
      ogTitle || `${titleFromSlug} | Byggtipset.no`,
    description: metaDescription || ogDescription || "",
    keywords: metaKeywords
      ? metaKeywords.split(",").map((k: any) => k.trim())
      : undefined,
    robots: robots || "index, follow",
    alternates: { canonical },
    openGraph: {
      title: ogTitle || metaTitle || titleFromSlug,
      description: ogDescription || metaDescription || "",
      url: canonical,
      type: ogType || "website",
      images:
        ogImage || metaImage ? [{ url: (ogImage || metaImage) as string }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle || metaTitle || titleFromSlug,
      description: ogDescription || metaDescription || "",
      images: ogImage || metaImage,
    },
  };
}

const SlugPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<any>;
}) => {
  const { slug } = await params;
  const slugValue = slug;

  const resolvedSearchParams = await searchParams;
  const county = resolvedSearchParams?.county || "";

  return (
    <>
      <Breadcrumbs className="mt-8" />
      <div className="max-w-7xl m-auto py-10 px-4 md:px-6 lg:px-8">
        <SlugContent
          slug={slugValue}
          county={county as string}
          searchParams={resolvedSearchParams}
        />
      </div>
    </>
  );
};

export default SlugPage;
