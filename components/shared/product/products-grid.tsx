'use client'

import { Product } from '@/types'
import ProductCard from './product-card'
import Pagination from '@/components/shared/pagination'

interface ProductsGridProps {
  products: Product[]
  page: number
  totalPages: number
}

export default function ProductsGrid({ products, page, totalPages }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filters to see more results.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </>
  )
}
