import { CartItem, PaymentResult, ShippingAddress } from '@/types'
import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  json,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { primaryKey } from 'drizzle-orm/pg-core/primary-keys'
import { AdapterAccountType } from 'next-auth/adapters'

// USERS
export const users = pgTable(
  'user',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull().default('NO_NAME'),
    email: text('email').notNull(),
    role: text('role').notNull().default('user'),
    password: text('password'),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    address: json('address').$type<ShippingAddress>(),
    paymentMethod: text('paymentMethod'),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => {
    return {
      userEmailIdx: uniqueIndex('user_email_idx').on(table.email),
    }
  }
)

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

// CATEGORIES
export const categories = pgTable('category', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  parentId: uuid('parentId'),
  slug: text('slug').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => {
  return {
    categorySlugIdx: uniqueIndex('category_slug_idx').on(table.slug),
  }
})

// Self-referencing relation for categories
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'subcategories',
  }),
  children: many(categories, {
    relationName: 'subcategories',
  }),
  products: many(products),
}))

// BRANDS
export const brands = pgTable('brand', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => {
  return {
    brandSlugIdx: uniqueIndex('brand_slug_idx').on(table.slug),
  }
})

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}))

// PRODUCTS
export const products = pgTable(
  'product',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    sku: text('sku').notNull(),
    categoryId: uuid('categoryId').references(() => categories.id, { onDelete: 'set null' }),
    brandId: uuid('brandId').references(() => brands.id, { onDelete: 'set null' }),
    images: text('images').array().notNull(),
    description: text('description').notNull(),
    stock: integer('stock').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull().default('0'),
    discountPrice: numeric('discountprice', { precision: 12, scale: 2 }),
    isFeatured: boolean('isFeatured').default(false).notNull(),
    banner: text('banner'),
    attributes: json('attributes'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (table) => {
    return {
      productSlugIdx: uniqueIndex('product_slug_idx').on(table.slug),
      productSkuIdx: uniqueIndex('product_sku_idx').on(table.sku),
    }
  }
)

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
}))

// CARTS
export const carts = pgTable('cart', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  userId: uuid('userId').references(() => users.id, {
    onDelete: 'cascade',
  }),
  sessionCartId: text('sessionCartId').notNull(),
  items: json('items').$type<CartItem[]>().notNull().default([]),
  itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// ORDERS
export const orders = pgTable('order', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  shippingAddress: json('shippingAddress').$type<ShippingAddress>().notNull(),
  paymentMethod: text('paymentMethod').notNull(),
  paymentResult: json('paymentResult').$type<PaymentResult>(),
  itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
  isPaid: boolean('isPaid').notNull().default(false),
  paidAt: timestamp('paidAt'),
  isDelivered: boolean('isDelivered').notNull().default(false),
  deliveredAt: timestamp('deliveredAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}))

export const orderItems = pgTable(
  'orderItems',
  {
    orderId: uuid('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    qty: integer('qty').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
  },
  (orderItem) => ({
    compoundKey: primaryKey({
      columns: [orderItem.orderId, orderItem.productId],
    }),
  })
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))
