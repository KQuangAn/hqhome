// Simple i18n utility for translation files
import enTranslations from '@/locales/en.json'
import viTranslations from '@/locales/vi.json'

export type Locale = 'en' | 'vi'

const translations = {
  en: enTranslations,
  vi: viTranslations,
}

export function getTranslations(locale: Locale = 'en') {
  return translations[locale] || translations.en
}

// Helper function to get nested translation by key path
// Example: t('navbar.home', 'vi') => 'Trang chủ'
export function t(keyPath: string, locale: Locale = 'en'): string {
  const keys = keyPath.split('.')
  const trans = getTranslations(locale)
  
  let result: any = trans
  for (const key of keys) {
    result = result?.[key]
    if (result === undefined) break
  }
  
  return typeof result === 'string' ? result : keyPath
}

// Example usage in components:
// import { t } from '@/lib/i18n'
// const text = t('navbar.home', 'vi') // Returns: "Trang chủ"
// const text = t('navbar.home', 'en') // Returns: "Home"

