import CategoryForm from '@/components/shared/admin/category-form'
import { getAllCategories } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Create Category - ${APP_NAME}`,
}

export default async function CreateCategoryPage() {
  const categories = await getAllCategories()

  return (
    <>
      <h1 className="h2-bold">Create Category</h1>

      <div className="my-8">
        <CategoryForm 
          type="Create" 
          categories={categories}
        />
      </div>
    </>
  )
}
