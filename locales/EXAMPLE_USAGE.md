# Example: How to Use Translations in Your Components

## Example 1: Update Navbar with Vietnamese Translations

Here's how you can update your navbar to support Vietnamese:

```typescript
// components/shared/navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar({ locale = 'en' }: { locale?: 'en' | 'vi' }) {
  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper">
        <NavigationMenu className="max-w-full justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform duration-200 ease-in-out hover:scale-110"
                  )}
                >
                  {t('navbar.home', locale)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/search" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform duration-200 ease-in-out hover:scale-110"
                  )}
                >
                  {t('navbar.shop', locale)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/cart" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform duration-200 ease-in-out hover:scale-110"
                  )}
                >
                  {t('navbar.cart', locale)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/user/orders" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform duration-200 ease-in-out hover:scale-110"
                  )}
                >
                  {t('navbar.orders', locale)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/user/profile" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-transform duration-200 ease-in-out hover:scale-110"
                  )}
                >
                  {t('navbar.profile', locale)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
```

## Example 2: Update Footer with Vietnamese

```typescript
// components/shared/footer.tsx
import { t } from '@/lib/i18n'
import { APP_NAME } from '@/lib/constants'

const Footer = ({ locale = 'en' }: { locale?: 'en' | 'vi' }) => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        2024 {APP_NAME}. {t('common.all_rights_reserved', locale)}
      </div>
    </footer>
  )
}

export default Footer
```

## Example 3: Update Product List with Vietnamese

```typescript
// In your product page
import { t } from '@/lib/i18n'

export default function ProductPage({ locale = 'en' }: { locale?: 'en' | 'vi' }) {
  return (
    <div>
      <h1>{t('product.newest_arrivals', locale)}</h1>
      <button>{t('product.add_to_cart', locale)}</button>
    </div>
  )
}
```

## Example 4: Language Switcher Component

Create a component to switch between languages:

```typescript
// components/shared/language-switcher.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<'en' | 'vi'>('en')

  const handleLocaleChange = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale)
    // Store in localStorage or cookies
    localStorage.setItem('locale', newLocale)
    // Trigger a page refresh or update context
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange('vi')}>
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Example 5: Using Translations in Forms

```typescript
// In a form component
import { t } from '@/lib/i18n'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function SignInForm({ locale = 'en' }: { locale?: 'en' | 'vi' }) {
  return (
    <form>
      <div>
        <Label htmlFor="email">{t('auth.email', locale)}</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder={t('placeholders.email', locale)} 
        />
      </div>
      
      <div>
        <Label htmlFor="password">{t('auth.password', locale)}</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder={t('auth.enter_password', locale)} 
        />
      </div>
      
      <button type="submit">
        {t('auth.sign_in', locale)}
      </button>
    </form>
  )
}
```

## Quick Test

To quickly test if translations are working, you can use the browser console:

```javascript
// In your browser console
import { t } from '@/lib/i18n'

// Test English
console.log(t('navbar.home', 'en')) // Output: "Home"

// Test Vietnamese
console.log(t('navbar.home', 'vi')) // Output: "Trang chủ"
```

## Available Translation Keys

Here are some commonly used keys:

### Navigation
- `navbar.home` - Home / Trang chủ
- `navbar.shop` - Shop / Cửa hàng
- `navbar.cart` - Cart / Giỏ hàng
- `navbar.orders` - Orders / Đơn hàng
- `navbar.profile` - Profile / Hồ sơ

### Authentication
- `auth.sign_in` - Sign In / Đăng nhập
- `auth.sign_up` - Sign Up / Đăng ký
- `auth.email` - Email / Email
- `auth.password` - Password / Mật khẩu

### Products
- `product.newest_arrivals` - Newest Arrivals / Sản phẩm mới nhất
- `product.add_to_cart` - Add to Cart / Thêm vào giỏ
- `product.price` - Price / Giá

### Common Actions
- `common.submit` - Submit / Gửi
- `common.cancel` - Cancel / Hủy
- `common.continue` - Continue / Tiếp tục
- `common.update` - Update / Cập nhật

For a complete list, check `locales/en.json` or `locales/vi.json`.

