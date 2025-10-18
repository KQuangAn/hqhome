import BrandForm from '@/components/shared/admin/brand-form'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Create Brand - ${APP_NAME}`,
}

export default async function CreateBrandPage() {
  return (
    <>
      <h1 className="h2-bold">Create Brand</h1>

      <div className="my-8">
        <BrandForm type="Create" />
      </div>
    </>
  )
}
