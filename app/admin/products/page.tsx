import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input 
          placeholder="Search products..." 
          defaultValue={searchText}
          className="w-full sm:max-w-sm"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue={category}>
            <SelectTrigger className="w-full sm:w-[200px]">
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
          <Button variant="outline" className="whitespace-nowrap">Filter</Button>
        </div>
      </div>

      <div>
        {/* Mobile Card Layout */}
        <div className="block md:hidden space-y-4">
          {products?.data.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500">{formatId(product.id)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatCurrency(product.price)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p>{product.category?.name || 'No Category'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Brand:</span>
                    <p>{product.brand?.name || 'No Brand'}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                    <DeleteDialog id={product.id} action={deleteProduct} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto">
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
        </div>
        
        {products?.totalPages! > 1 && (
          <Pagination page={page} totalPages={products?.totalPages!} />
        )}
      </div>
    </div>
  )
}
