'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useLocale } from '@/context/LocaleContext'

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const { t } = useLocale()
  
  const links = [
    {
      title: t('admin.overview'),
      href: '/admin/overview',
    },
    {
      title: t('admin.products'),
      href: '/admin/products',
    },
    {
      title: t('admin.orders'),
      href: '/admin/orders',
    },
    {
      title: t('admin.users'),
      href: '/admin/users',
    },
    {
      title: t('admin.settings'),
      href: '/admin/settings',
    },
  ]
  
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes(item.href) ? '' : 'text-muted-foreground'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
