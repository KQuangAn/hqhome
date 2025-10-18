import { auth } from '@/auth'
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
import { deleteOrder, getAllOrders, getAllUsers } from '@/lib/actions/order.actions'
import { APP_NAME } from '@/lib/constants'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import OrderPDFExport from '@/components/shared/order/order-pdf-export'

export const metadata: Metadata = {
  title: `Admin Orders - ${APP_NAME}`,
}

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ 
      page: string
      query: string
      userId: string
    }>
  }
) {
  const searchParams = await props.searchParams;

  const {
    page = '1',
    query = '',
    userId = ''
  } = searchParams;

  const session = await auth()
  if (session?.user.role !== 'admin')
    throw new Error('admin permission required')

  const [orders, users] = await Promise.all([
    getAllOrders({
      page: Number(page),
      query: query || undefined,
      userId: userId || undefined,
    }),
    getAllUsers(),
  ])

  return (
    <div className="space-y-4">
      <h1 className="h2-bold">Orders</h1>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input 
          placeholder="Search by Order ID..." 
          defaultValue={query}
          className="w-full sm:max-w-sm"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue={userId}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="whitespace-nowrap">Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>
                  {order.user ? order.user.name : 'Deleted user'}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'not paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : 'not delivered'}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  <OrderPDFExport order={order} />
                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders?.totalPages!} />
        )}
      </div>
    </div>
  )
}
