# Internationalization (i18n) Files

This directory contains translation files for the e-commerce application.

## Available Languages

- **en.json** - English translations
- **vi.json** - Vietnamese translations (Tiếng Việt)

## Translation Structure

The translation files are organized into logical sections:

### Sections

- `common` - Common UI elements (buttons, actions)
- `navbar` - Navigation menu items
- `auth` - Authentication pages (sign in, sign up)
- `product` - Product-related text
- `cart` - Shopping cart
- `checkout` - Checkout process
- `order` - Order management
- `user` - User profile and account
- `admin` - Admin dashboard
- `features` - E-commerce features
- `review` - Product reviews
- `messages` - System messages and notifications
- `placeholders` - Form input placeholders
- `validation` - Form validation messages

## Usage

### Basic Usage

```typescript
import { t } from '@/lib/i18n'

// Get Vietnamese translation
const homeText = t('navbar.home', 'vi') // Returns: "Trang chủ"

// Get English translation
const homeText = t('navbar.home', 'en') // Returns: "Home"
```

### In React Components

```typescript
'use client'

import { t } from '@/lib/i18n'
import { useState } from 'react'

export default function MyComponent() {
  const [locale, setLocale] = useState<'en' | 'vi'>('en')
  
  return (
    <div>
      <h1>{t('product.newest_arrivals', locale)}</h1>
      <button onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}>
        {locale === 'en' ? 'Tiếng Việt' : 'English'}
      </button>
    </div>
  )
}
```

### With Context (Advanced)

For a more robust solution, you can create a context for managing the locale:

```typescript
// context/LocaleContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import { Locale, t as translate } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  
  const t = (key: string) => translate(key, locale)
  
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used within LocaleProvider')
  return context
}
```

## Adding New Translations

1. Open both `en.json` and `vi.json`
2. Add your new key-value pair in the appropriate section
3. Make sure the key exists in both files

Example:

```json
// en.json
{
  "product": {
    "new_key": "New English text"
  }
}

// vi.json
{
  "product": {
    "new_key": "Văn bản tiếng Việt mới"
  }
}
```

## Integration with Next.js App Router

For full Next.js integration with the App Router, consider using libraries like:
- [next-intl](https://next-intl-docs.vercel.app/)
- [next-i18next](https://github.com/i18next/next-i18next)

These libraries provide more advanced features like:
- URL-based locale detection
- Server and client component support
- Locale switching
- Fallback languages
- Pluralization
- Date/number formatting

## Notes

- All translations are stored in JSON format for easy editing
- Keys use dot notation for nested values (e.g., `navbar.home`)
- Keep translation keys consistent across all language files
- Use descriptive key names that indicate the content context

