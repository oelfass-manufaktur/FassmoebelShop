import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/shop";

const baseUrl = "https://fassmoebel-shop.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sonderanfertigung`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/kategorie/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/produkt/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
