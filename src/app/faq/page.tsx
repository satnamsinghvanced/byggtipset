import Breadcrumbs from "@/components/global/breadcrumbs";
import { getCachedFaqPageData } from "@/services/page/faq-page-service";
import { getCachedFAQs } from "@/services/page/faq-service";
import { generatePageMetadata } from "@/utils/metadata";
import HomePage from "../page";
import FaqContent from "./faqContent";

const getFaqPageData = async () => {
    const doc = await getCachedFaqPageData();
    return await JSON.parse(JSON.stringify(doc));
}

export async function generateMetadata() {
    const faqPage = await getFaqPageData()

    const { metaTitle, metaDescription, metaKeywords, metaImage, ogTitle, ogDescription, canonicalUrl, robots, jsonLd, publishedDate, lastUpdatedDate, subHeading, heading, ogImage, ogType, bannerImage } = faqPage

    return generatePageMetadata({
        title: metaTitle || heading || "faq | Byggtipset.no",
        description: metaDescription || subHeading || "Welcome to Byggtipset.no — compare and find the best real estate agents in Norway.",
        path: "/",
        keywords: metaKeywords ? metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean) : ["byggtipset", "real estate", "agents", "compare"],
        type: ogType || "website",
        image: metaImage || ogImage || bannerImage || null,
        ogTitle: ogTitle || metaTitle || "Home | Byggtipset.no",
        ogDescription: ogDescription || metaDescription || "Compare top real estate agents in Norway easily with Byggtipset.no.",
        canonicalUrl: canonicalUrl,
        robots: robots || "index, follow",
        jsonLd: jsonLd || {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Byggtipset.no"
        },
        publishedDate: publishedDate,
        lastUpdatedDate: lastUpdatedDate,
    });
}

const FaqPage = async () => {
    const doc = await getCachedFAQs();
    const categories = await JSON.parse(JSON.stringify(doc));
    const displayCategories = categories.length > 0 ? categories : {};
    const faqPage = await getFaqPageData()
    const { title, description } = faqPage
    
    return (
        <HomePage>
            <div className='max-w-7xl mx-auto pb-10'>
                <Breadcrumbs className="mt-8" />
                <FaqContent displayCategories={displayCategories} title={title} description={description} />
            </div>
        </HomePage>
    );
};

export default FaqPage;