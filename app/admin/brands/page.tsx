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
import { deleteBrand, getAllBrands } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import { formatId } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Admin Brands - ${APP_NAME}`,
}

export default async function AdminBrandsPage() {
  const brands = await getAllBrands()

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Brands</h1>
        <Button asChild variant="default">
          <Link href="/admin/brands/create">Create Brand</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>SLUG</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands?.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{formatId(brand.id)}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.slug}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/brands/${brand.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={brand.id} action={deleteBrand} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
