import { SlugPageProps } from "@/const/types";
import { getCachedArticleBySlug } from "@/services/page/getCachedArticleBySlug-service";
import { capitalizeTitle } from "@/utils/capitalizeTitle";
import { generatePageMetadata } from "@/utils/metadata";
import ArticleSlug from "./articleSlug";
import { notFound } from "next/navigation";
import { getCachedArticlesByCategory } from "@/services/page/article-service";
export async function generateMetadata({ params }: SlugPageProps) {
  const param = await params;
  const slug = param.articleSlug ?? "article";
  const articleCategory = param.category ?? "article";
  const title = capitalizeTitle(slug);
  const articleDoc = await getCachedArticleBySlug(slug ?? "");
  if (!articleDoc) {
    return generatePageMetadata({
      title: `${title} | Byggtipset.no`,
      description: `Read expert artikler about ${title} on Byggtipset.no.`,
      path: `/artikler/${articleCategory}/${slug}`,
    });
  }
  const article = await JSON.parse(JSON.stringify(articleDoc));
  const {
    metaTitle,
    metaDescription,
    ogType,
    metaKeywords,
    ogImage,
    ogTitle,
    ogDescription,
    canonicalUrl,
    robots,
    jsonLd,
    publishedDate,
    lastUpdatedDate,
  } = article ?? {};

  return generatePageMetadata({
    title: metaTitle || `${title} | Byggtipset.no`,
    description:
      metaDescription || `Read expert artikler about ${title} on Byggtipset.no.`,
    path: `/artikler/${articleCategory}/${slug}`,
    keywords: metaKeywords
      ? metaKeywords
        ?.split(",")
        ?.map((k: string) => k.trim())
        ?.filter(Boolean)
      : ["byggtipset", "real estate", "artikler"],
    type: ogType || "website",
    image: ogImage || null,
    ogTitle: ogTitle || metaTitle || `${title} | Byggtipset.no`,
    ogDescription:
      ogDescription ||
      metaDescription ||
      `Explore helpful ${title} artikler from Byggtipset.no.`,
    canonicalUrl: canonicalUrl
      ? canonicalUrl.startsWith("/") || canonicalUrl.startsWith("http")
        ? canonicalUrl
        : `/artikler/${articleCategory}/${canonicalUrl}`
      : `/artikler/${articleCategory}/${slug}`,
    robots: robots || "index, follow",
    jsonLd: jsonLd || {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${title} Artikler`,
    },
    publishedDate,
    lastUpdatedDate,
  });
}

const ArticleSlugPage = async ({ params }: SlugPageProps) => {
  const param = await params;
  const title = await param?.articleSlug;
 const categoryOnDetailPage = param.category ?? "article";
  const articlesData = await getCachedArticlesByCategory({
    categorySlug: categoryOnDetailPage,
    page: 1,
    limit: 1,
  });
  if (!title || !articlesData.success) {
    notFound();
  }
  return (
    <div className="max-w-7xl m-auto py-10 px-4 md:px-6 lg:px-8">
      <ArticleSlug slugValue={title} />
    </div>
  );
};

export default ArticleSlugPage;
