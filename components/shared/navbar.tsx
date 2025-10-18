"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);

  const navigationLinks = [
    { href: "/category/gach-op-lat", label: t("navbar.floorings") },
    { href: "/category/thiet-bi-ve-sinh", label: t("navbar.toiletries") },
    { href: "/category/thiet-bi-bep", label: t("navbar.kitchen") },
    { href: "/category/phu-kien", label: t("navbar.accessories") },
  ];

  const rightLinks = [
    { href: "/contact", label: t("navbar.contact") },
    { href: "/about", label: t("navbar.about_us") },
  ];

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper !py-2">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Left Section */}
          <div className="flex gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex gap-1">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {navigationLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-medium transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground whitespace-nowrap"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="mt-2 space-y-1 border-t pt-2">
              {/* Additional Category Links */}
              <div className="space-y-1">
                {navigationLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground rounded-md"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Right Links */}
              <div className="space-y-1 border-t pt-2">
                {rightLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground rounded-md"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
