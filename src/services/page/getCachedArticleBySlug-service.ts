import { Article } from "@/lib/models/models";
import { connectDB } from "@/lib/mongoose";
import { unstable_cache } from "next/cache";

export const getCachedArticleBySlug = unstable_cache(
  async (slug: string) => {
    try {
      await connectDB();

      const article = await Article.findOne({ slug })
        .populate({
          path: "categoryId",
          select: "slug title",
          model: "ArticleCategory",
        })
        .lean();

      if (!article) {
        console.warn(`No article found for slug: ${slug}`);
        return null;
      }

      return article;
    } catch (error) {
      console.error("Article fetch error:", error);
      return null;
    }
  },
);
export const getArticleBySlug = async (slug: string) => {
  return getCachedArticleBySlug(slug);
};