'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import { useLocale } from '@/context/LocaleContext'

interface UserButtonClientProps {
  user: {
    name: string | null
    email: string | null
    role: string | null
  } | null
}

export default function UserButtonClient({ user }: UserButtonClientProps) {
  const { t } = useLocale()
  
  if (!user) {
    return (
      <Link href="/api/auth/signin">
        <Button>{t('auth.sign_in')}</Button>
      </Link>
    )
  }
  
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2"
            >
              {user.name}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/profile">
              {t('user.profile')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/orders">
              {t('user.order_history')}
            </Link>
          </DropdownMenuItem>

          {user.role === 'admin' && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                {t('admin.admin_dashboard')}
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1">
            <form action={SignOut} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                {t('auth.sign_out')}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

