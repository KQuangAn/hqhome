import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-40" />
    </div>
  )
}

export default Loading
