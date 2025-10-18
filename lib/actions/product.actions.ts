'use server'

import { desc } from 'drizzle-orm'

import db from '@/db/drizzle'
import { products, categories, brands } from '@/db/schema'
import { and, count, eq, ilike, sql } from 'drizzle-orm/sql'
import { PAGE_SIZE } from '../constants'
import { revalidatePath } from 'next/cache'
import { formatError } from '../utils'
import { z } from 'zod'
import { insertProductSchema, updateProductSchema } from '../validator'

// CREATE
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data)
    await db.insert(products).values(product)

    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// UPDATE
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data)
    const productExists = await db.query.products.findFirst({
      where: eq(products.id, product.id),
    })
    if (!productExists) throw new Error('Product not found')
    await db.update(products).set(product).where(eq(products.id, product.id))
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// GET
export async function getProductById(productId: string) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: {
      category: true,
      brand: true,
    }
  })
}

export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 4,
    with: {
      category: true,
      brand: true,
    }
  })
  return data
}

export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
      brand: true,
    }
  })
}

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  brand,
  price,
  sort,
  attributes,
}: {
  query: string
  category?: string
  brand?: string
  limit?: number
  page: number
  price?: string
  sort?: string
  attributes?: Record<string, string | string[]>
}) {
  const queryFilter =
    query && query !== 'all' ? ilike(products.name, `%${query}%`) : undefined

  // Handle category filtering by slug or ID
  let categoryFilter = undefined
  if (category && category !== 'all') {
    // Check if it's a UUID (ID) or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(category)
    
    const categoryRecord = await db.query.categories.findFirst({
      where: isUUID ? eq(categories.id, category) : eq(categories.slug, category)
    })
    if (categoryRecord) {
      categoryFilter = eq(products.categoryId, categoryRecord.id)
    }
  }

  // Handle brand filtering by slug
  let brandFilter = undefined
  if (brand && brand !== 'all') {
    const brandRecord = await db.query.brands.findFirst({
      where: eq(brands.slug, brand)
    })
    if (brandRecord) {
      brandFilter = eq(products.brandId, brandRecord.id)
    }
  }

  // 100-200
  const priceFilter =
    price && price !== 'all'
      ? sql`${products.price} >= ${price.split('-')[0]} AND ${products.price
        } <= ${price.split('-')[1]}`
      : undefined

  // Handle attribute filtering
  const attributeFilters: any[] = []
  if (attributes && Object.keys(attributes).length > 0) {
    for (const [key, value] of Object.entries(attributes)) {
      if (value && value !== 'all') {
        if (Array.isArray(value)) {
          // For array values, check if any match
          attributeFilters.push(
            sql`EXISTS (
              SELECT 1 FROM jsonb_array_elements_text(${products.attributes}::jsonb->${key}) elem
              WHERE elem = ANY(${sql.raw(`ARRAY[${value.map(v => `'${v}'`).join(',')}]`)})
            )`
          )
        } else {
          // For single values
          attributeFilters.push(
            sql`(
              ${products.attributes}::jsonb->>${key} = ${value}
              OR EXISTS (
                SELECT 1 FROM jsonb_array_elements_text(${products.attributes}::jsonb->${key}) elem
                WHERE elem = ${value}
              )
            )`
          )
        }
      }
    }
  }

  const order =
    sort === 'lowest'
      ? products.price
      : sort === 'highest'
        ? desc(products.price)
        : sort === 'newest'
          ? desc(products.createdAt)
          : desc(products.createdAt)

  const condition = and(queryFilter, categoryFilter, brandFilter, priceFilter, ...attributeFilters)
  const data = await db.query.products.findMany({
    where: condition,
    with: {
      category: true,
      brand: true,
    },
    orderBy: order,
    limit,
    offset: (page - 1) * limit,
  })

  const dataCount = await db
    .select({ count: count() })
    .from(products)
    .where(condition)

  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

export async function getAllCategories() {
  const data = await db.query.categories.findMany({
    orderBy: [categories.name]
  })
  return data
}

export async function getAllBrands() {
  const data = await db.query.brands.findMany({
    orderBy: [brands.name]
  })
  return data
}


export async function getCategoryBySlug(slug: string) {
  return await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
    with: {
      products: true
    }
  })
}

