import ProductForm from '@/components/shared/admin/product-form'
import { getAllCategories, getAllBrands } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Create product - ${APP_NAME}`,
}

export default async function CreateProductPage() {
  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ])

  return (
    <>
      <h1 className="h2-bold">Create Product</h1>

      <div className="my-8">
        <ProductForm 
          type="Create" 
          categories={categories}
          brands={brands}
        />
      </div>
    </>
  )
}
