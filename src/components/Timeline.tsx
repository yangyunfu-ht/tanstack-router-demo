import React from 'react'

export interface TimelineItemProps {
  children: React.ReactNode
  label?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray'
  icon?: React.ReactNode
  isLast?: boolean
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  children,
  label,
  color = 'primary',
  icon,
  isLast = false,
}) => {
  const colorClasses = {
    primary:
      'bg-blue-600 border-blue-600 text-blue-600 dark:bg-blue-500 dark:border-blue-500 dark:text-blue-500',
    success:
      'bg-green-600 border-green-600 text-green-600 dark:bg-green-500 dark:border-green-500 dark:text-green-500',
    warning:
      'bg-yellow-500 border-yellow-500 text-yellow-600 dark:bg-yellow-400 dark:border-yellow-400 dark:text-yellow-400',
    danger:
      'bg-red-600 border-red-600 text-red-600 dark:bg-red-500 dark:border-red-500 dark:text-red-500',
    info: 'bg-cyan-500 border-cyan-500 text-cyan-600 dark:bg-cyan-400 dark:border-cyan-400 dark:text-cyan-400',
    gray: 'bg-gray-400 border-gray-400 text-gray-500 dark:bg-gray-500 dark:border-gray-500 dark:text-gray-400',
  }

  return (
    <li className='relative flex gap-6 pb-8 last:pb-0'>
      {/* Line */}
      {!isLast && (
        <span
          className='absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700'
          aria-hidden='true'
        />
      )}

      {/* Icon/Dot */}
      <div className='relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900'>
        {icon ? (
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white dark:ring-gray-900 ${colorClasses[
              color
            ]
              .split(' ')
              .filter(c => c.startsWith('text'))
              .join(' ')}`}
          >
            {icon}
          </div>
        ) : (
          <div
            className={`h-2.5 w-2.5 rounded-full ring-1 ring-white dark:ring-gray-900 ${colorClasses[
              color
            ]
              .split(' ')
              .filter(c => !c.startsWith('text'))
              .join(' ')}`}
          />
        )}
      </div>

      {/* Content */}
      <div className='flex-auto pt-0.5'>
        {label && (
          <span className='block text-sm leading-5 text-gray-500 dark:text-gray-400 mb-1'>
            {label}
          </span>
        )}
        <div className='text-base leading-6 text-gray-900 dark:text-gray-200'>
          {children}
        </div>
      </div>
    </li>
  )
}

export interface TimelineProps {
  children: React.ReactNode
}

export const Timeline: React.FC<TimelineProps> = ({ children }) => {
  const items = React.Children.toArray(children)

  return (
    <ul className='m-0 p-0 list-none'>
      {items.map((item, index) => {
        if (React.isValidElement(item)) {
          return React.cloneElement(
            item as React.ReactElement<TimelineItemProps>,
            {
              isLast: index === items.length - 1,
            }
          )
        }
        return item
      })}
    </ul>
  )
}
