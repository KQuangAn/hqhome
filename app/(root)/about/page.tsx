'use client'

import { useLocale } from '@/context/LocaleContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Building2, Users, Award, Heart } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const { t } = useLocale()

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t('about.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </section>

      {/* Company Info */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{t('about.our_story')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.story_content')}
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/assets/images/p1-1.jpeg"
            alt="About us"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">{t('about.our_values')}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Building2 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t('about.quality')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('about.quality_desc')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t('about.customer_first')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('about.customer_first_desc')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t('about.excellence')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('about.excellence_desc')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t('about.passion')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('about.passion_desc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <Card className="bg-secondary/20">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <CardTitle className="text-4xl text-primary">10+</CardTitle>
              <CardDescription>{t('about.years_experience')}</CardDescription>
            </div>
            <div>
              <CardTitle className="text-4xl text-primary">5000+</CardTitle>
              <CardDescription>{t('about.happy_customers')}</CardDescription>
            </div>
            <div>
              <CardTitle className="text-4xl text-primary">100+</CardTitle>
              <CardDescription>{t('about.products')}</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">{t('about.our_mission')}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('about.mission_content')}
        </p>
      </section>
    </div>
  )
}

