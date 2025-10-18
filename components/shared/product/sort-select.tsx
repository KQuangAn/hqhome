'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'

interface SortSelectProps {
  currentSort: string
  productsCount: number
  page: number
}

export default function SortSelect({ currentSort, productsCount, page }: SortSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        {productsCount > 0 ? (
          <>
            Showing {(page - 1) * 12 + 1}-
            {Math.min(page * 12, productsCount)} of {productsCount}{' '}
            products
          </>
        ) : (
          'No products found'
        )}
      </p>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px] text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="lowest">Price: Low to High</SelectItem>
          <SelectItem value="highest">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
