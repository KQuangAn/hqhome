import { auth } from '@/auth'
import UserButtonClient from './user-button-client'

export default async function UserButton() {
  const session = await auth()
  
  return (
    <UserButtonClient 
      user={session?.user ? {
        name: session.user.name || null,
        email: session.user.email || null,
        role: session.user.role || null
      } : null}
    />
  )
}
