'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import { PRODUCT_ATTRIBUTES } from '@/lib/constants'

interface ActiveFiltersProps {
  categoryAttributeKeys: string[]
}

export default function ActiveFilters({ categoryAttributeKeys }: ActiveFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t, locale } = useLocale()

  const activeFilters: { key: string; label: string; value: string }[] = []

  categoryAttributeKeys.forEach(key => {
    const values = searchParams.get(key)?.split(',').filter(Boolean) || []
    if (values.length > 0) {
      const attributeConfig = PRODUCT_ATTRIBUTES[key as keyof typeof PRODUCT_ATTRIBUTES]
      const label = locale === 'vi' && attributeConfig && 'label_vi' in attributeConfig
        ? attributeConfig.label_vi
        : attributeConfig?.label || key

      values.forEach(value => {
        activeFilters.push({ key, label, value })
      })
    }
  })

  const removeFilter = (filterKey: string, filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(filterKey)?.split(',').filter(Boolean) || []
    
    const updatedValues = currentValues.filter(v => v !== filterValue)
    
    if (updatedValues.length > 0) {
      params.set(filterKey, updatedValues.join(','))
    } else {
      params.delete(filterKey)
    }
    
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    categoryAttributeKeys.forEach(key => params.delete(key))
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-4 bg-muted/50 rounded-lg">
      <span className="text-sm font-medium">{t('product.active_filters')}:</span>
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.key}-${filter.value}-${index}`}
          variant="secondary"
          className="px-3 py-1"
        >
          <span className="text-xs font-normal">
            {filter.label}: {filter.value}
          </span>
          <button
            onClick={() => removeFilter(filter.key, filter.value)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="text-xs"
      >
        {t('product.clear_all')}
      </Button>
    </div>
  )
}

