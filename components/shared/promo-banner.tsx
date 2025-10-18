"use client";

import { useState, useEffect } from "react";
import { X, Tag, Truck, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";

const promoBannerMessages = [
  {
    id: 1,
    icon: Tag,
    key: "promo_banner.sale",
    defaultText: "🎉 SALE: Up to 50% off on selected items!",
  },
  {
    id: 2,
    icon: Truck,
    key: "promo_banner.free_shipping",
    defaultText: "🚚 Free shipping on orders over 2,000,000 ₫",
  },
  {
    id: 3,
    icon: Gift,
    key: "promo_banner.deals",
    defaultText: "🎁 Deals of the Month - Don't miss out!",
  },
  {
    id: 4,
    icon: Sparkles,
    key: "promo_banner.new_arrivals",
    defaultText: "✨ New arrivals just dropped - Shop now!",
  },
];

export default function PromoBanner() {
  const { t, locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if banner was dismissed
    const dismissed = localStorage.getItem("promoBannerDismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoBannerMessages.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("promoBannerDismissed", "true");
  };

  if (!isVisible || !isClient) return null;

  const currentMessage = promoBannerMessages[currentIndex];
  const Icon = currentMessage.icon;

  // Fallback to default text if translation key doesn't exist
  const messageText =
    t(currentMessage.key) !== currentMessage.key
      ? t(currentMessage.key)
      : currentMessage.defaultText;

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
      <div className="flex items-center justify-between py-1 px-4">
        <div className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium">
          <Icon className="h-3 w-3 flex-shrink-0 animate-pulse" />
          <span
            className={cn(
              "transition-opacity duration-500",
              "animate-in fade-in slide-in-from-bottom-2"
            )}
          >
            {messageText}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="h-5 w-5 flex-shrink-0 hover:bg-white/20 text-white"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-full">
        <div
          className="h-full bg-white transition-all duration-[5000ms] ease-linear"
          style={{ width: "100%" }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}
