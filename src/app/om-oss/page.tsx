import Breadcrumbs from "@/components/global/breadcrumbs";
import { getCachedAboutData } from "@/services/page/about-service";
import { generatePageMetadata } from "@/utils/metadata";
import NotFoundPage from "../not-found";
import AboutContent from "./aboutContent";

async function getAboutData() {
  const doc: any = await getCachedAboutData();
  return await JSON.parse(JSON.stringify(doc));
}

export const dynamic = "force-static";

export async function generateMetadata() {
  const aboutData = await getAboutData();
  if (!aboutData) {
    return generatePageMetadata({
      title: "About | Byggtipset.no",
      description: "Learn more about Byggtipset.no",
      path: "/about",
    });
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
    jsonLd,
    publishedDate,
    lastUpdatedDate,
    slug,
    heading,
    subHeading,
    ogImage,
    ogType,
    image,
  } = aboutData;
  return generatePageMetadata({
    title: metaTitle || heading || "About Byggtipset.no",
    description:
      metaDescription || subHeading || "Learn more about Byggtipset.no",
    path: slug || "/om-oss",
    keywords: metaKeywords
      ? metaKeywords
          .split(",")
          ?.map((k: string) => k.trim())
          .filter(Boolean)
      : ["om-oss", "byggtipset", "real estate"],
    type: ogType || "website",
    image: metaImage || ogImage || image || null,
    ogTitle: ogTitle || metaTitle || heading || "Om oss | Byggtipset.no",
    ogDescription:
      ogDescription ||
      metaDescription ||
      subHeading ||
      "Lær mer om Byggtipset.no",
    canonicalUrl: canonicalUrl || "/om-oss",
    robots: robots || "index, follow",
    jsonLd: jsonLd || {},
    publishedDate: publishedDate || "2025-11-28T00:00:00Z",
    lastUpdatedDate: lastUpdatedDate || "2025-11-28T00:00:00Z",
  });
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  if (!aboutData) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Breadcrumbs className="mt-8" />
      <AboutContent
        content={{
          image: aboutData?.image,
          content: [
            { title: aboutData?.heading, descriptions: aboutData?.subHeading },
            {
              title: aboutData?.heading1,
              descriptions: aboutData?.subHeading1,
            },
          ],
        }}
      />
    </>
  );
}
