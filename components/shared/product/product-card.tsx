"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Copy } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLocale();

  // Use database pricing fields
  const basePrice = product.basePrice ? Number(product.basePrice) : null;
  const discountPrice = product.discountPrice
    ? Number(product.discountPrice)
    : null;
  const currentPrice = Number(product.price);

  // Calculate discount percentage dynamically
  const discountPercentage =
    basePrice && discountPrice && discountPrice < basePrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : 0;

  const rightBanner =
    discountPercentage > 0 ? (
      <Badge variant="default" className="text-xs bg-blue-600 text-white">
        -{discountPercentage}%
      </Badge>
    ) : null;

  // Right-side (status badge)
  let leftBanner = null;
  if (product.stock === 0) {
    leftBanner = (
      <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
        {t("product.new_arrivals")}
      </Badge>
    );
  } else if (product.isFeatured) {
    leftBanner = (
      <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
        {t("product.hot_seller")}
      </Badge>
    );
  } else if (product.stock > 0 && product.stock <= 10) {
    leftBanner = (
      <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
        {t("product.trending")}
      </Badge>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 ">{leftBanner}</div>
        <div className="absolute top-2 right-2">{rightBanner}</div>
      </div>

      {/* Product Information Section */}
      <div className="p-4 space-y-3">
        {/* Price Section */}
        <div className="space-y-1">
          {/* Base Price (only show if there's a discount) */}
          {basePrice && discountPrice && discountPrice < basePrice && (
            <p className="text-sm text-gray-400 line-through">
              {t("product.original_price")}: {formatCurrency(basePrice)}/m²
            </p>
          )}

          {/* Current Price */}
          <p className="text-lg font-bold text-black">
            {formatCurrency(currentPrice)}/m²
          </p>

          {/* Discount Price (only show if it's different from current price and less than base price) */}
          {discountPrice && discountPrice < currentPrice && (
            <p className="text-sm text-gray-500">
              {t("product.member_discount")} {formatCurrency(discountPrice)}/m²
            </p>
          )}
        </div>

        {/* Brand Name */}
        <p className="text-sm font-medium text-black">
          {product.brand?.name || "Insert brand name"}
        </p>

        {/* Product Description/Name */}
        <p className="text-sm text-black line-clamp-2">{product.name}</p>

        {/* Product Code */}
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">
            {product.sku || t("product.product_code")}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(product.sku || "");
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            asChild
            className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            size="sm"
          >
            <Link href={`/product/${product.id}`}>
              {t("product.view_details")}
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-gray-200 hover:bg-gray-300"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
