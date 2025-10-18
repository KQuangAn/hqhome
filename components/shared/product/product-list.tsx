'use client'

import { Product } from '@/types'
import ProductCard from './product-card'
import { useLocale } from '@/context/LocaleContext'

const ProductList = ({ title, titleKey, data }: { title?: string; titleKey?: string; data: Product[] }) => {
  const { t } = useLocale()
  
  const displayTitle = titleKey ? t(titleKey) : title
  
  return (
    <>
      <h2 className="h2-bold">{displayTitle}</h2>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>{t('product.product_not_found')}</p>
        </div>
      )}
    </>
  )
}

export default ProductList
