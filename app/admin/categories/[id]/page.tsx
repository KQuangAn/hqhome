import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CategoryForm from '@/components/shared/admin/category-form'
import { getAllCategories } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Update Category - ${APP_NAME}`,
}

export default async function UpdateCategoryPage(
  props: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await props.params;
  const { id } = params;

  const [categories, category] = await Promise.all([
    getAllCategories(),
    // We need to get the specific category by ID
    // For now, we'll find it from the categories list
    getAllCategories().then(cats => cats.find(cat => cat.id === id))
  ])

  if (!category) notFound()
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Category</h1>
      <CategoryForm 
        type="Update" 
        category={category}
        categories={categories}
      />
    </div>
  )
}
