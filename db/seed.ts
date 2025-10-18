import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import * as schema from './schema'
import sampleData from '@/lib/sample-data'
import { sql } from 'drizzle-orm'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
    })
    await client.connect()
    const db = drizzle(client)
    // Delete existing data in correct order
    await db.delete(schema.products)
    await db.delete(schema.categories)
    await db.delete(schema.brands)
    await db.delete(schema.accounts)
    await db.delete(schema.users)

    // Insert users
    const resUsers = await db
      .insert(schema.users)
      .values(sampleData.users)
      .returning()
    console.log('Inserted users:', resUsers.length)

    // Insert categories with Vietnamese slugs
    const resCategories = await db
      .insert(schema.categories)
      .values(sampleData.categories)
      .returning()
    console.log('Inserted categories:', resCategories.length)

    // Insert brands
    const resBrands = await db
      .insert(schema.brands)
      .values(sampleData.brands)
      .returning()
    console.log('Inserted brands:', resBrands.length)

    // Create lookup maps for categories and brands (using Vietnamese slugs)
    const categoryMap = new Map(resCategories.map(c => [c.slug, c.id]))
    const brandMap = new Map(resBrands.map(b => [b.slug, b.id]))

    // Map products to include categoryId and brandId based on product names/slugs
    const productsWithIds = sampleData.products.map(product => {
      let categoryId = null
      let brandId = null
      
      // Determine category based on product name/slug
      if (product.name.includes('Gạch') || product.slug.includes('gach')) {
        categoryId = resCategories.find(c => c.slug === 'gach-op-lat')?.id || null
      } else if (product.name.includes('Bồn') || product.name.includes('Sen') || product.name.includes('Vòi') || product.slug.includes('bon') || product.slug.includes('sen') || product.slug.includes('voi')) {
        categoryId = resCategories.find(c => c.slug === 'thiet-bi-ve-sinh')?.id || null
      } else if (product.name.includes('Bếp') || product.name.includes('Chậu') || product.slug.includes('bep') || product.slug.includes('chau')) {
        categoryId = resCategories.find(c => c.slug === 'thiet-bi-bep')?.id || null
      } else {
        categoryId = resCategories.find(c => c.slug === 'phu-kien')?.id || null
      }
      
      // Determine brand based on product name/slug
      if (product.name.includes('Viglacera') || product.slug.includes('viglacera')) {
        brandId = resBrands.find(b => b.slug === 'viglacera')?.id || null
      } else if (product.name.includes('Toto') || product.slug.includes('toto')) {
        brandId = resBrands.find(b => b.slug === 'toto')?.id || null
      } else if (product.name.includes('Inax') || product.slug.includes('inax')) {
        brandId = resBrands.find(b => b.slug === 'inax')?.id || null
      } else if (product.name.includes('American Standard') || product.slug.includes('american-standard')) {
        brandId = resBrands.find(b => b.slug === 'american-standard')?.id || null
      } else if (product.name.includes('Cotto') || product.slug.includes('cotto')) {
        brandId = resBrands.find(b => b.slug === 'cotto')?.id || null
      }
      
      return {
        ...product,
        categoryId,
        brandId,
      }
    })

    // Insert products
    const resProducts = await db
      .insert(schema.products)
      .values(productsWithIds)
      .returning()
    console.log('Inserted products:', resProducts.length)

    console.log('Database seeded successfully!')
    await client.end()
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
