'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/context/LocaleContext'

const CheckoutSteps = ({ current = 0 }) => {
  const { t } = useLocale()
  
  const steps = [
    t('checkout.checkout_steps.user_login'),
    t('checkout.checkout_steps.shipping_address'),
    t('checkout.checkout_steps.payment_method'),
    t('checkout.checkout_steps.place_order')
  ]
  
  return (
    <div className="flex-between  flex-col md:flex-row  space-x-2 space-y-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              'p-2 w-56 rounded-full text-center  text-sm',
              index === current ? 'bg-secondary' : ''
            )}
          >
            {step}
          </div>
          {index !== steps.length - 1 && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
export default CheckoutSteps
