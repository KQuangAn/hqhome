'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/context/LocaleContext'
import { PRODUCT_ATTRIBUTES } from '@/lib/constants'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  categorySlug: string
  availableAttributes: Record<string, string[]>
  categoryAttributeKeys: string[]
}

export default function ProductFilters({
  categorySlug,
  availableAttributes,
  categoryAttributeKeys,
}: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t, locale } = useLocale()

  const handleFilterChange = (attributeKey: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(attributeKey)?.split(',').filter(Boolean) || []

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value)
      }
    } else {
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      }
    }

    if (currentValues.length > 0) {
      params.set(attributeKey, currentValues.join(','))
    } else {
      params.delete(attributeKey)
    }

    // Reset to page 1 when filters change
    params.set('page', '1')

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Remove all attribute filters but keep page and sort
    categoryAttributeKeys.forEach(key => {
      params.delete(key)
    })
    
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const hasActiveFilters = categoryAttributeKeys.some(key => searchParams.get(key))

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{t('product.filters')}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            {t('product.clear_all')}
          </Button>
        )}
      </div>

      {/* Render filters for each attribute */}
      {categoryAttributeKeys.map(attributeKey => {
        const values = availableAttributes[attributeKey]
        if (!values || values.length === 0) return null

        const attributeConfig = PRODUCT_ATTRIBUTES[attributeKey as keyof typeof PRODUCT_ATTRIBUTES]
        if (!attributeConfig) return null

        const label = locale === 'vi' && 'label_vi' in attributeConfig
          ? attributeConfig.label_vi
          : attributeConfig.label

        const selectedValues = searchParams.get(attributeKey)?.split(',').filter(Boolean) || []

        return (
          <div key={attributeKey} className="border-b pb-4">
            <h4 className="font-medium mb-3">{label}</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {values.map(value => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${attributeKey}-${value}`}
                    checked={selectedValues.includes(value)}
                    onCheckedChange={(checked) =>
                      handleFilterChange(attributeKey, value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${attributeKey}-${value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {categoryAttributeKeys.every(key => !availableAttributes[key] || availableAttributes[key].length === 0) && (
        <p className="text-sm text-muted-foreground">{t('product.no_filters_available')}</p>
      )}
    </div>
  )
}

