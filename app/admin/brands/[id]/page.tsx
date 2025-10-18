import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import BrandForm from '@/components/shared/admin/brand-form'
import { getAllBrands } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Update Brand - ${APP_NAME}`,
}

export default async function UpdateBrandPage(
  props: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await props.params;
  const { id } = params;

  const brands = await getAllBrands()
  const brand = brands.find(b => b.id === id)

  if (!brand) notFound()
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Brand</h1>
      <BrandForm 
        type="Update" 
        brand={brand}
      />
    </div>
  )
}
