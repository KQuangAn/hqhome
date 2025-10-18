'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'

const categories = [
  {
    id: 1,
    titleKey: 'category_banner.best_selling',
    href: '/search?sort=popular',
    image: '/assets/images/p1-1.jpeg',
  },
  {
    id: 2,
    titleKey: 'category_banner.new_arrivals',
    href: '/search?sort=newest',
    image: '/assets/images/p2-1.jpeg',
  },
  {
    id: 3,
    titleKey: 'category_banner.featured',
    href: '/search?sort=rating',
    image: '/assets/images/p3-1.jpeg',
  },
]

export default function CategoryBanner() {
  const { t } = useLocale()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="group relative overflow-hidden rounded-lg aspect-[4/3] block"
        >
          {/* Image */}
          <Image
            src={category.image}
            alt={t(category.titleKey)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
          
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-xl md:text-2xl font-bold text-center px-4">
              {t(category.titleKey)}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

