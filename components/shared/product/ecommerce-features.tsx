'use client'

import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const EcommerceFeatures = () => {
  const { t } = useLocale()
  
  return (
    <div className="">
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-4 p-4 ">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">{t('features.free_shipping')}</div>
            <div className="text-sm text-muted-foreground">
              {t('features.free_shipping_desc')}
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign />
            <div className="text-sm font-bold">{t('features.money_guarantee')}</div>
            <div className="text-sm text-muted-foreground">
              {t('features.money_guarantee_desc')}
            </div>
          </div>

          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">{t('features.flexible_payment')}</div>
            <div className="text-sm text-muted-foreground">
              {t('features.flexible_payment_desc')}
            </div>
          </div>

          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">{t('features.support_247')}</div>
            <div className="text-sm text-muted-foreground">
              {t('features.support_247_desc')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EcommerceFeatures
