import { cn } from '@/lib/utils'

const ProductPrice = ({
  value,
  className,
}: {
  value: number
  className?: string
}) => {
  const formattedValue = new Intl.NumberFormat('vi-VN').format(value)
  return (
    <p className={cn('text-2xl', className)}>
      {formattedValue} <span className="text-xs align-super">₫</span>
    </p>
  )
}

export default ProductPrice
