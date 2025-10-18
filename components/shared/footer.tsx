'use client'

import { APP_NAME } from '@/lib/constants'
import { useLocale } from '@/context/LocaleContext'

const Footer = () => {
  const { t } = useLocale()
  
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        2024 {APP_NAME}. {t('common.all_rights_reserved')}.
      </div>
    </footer>
  )
}

export default Footer
