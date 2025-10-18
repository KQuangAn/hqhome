import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteProduct, getAllProducts, getAllCategories } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import { formatCurrency, formatId } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Admin Products - ${APP_NAME}`,
}

export default async function AdminProductsPage(
  props: {
    searchParams: Promise<{
      page: string
      query: string
      category: string
    }>
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1
  const searchText = searchParams.query || ''
  const category = searchParams.category || ''
  
  const [products, categories] = await Promise.all([
    getAllProducts({
      query: searchText,
      category,
      page,
    }),
    getAllCategories(),
  ])

  return (
    <div className="space-y-4">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Input 
          placeholder="Search products..." 
          defaultValue={searchText}
          className="max-w-sm"
        />
        <Select defaultValue={category}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">Filter</Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>BRAND</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell>{product.category?.name || 'No Category'}</TableCell>
                <TableCell>{product.brand?.name || 'No Brand'}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products?.totalPages! > 1 && (
          <Pagination page={page} totalPages={products?.totalPages!} />
        )}
      </div>
    </div>
  )
}
