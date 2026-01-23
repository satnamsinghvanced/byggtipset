import Image from "next/image";
import Link from "next/link";
import FeatureChip from "../chips/featureChip";
import Star from "../star";
import { formatData } from "@/utils/formatData";

interface AgentCardProps {
  companyName?: string;
  averageRating?: number;
  totalRating?: number;
  description?: string;
  features?: string[];
  slug?: string;
  companyImage?: string;
  isRecommended?: boolean;
}

const AgentCard = async ({
  companyName = "",
  averageRating = 0,
  totalRating = 0,
  isRecommended = false,
  description = "",
  features = [],
  slug = "",
  companyImage = "",
}: AgentCardProps) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
  const fullUrl = companyImage ? `${imageBaseUrl}${companyImage}` : "";

  let isImageValid = false;

  if (companyImage) {
    try {
      const response = await fetch(fullUrl, { method: "HEAD" });
      isImageValid = response.ok;
    } catch {
      isImageValid = false;
    }
  }

  return (
    <div className="p-5 border border-dark/40 w-full relative bg-background rounded-lg overflow-hidden">
      {isRecommended && (
        <div className="p-0.5 font-semibold text-base bg-primary uppercase w-fit absolute text-background px-9 top-5 -left-[42px] rotate-315 z-2">
          Anbefalt
        </div>
      )}

      <div className="flex gap-6 w-full">
        {isImageValid && (
          <div className="flex justify-center items-start">
            <Image
              src={fullUrl}
              width={120}
              height={45}
              quality={100}
              alt={companyName || "company logo"}
              className="mb-6"
              loading="lazy"
            />
          </div>
        )}

        <div className="w-full">
          <h6 className="font-semibold text-[32px] max-lg:!text-[20px] text-primary pb-0.5 leading-7">
            {companyName}
          </h6>

          {averageRating !== 0 && totalRating !== 0 && (
            <Star averageRating={averageRating} totalRating={totalRating} />
          )}

          {features.length > 0 && (
            <div className="pt-3 flex gap-2 flex-wrap">
              {features.slice(0, 4).map((feature, index) => (
                <FeatureChip key={index} label={feature} />
              ))}
            </div>
          )}
        </div>

        <Link
          className="flex justify-center items-center w-36 h-10 max-sm:hidden bg-transparent border border-primary text-primary rounded-xl hover:bg-primary hover:text-background transition-all duration-300"
          href={`/entreprenor/${slug ? slug.replace(/\s+/g, "") : "default_slug"}`}
        >
          Se profil
        </Link>
      </div>

      <div className="mt-2">
        <div
          dangerouslySetInnerHTML={{
            __html: formatData(description || ""),
          }}
          className="text-secondary line-clamp-2"
        />

        <Link
          className="px-8 !w-[185px] !h-[48px] mt-6 flex justify-center items-center sm:hidden bg-transparent border border-primary text-primary rounded-xl hover:bg-primary hover:text-background transition-all duration-300"
          href={`/entreprenor/${slug ? slug.replace(/\s+/g, "") : "default_slug"}`}
        >
          Se profil
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
