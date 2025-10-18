import { carts, orderItems, orders, products, categories, brands } from '@/db/schema'
import {
  cartItemSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from '@/lib/validator'
import { InferSelectModel } from 'drizzle-orm'
import { z } from 'zod'

// PRODUCTS
export type Product = InferSelectModel<typeof products> & {
  category?: Category | null
  brand?: Brand | null
}
export type Category = InferSelectModel<typeof categories>
export type Brand = InferSelectModel<typeof brands>

// CART
export type Cart = InferSelectModel<typeof carts>
export type CartItem = z.infer<typeof cartItemSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type PaymentResult = z.infer<typeof paymentResultSchema>

// ORDERS

export type Order = InferSelectModel<typeof orders> & {
  orderItems: OrderItem[]
  user: { name: string | null; email: string }
}
export type OrderItem = InferSelectModel<typeof orderItems>
