"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";


export default function Navbar() {
  const { t } = useLocale();

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper flex justify-between items-center !py-2">
            {/* Left Section */}
            <div className="flex gap-1">
              <Link
                href="/category/gach-op-lat"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {t("navbar.floorings")}
              </Link>

              <Link
                href="/category/thiet-bi-ve-sinh"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {t("navbar.toiletries")}
              </Link>

              <Link
                href="/category/thiet-bi-bep"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {t("navbar.kitchen")}
              </Link>

              <Link
                href="/category/phu-kien"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {t("navbar.accessories")}
              </Link>
            </div>

        {/* Right Section */}
        <div className="flex gap-1">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {t("navbar.contact")}
          </Link>

          <Link
            href="/about"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-110 hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {t("navbar.about_us")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
