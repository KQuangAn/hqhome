'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Filter, X } from 'lucide-react'
import ProductFilters from './product-filters'
import { useLocale } from '@/context/LocaleContext'

interface MobileFilterDrawerProps {
  categorySlug: string
  availableAttributes: Record<string, string[]>
  categoryAttributeKeys: string[]
  activeFilterCount: number
}

export default function MobileFilterDrawer({
  categorySlug,
  availableAttributes,
  categoryAttributeKeys,
  activeFilterCount,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const { t } = useLocale()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full md:hidden relative">
          <Filter className="h-4 w-4 mr-2" />
          {t('product.filters')}
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>{t('product.filters')}</DrawerTitle>
          <DrawerDescription>
            {t('product.filter_products_description')}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <ProductFilters
            categorySlug={categorySlug}
            availableAttributes={availableAttributes}
            categoryAttributeKeys={categoryAttributeKeys}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">
              {t('common.close')}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

