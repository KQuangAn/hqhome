import DeleteDialog from '@/components/shared/delete-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteCategory, getAllCategories } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import { formatId } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Admin Categories - ${APP_NAME}`,
}

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Categories</h1>
        <Button asChild variant="default">
          <Link href="/admin/categories/create">Create Category</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>SLUG</TableHead>
              <TableHead>PARENT</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{formatId(category.id)}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.parentId ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={category.id} action={deleteCategory} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
