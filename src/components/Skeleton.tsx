import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | false
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  style,
  ...props
}) => {
  // Base styles
  const baseStyles = 'bg-gray-200 dark:bg-gray-700'

  // Variant styles
  const variants = {
    text: 'mt-0 mb-0 h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-md',
  }

  // Animation styles
  const animations = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent dark:before:via-white/10',
    false: '',
  }

  const variantClasses = variants[variant]
  const animationClasses = animation ? animations[animation] : ''

  // Compute dimensions
  const computedStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  }

  return (
    <div
      className={`${baseStyles} ${variantClasses} ${animationClasses} ${className}`}
      style={computedStyle}
      {...props}
    />
  )
}
