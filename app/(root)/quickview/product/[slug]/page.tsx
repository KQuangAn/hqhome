import { redirect } from 'next/navigation'

export default async function QuickViewPage(context: { params: Promise<{ slug: string }> }) {
  redirect(`/product/${(await context.params).slug}`)
}
