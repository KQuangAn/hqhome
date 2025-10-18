export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Amazona'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An Amazon clone built with Next.js, Postgres, Shadcn'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 3

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery']
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user']

export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}

export const productDefaultValues = {
  name: '',
  slug: '',
  sku: '',
  categoryId: null,
  brandId: null,
  images: [],
  description: '',
  price: '0',
  discountPrice: null,
  stock: 0,
  isFeatured: false,
  banner: null,
  attributes: null,
}


// Product Attributes Constants
export const PRODUCT_ATTRIBUTE_KEYS = {
  // Common attributes
  COLOR: 'color',
  SIZE: 'size',
  MATERIAL: 'material',
  ORIGIN: 'origin',
  WARRANTY: 'warranty',
  
  // Tiles/Flooring specific
  SURFACE: 'surface',
  TEXTURE: 'texture',
  APPLICABLE_ZONE: 'applicable_zone',
  THICKNESS: 'thickness',
  TILE_TYPE: 'tile_type',
  SLIP_RESISTANCE: 'slip_resistance',
  WATER_ABSORPTION: 'water_absorption',
  
  // Toiletries/Sanitary specific
  TOILETRIES_TYPE: 'toiletries_type',
  DESIGN: 'design',
  INSTALLATION_TYPE: 'installation_type',
  FLUSH_TYPE: 'flush_type',
  WATER_CONSUMPTION: 'water_consumption',
  VALVE_TYPE: 'valve_type',
  
  // Kitchen specific
  BOWLS: 'bowls',
  POWER: 'power',
  ZONES: 'zones',
  CONTROL: 'control',
  SAFETY: 'safety',
  
  // Accessory specific
  ITEMS: 'items',
  INCLUDES: 'includes',
} as const