export async function getBrandBySlug(slug: string) {
  return await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
    with: {
      products: true
    }
  })
}

// Get available attribute values for a category (for filters)
export async function getAttributeValuesByCategory(categoryIdentifier: string) {
  // Check if it's a UUID (ID) or slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryIdentifier)
  
  const categoryRecord = await db.query.categories.findFirst({
    where: isUUID ? eq(categories.id, categoryIdentifier) : eq(categories.slug, categoryIdentifier)
  })

  if (!categoryRecord) return {}

  // Get all products in this category
  const categoryProducts = await db.query.products.findMany({
    where: eq(products.categoryId, categoryRecord.id),
  })

  // Aggregate unique values for each attribute
  const attributeValues: Record<string, Set<string>> = {}

  categoryProducts.forEach(product => {
    if (!product.attributes) return

    const attrs = product.attributes as Record<string, any>
    Object.entries(attrs).forEach(([key, value]) => {
      if (!attributeValues[key]) {
        attributeValues[key] = new Set()
      }

      if (Array.isArray(value)) {
        value.forEach(v => attributeValues[key].add(String(v)))
      } else if (typeof value === 'string') {
        attributeValues[key].add(value)
      } else if (typeof value === 'object' && value !== null) {
        // For nested objects like design
        Object.values(value).flat().forEach((v: any) => {
          if (typeof v === 'string') attributeValues[key].add(v)
        })
      }
    })
  })

  // Convert Sets to sorted arrays
  const result: Record<string, string[]> = {}
  Object.entries(attributeValues).forEach(([key, values]) => {
    result[key] = Array.from(values).sort()
  })

  return result
}

export async function getFeaturedProducts() {
  const data = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
    orderBy: [desc(products.createdAt)],
    limit: 4,
  })
  return data
}

export async function getBestSellingProducts() {
  // Get products ordered by creation date (newest first)
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 8,
    with: {
      category: true,
      brand: true,
    }
  })
  return data
}
// DELETE
export async function deleteProduct(id: string) {
  try {
    const productExists = await db.query.products.findFirst({
      where: eq(products.id, id),
    })
    if (!productExists) throw new Error('Product not found')
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// CATEGORY ACTIONS
export async function createCategory(data: { name: string; slug: string; parentId?: string }) {
  try {
    await db.insert(categories).values(data)
    revalidatePath('/admin/categories')
    return {
      success: true,
      message: 'Category created successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function updateCategory(data: { id: string; name: string; slug: string; parentId?: string | null }) {
  try {
    const categoryExists = await db.query.categories.findFirst({
      where: eq(categories.id, data.id),
    })
    if (!categoryExists) throw new Error('Category not found')
    await db.update(categories).set(data).where(eq(categories.id, data.id))
    revalidatePath('/admin/categories')
    return {
      success: true,
      message: 'Category updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function deleteCategory(id: string) {
  try {
    const categoryExists = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    })
    if (!categoryExists) throw new Error('Category not found')
    await db.delete(categories).where(eq(categories.id, id))
    revalidatePath('/admin/categories')
    return {
      success: true,
      message: 'Category deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// BRAND ACTIONS
export async function createBrand(data: { name: string; slug: string }) {
  try {
    await db.insert(brands).values(data)
    revalidatePath('/admin/brands')
    return {
      success: true,
      message: 'Brand created successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function updateBrand(data: { id: string; name: string; slug: string }) {
  try {
    const brandExists = await db.query.brands.findFirst({
      where: eq(brands.id, data.id),
    })
    if (!brandExists) throw new Error('Brand not found')
    await db.update(brands).set(data).where(eq(brands.id, data.id))
    revalidatePath('/admin/brands')
    return {
      success: true,
      message: 'Brand updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function deleteBrand(id: string) {
  try {
    const brandExists = await db.query.brands.findFirst({
      where: eq(brands.id, id),
    })
    if (!brandExists) throw new Error('Brand not found')
    await db.delete(brands).where(eq(brands.id, id))
    revalidatePath('/admin/brands')
    return {
      success: true,
      message: 'Brand deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
