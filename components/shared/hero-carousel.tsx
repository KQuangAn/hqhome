'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    image: '/assets/images/p1-1.jpeg',
    alt: 'Slide 1'
  },
  {
    id: 2,
    image: '/assets/images/p1-2.jpeg',
    alt: 'Slide 2'
  },
  {
    id: 3,
    image: '/assets/images/p2-1.jpeg',
    alt: 'Slide 3'
  },
  {
    id: 4,
    image: '/assets/images/p3-1.jpeg',
    alt: 'Slide 4'
  },
]

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Page Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              index === current
                ? 'bg-white w-12'
                : 'bg-white/50 w-6 hover:bg-white/75'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