// Predefined attribute values
export const PRODUCT_ATTRIBUTES = {
  // ========== COMMON ATTRIBUTES ==========
  [PRODUCT_ATTRIBUTE_KEYS.COLOR]: {
    label: 'Color',
    label_vi: 'Màu sắc',
    type: 'array',
    options: [
      'White', 'Off-White', 'Cream', 'Beige', 'Ivory',
      'Black', 'Charcoal', 'Gray', 'Light Gray', 'Dark Gray',
      'Brown', 'Walnut', 'Oak', 'Mahogany',
      'Red', 'Burgundy', 'Terracotta',
      'Blue', 'Navy', 'Teal', 'Turquoise', 'Sky Blue',
      'Green', 'Olive', 'Sage', 'Emerald',
      'Yellow', 'Gold', 'Amber',
      'Pink', 'Rose', 'Coral',
      'Orange', 'Rust',
      'Purple', 'Lavender', 'Plum',
      'Silver', 'Chrome', 'Brass', 'Bronze', 'Copper',
      'Multicolor', 'Mixed', 'Natural Stone',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.SIZE]: {
    label: 'Size',
    label_vi: 'Kích thước',
    type: 'array',
    options: [
      // Tiles - Square
      '30x30cm', '40x40cm', '50x50cm', '60x60cm', '80x80cm', '100x100cm', '120x120cm',
      // Tiles - Rectangle
      '30x60cm', '40x80cm', '60x90cm', '60x120cm', '75x150cm',
      // Tiles - Other formats
      '20x20cm', '25x25cm', '15x60cm', '20x100cm',
      // Hexagon, Special shapes
      'Hexagon 20cm', 'Hexagon 30cm',
      // Sanitary dimensions
      '800x450mm', '1000x500mm', '1200x600mm',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.MATERIAL]: {
    label: 'Material',
    label_vi: 'Chất liệu',
    type: 'array',
    options: [
      // Tiles
      'Porcelain', 'Ceramic', 'Granite', 'Marble', 'Natural Stone',
      'Terrazzo', 'Cement', 'Glass', 'Mosaic',
      // Sanitary
      'Vitreous China', 'Fireclay', 'Acrylic', 'Cast Iron',
      'Stainless Steel 304', 'Stainless Steel 316',
      'Brass', 'Copper', 'Bronze', 'Zinc Alloy',
      // Mixed
      'Composite', 'Quartz', 'Resin',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.ORIGIN]: {
    label: 'Origin',
    label_vi: 'Xuất xứ',
    type: 'string',
    options: ['Vietnam', 'Thailand', 'China', 'India', 'Spain', 'Italy', 'Germany', 'Japan', 'USA'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.WARRANTY]: {
    label: 'Warranty',
    label_vi: 'Bảo hành',
    type: 'string',
    options: ['6 months', '1 year', '2 years', '3 years', '5 years', '10 years', 'Lifetime'],
  },

  // ========== TILES/FLOORING SPECIFIC ==========
  [PRODUCT_ATTRIBUTE_KEYS.SURFACE]: {
    label: 'Surface Finish',
    label_vi: 'Bề mặt',
    type: 'array',
    options: [
      'Polished', 'Glossy', 'High Gloss',
      'Matt', 'Matte', 'Semi-Matte',
      'Satin', 'Honed',
      'Textured', 'Structured', 'Relief',
      'Anti-slip', 'R9', 'R10', 'R11', 'R12',
      'Lappato', 'Semi-Polished',
      'Natural', 'Rustic',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.TEXTURE]: {
    label: 'Texture/Pattern',
    label_vi: 'Họa tiết',
    type: 'array',
    options: [
      'Cement', 'Concrete',
      'Wood', 'Wood Grain', 'Oak', 'Walnut',
      'Marble Veins', 'Marble Effect',
      'Stone', 'Slate', 'Travertine',
      'Fabric', 'Textile',
      'Geometric', 'Hexagon', 'Chevron', 'Herringbone',
      'Multicolor', 'Terrazzo',
      'Solid Color', 'Plain',
      'Mosaic', 'Patchwork',
      'Metallic', 'Industrial',
      'Floral', 'Botanical',
      'Abstract', 'Artistic',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.APPLICABLE_ZONE]: {
    label: 'Applicable Zone',
    label_vi: 'Khu vực ứng dụng',
    type: 'array',
    options: [
      'Kitchen', 'Kitchen Floor', 'Kitchen Wall',
      'Living Room', 'Living Room Floor',
      'Bedroom', 'Bedroom Floor',
      'Bathroom', 'Bathroom Floor', 'Bathroom Wall',
      'Toilet',
      'Balcony', 'Terrace',
      'Outdoor', 'Garden', 'Pool Area',
      'Hallway', 'Corridor',
      'Stairs',
      'Commercial Space', 'Office',
      'Garage',
      'Wall', 'Floor', 'Both Wall & Floor',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.THICKNESS]: {
    label: 'Thickness',
    label_vi: 'Độ dày',
    type: 'string',
    options: ['6mm', '7mm', '8mm', '9mm', '10mm', '11mm', '12mm', '15mm', '20mm'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.TILE_TYPE]: {
    label: 'Tile Type',
    label_vi: 'Loại gạch',
    type: 'string',
    options: [
      'Floor Tile', 'Wall Tile', 'Both',
      'Glazed', 'Unglazed',
      'Full Body', 'Double Charge',
      'Outdoor Tile', 'Indoor Tile',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.SLIP_RESISTANCE]: {
    label: 'Slip Resistance',
    label_vi: 'Chống trơn',
    type: 'string',
    options: ['R9', 'R10', 'R11', 'R12', 'R13'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.WATER_ABSORPTION]: {
    label: 'Water Absorption',
    label_vi: 'Hút nước',
    type: 'string',
    options: ['< 0.5%', '0.5-3%', '3-6%', '6-10%', '> 10%'],
  },

  // ========== TOILETRIES/SANITARY SPECIFIC ==========
  [PRODUCT_ATTRIBUTE_KEYS.TOILETRIES_TYPE]: {
    label: 'Product Type',
    label_vi: 'Loại sản phẩm',
    type: 'string',
    options: ['Toilet', 'Sink', 'Lavabo', 'Bathtub', 'Shower Head', 'Faucet', 'Shower System', 'Accessory'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.DESIGN]: {
    label: 'Design Features',
    label_vi: 'Thiết kế',
    type: 'object',
    // For Toilet/WC
    toilet: [
      'One-Piece', 'Two-Piece', 'Wall-Hung', 'Floor-Mounted',
      'Smart Toilet', 'Electronic Bidet',
      'Rimless', 'Standard Rim',
      'Soft Close', 'Quick Release',
    ],
    // For Sink/Lavabo
    sink: [
      'Wall-Mounted', 'Pedestal', 'Semi-Pedestal',
      'Countertop', 'Undermount', 'Drop-in', 'Vessel',
      'Integrated', 'Console',
      'Single Basin', 'Double Basin',
      'Rectangular', 'Round', 'Oval', 'Square',
    ],
    // For Bathtub
    bathtub: [
      'Freestanding', 'Built-in', 'Corner', 'Drop-in',
      'Alcove', 'Undermount',
      'Massage', 'Whirlpool', 'Jacuzzi', 'Air Jet',
      'Standard', 'Soaking', 'Deep Soaking',
      'Space-Saving', 'Compact',
      'Rectangular', 'Oval', 'Round', 'Asymmetric',
    ],
    // For Shower Head
    showerHead: [
      'Fixed', 'Handheld', 'Dual',
      'Rain Shower', 'Waterfall', 'Mist', 'Massage',
      'Single Function', 'Multi-Function',
      'Round', 'Square', 'Rectangular',
      'Wall-Mounted', 'Ceiling-Mounted',
      'Adjustable Height',
    ],
    // For Faucet
    faucet: [
      'Single Handle', 'Double Handle', 'Touchless',
      'Deck-Mounted', 'Wall-Mounted',
      'High Arc', 'Low Arc', 'Standard',
      'Pull-Out', 'Pull-Down',
      'Swivel Spout', 'Fixed Spout',
    ],
    // For Accessory
    accessory: [
      'Towel Bar', 'Towel Ring', 'Towel Rack',
      'Paper Holder', 'Toilet Brush Holder',
      'Soap Dish', 'Soap Dispenser',
      'Robe Hook', 'Double Hook',
      'Shelf', 'Glass Shelf', 'Corner Shelf',
      'Grab Bar', 'Safety Rail',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.INSTALLATION_TYPE]: {
    label: 'Installation',
    label_vi: 'Cách lắp đặt',
    type: 'string',
    options: [
      'Wall-Mounted', 'Floor-Mounted', 'Ceiling-Mounted',
      'Deck-Mounted', 'Undermount', 'Drop-in', 'Top-Mount',
      'Built-in', 'Freestanding', 'Surface-Mounted',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.FLUSH_TYPE]: {
    label: 'Flush Type',
    label_vi: 'Loại xả',
    type: 'string',
    options: [
      'Tornado Flush', 'Cyclone Flush', 'Siphonic',
      'Dual Flush', 'Single Flush',
      'Smart Flush', 'Sensor Flush',
      'Rimless Flush',
    ],
  },
  [PRODUCT_ATTRIBUTE_KEYS.WATER_CONSUMPTION]: {
    label: 'Water Consumption',
    label_vi: 'Lượng nước tiêu thụ',
    type: 'string',
    options: ['3L', '3.5L', '4L', '4.5L', '6L', '3/6L Dual', '4/6L Dual', 'Eco Mode'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.VALVE_TYPE]: {
    label: 'Valve Type',
    label_vi: 'Loại van',
    type: 'string',
    options: ['Ceramic', 'Brass', 'Cartridge', 'Ball', 'Disc', 'Compression', 'Thermostatic'],
  },

  // ========== KITCHEN SPECIFIC ==========
  [PRODUCT_ATTRIBUTE_KEYS.BOWLS]: {
    label: 'Number of Bowls',
    label_vi: 'Số hộc',
    type: 'string',
    options: ['1', '1.5', '2', '3'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.POWER]: {
    label: 'Power',
    label_vi: 'Công suất',
    type: 'string',
    options: ['1000W', '1500W', '2000W', '2500W', '3000W', '3500W', '4000W', '5000W', '6000W'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.ZONES]: {
    label: 'Cooking Zones',
    label_vi: 'Số bếp',
    type: 'string',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.CONTROL]: {
    label: 'Control Type',
    label_vi: 'Điều khiển',
    type: 'string',
    options: ['Touch', 'Touch Screen', 'Knob', 'Slider', 'Digital', 'Smart App'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.SAFETY]: {
    label: 'Safety Features',
    label_vi: 'Tính năng an toàn',
    type: 'array',
    options: [
      'Auto Shutoff', 'Child Lock', 'Safety Lock',
      'Overheating Protection', 'Temperature Control',
      'Residual Heat Indicator', 'Timer',
      'Anti-Dry Protection', 'Flame Failure Protection',
    ],
  },

  // ========== ACCESSORY SPECIFIC ==========
  [PRODUCT_ATTRIBUTE_KEYS.ITEMS]: {
    label: 'Number of Items',
    label_vi: 'Số lượng',
    type: 'string',
    options: ['1 piece', '2 pieces', '3 pieces', '4 pieces', '5 pieces', 'Set of 6', 'Set of 8'],
  },
  [PRODUCT_ATTRIBUTE_KEYS.INCLUDES]: {
    label: 'Package Includes',
    label_vi: 'Bao gồm',
    type: 'array',
    examples: [
      'Mounting hardware',
      'Installation manual',
      'Screws and anchors',
      'Remote control',
      'Batteries',
      'Warranty card',
    ],
  },
} as const

// Parent Product Categories
export const PRODUCT_CATEGORIES = {
  TILES_FLOORING: {
    key: 'tiles-flooring',
    slug_vi: 'gach-op-lat',
    name: 'Tiles & Flooring',
    name_vi: 'Gạch Ốp Lát',
    description: 'Premium tiles and flooring solutions for your home',
    description_vi: 'Gạch ốp lát cao cấp cho ngôi nhà của bạn',
  },
  SANITARY_WARE: {
    key: 'sanitary-ware',
    slug_vi: 'thiet-bi-ve-sinh',
    name: 'Sanitary Ware',
    name_vi: 'Thiết Bị Vệ Sinh',
    description: 'Complete bathroom and sanitary equipment',
    description_vi: 'Thiết bị vệ sinh phòng tắm hoàn chỉnh',
  },
  KITCHEN_EQUIPMENT: {
    key: 'kitchen-equipment',
    slug_vi: 'thiet-bi-bep',
    name: 'Kitchen Equipment',
    name_vi: 'Thiết Bị Bếp',
    description: 'Modern kitchen appliances and fixtures',
    description_vi: 'Thiết bị bếp hiện đại',
  },
  ACCESSORIES: {
    key: 'accessories',
    slug_vi: 'phu-kien',
    name: 'Accessories',
    name_vi: 'Phụ Kiện',
    description: 'Essential home accessories and fixtures',
    description_vi: 'Phụ kiện thiết yếu cho ngôi nhà',
  },
} as const

// Category to Attributes Mapping (using English keys)
export const CATEGORY_ATTRIBUTES_MAP = {
  // Tiles/Flooring Category
  'tiles-flooring': [
    PRODUCT_ATTRIBUTE_KEYS.COLOR,
    PRODUCT_ATTRIBUTE_KEYS.SIZE,
    PRODUCT_ATTRIBUTE_KEYS.MATERIAL,
    PRODUCT_ATTRIBUTE_KEYS.SURFACE,
    PRODUCT_ATTRIBUTE_KEYS.TEXTURE,
    PRODUCT_ATTRIBUTE_KEYS.APPLICABLE_ZONE,
    PRODUCT_ATTRIBUTE_KEYS.THICKNESS,
    PRODUCT_ATTRIBUTE_KEYS.TILE_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.SLIP_RESISTANCE,
    PRODUCT_ATTRIBUTE_KEYS.WATER_ABSORPTION,
    PRODUCT_ATTRIBUTE_KEYS.ORIGIN,
    PRODUCT_ATTRIBUTE_KEYS.WARRANTY,
  ],
  // Sanitary Ware Category
  'sanitary-ware': [
    PRODUCT_ATTRIBUTE_KEYS.TOILETRIES_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.COLOR,
    PRODUCT_ATTRIBUTE_KEYS.MATERIAL,
    PRODUCT_ATTRIBUTE_KEYS.DESIGN,
    PRODUCT_ATTRIBUTE_KEYS.INSTALLATION_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.FLUSH_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.WATER_CONSUMPTION,
    PRODUCT_ATTRIBUTE_KEYS.VALVE_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.ORIGIN,
    PRODUCT_ATTRIBUTE_KEYS.WARRANTY,
  ],
  // Kitchen Equipment Category
  'kitchen-equipment': [
    PRODUCT_ATTRIBUTE_KEYS.COLOR,
    PRODUCT_ATTRIBUTE_KEYS.SIZE,
    PRODUCT_ATTRIBUTE_KEYS.MATERIAL,
    PRODUCT_ATTRIBUTE_KEYS.BOWLS,
    PRODUCT_ATTRIBUTE_KEYS.POWER,
    PRODUCT_ATTRIBUTE_KEYS.ZONES,
    PRODUCT_ATTRIBUTE_KEYS.CONTROL,
    PRODUCT_ATTRIBUTE_KEYS.SAFETY,
    PRODUCT_ATTRIBUTE_KEYS.INSTALLATION_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.ORIGIN,
    PRODUCT_ATTRIBUTE_KEYS.WARRANTY,
  ],
  // Accessories Category
  'accessories': [
    PRODUCT_ATTRIBUTE_KEYS.TOILETRIES_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.COLOR,
    PRODUCT_ATTRIBUTE_KEYS.MATERIAL,
    PRODUCT_ATTRIBUTE_KEYS.DESIGN,
    PRODUCT_ATTRIBUTE_KEYS.INSTALLATION_TYPE,
    PRODUCT_ATTRIBUTE_KEYS.ITEMS,
    PRODUCT_ATTRIBUTE_KEYS.INCLUDES,
    PRODUCT_ATTRIBUTE_KEYS.ORIGIN,
    PRODUCT_ATTRIBUTE_KEYS.WARRANTY,
  ],
} as const

// Helper type for category slugs
export type CategorySlug = keyof typeof CATEGORY_ATTRIBUTES_MAP

// Get attributes for a category (supports both English and Vietnamese slugs)
export function getCategoryAttributes(categorySlug: string) {
  // Try direct match first
  if (categorySlug in CATEGORY_ATTRIBUTES_MAP) {
    return CATEGORY_ATTRIBUTES_MAP[categorySlug as CategorySlug]
  }
  
  // Try to find by Vietnamese slug
  const category = Object.values(PRODUCT_CATEGORIES).find(
    cat => cat.slug_vi === categorySlug
  )
  
  if (category) {
    return CATEGORY_ATTRIBUTES_MAP[category.key as CategorySlug] || []
  }
  
  return []
}

// Helper to get category info by slug (English or Vietnamese)
export function getCategoryInfo(slug: string) {
  // Check if it's an English key
  const byKey = Object.values(PRODUCT_CATEGORIES).find(cat => cat.key === slug)
  if (byKey) return byKey
  
  // Check if it's a Vietnamese slug
  const bySlugVi = Object.values(PRODUCT_CATEGORIES).find(cat => cat.slug_vi === slug)
  return bySlugVi || null
}
