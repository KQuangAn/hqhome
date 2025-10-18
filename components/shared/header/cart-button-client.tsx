'use client'

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";

interface CartButtonClientProps {
  itemCount: number
}

export default function CartButtonClient({ itemCount }: CartButtonClientProps) {
  const { t } = useLocale()
  
  return (
    <Button asChild variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="mr-1" />
        {t('navbar.cart')}
        {itemCount > 0 && (
          <Badge className="ml-1">
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

