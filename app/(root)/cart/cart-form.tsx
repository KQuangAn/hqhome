'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '@/lib/actions/cart.actions'
import { formatCurrency } from '@/lib/utils'
import { Cart } from '@/types'
import { ArrowRight, Loader, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import CartPDFExport from '@/components/shared/cart/cart-pdf-export'

export default function CartForm({ cart }: { cart?: Cart }) {
  const router = useRouter()

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3">
            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-4">
              {cart.items.map((item) => (
                <Card key={item.slug} className="p-4">
                  <div className="flex items-start gap-3">
                    <Link href={`/product/${item.productId}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-medium text-sm line-clamp-2 mb-2">{item.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            disabled={isPending}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() =>
                              startTransition(async () => {
                                const res = await removeItemFromCart(item.productId)
                                if (!res.success) {
                                  toast({
                                    variant: 'destructive',
                                    description: res.message,
                                  })
                                }
                              })
                            }
                          >
                            {isPending ? (
                              <Loader className="w-3 h-3 animate-spin" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </Button>
                          <span className="text-sm font-medium min-w-[20px] text-center">{item.qty}</span>
                          <Button
                            disabled={isPending}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() =>
                              startTransition(async () => {
                                const res = await addItemToCart(item)
                                if (!res.success) {
                                  toast({
                                    variant: 'destructive',
                                    description: res.message,
                                  })
                                }
                              })
                            }
                          >
                            {isPending ? (
                              <Loader className="w-3 h-3 animate-spin" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{formatCurrency(item.price)}</p>
                          <Button
                            disabled={isPending}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() =>
                              startTransition(async () => {
                                const res = await deleteItemFromCart(item.productId)
                                if (!res.success) {
                                  toast({
                                    variant: 'destructive',
                                    description: res.message,
                                  })
                                } else {
                                  toast({
                                    description: res.message,
                                  })
                                }
                              })
                            }
                          >
                            {isPending ? (
                              <Loader className="w-3 h-3 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3 text-red-500" />
                            )}
                          </Button>
                        </div>
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
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.productId}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="flex-center gap-2">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(item.productId)
                              if (!res.success) {
                                toast({
                                  variant: 'destructive',
                                  description: res.message,
                                })
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item)
                              if (!res.success) {
                                toast({
                                  variant: 'destructive',
                                  description: res.message,
                                })
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await deleteItemFromCart(item.productId)
                              if (!res.success) {
                                toast({
                                  variant: 'destructive',
                                  description: res.message,
                                })
                              } else {
                                toast({
                                  description: res.message,
                                })
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className="p-4 gap-4">
                <div className="pb-3 text-xl">
                  Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                  {formatCurrency(cart.itemsPrice)}
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() =>
                      startTransition(() => router.push('/shipping-address'))
                    }
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader className="animate-spin w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    Proceed to Checkout
                  </Button>
                  
                  <CartPDFExport
                    cartItems={cart.items}
                    totalPrice={cart.totalPrice}
                    itemsPrice={cart.itemsPrice}
                    shippingPrice={cart.shippingPrice}
                    taxPrice={cart.taxPrice}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
