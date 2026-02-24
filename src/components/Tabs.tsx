import React, { createContext, useContext, useState } from 'react'

type TabsVariant = 'line' | 'card' | 'pills'

interface TabsContextType {
  value: string
  onChange: (value: string) => void
  variant: TabsVariant
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export interface TabsProps {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  variant?: TabsVariant
  children: React.ReactNode
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
  variant = 'line',
  children,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const onChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    controlledOnChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onChange, variant }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  )
}

export interface TabListProps {
  children: React.ReactNode
  className?: string
}

export const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
}) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabList must be used within Tabs')

  const { variant } = context

  const variantStyles = {
    line: 'border-b border-gray-200 dark:border-gray-700',
    card: 'bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-lg',
    pills: 'gap-2',
  }

  return (
    <div className={`flex ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}

export interface TabProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const Tab: React.FC<TabProps> = ({
  value,
  children,
  disabled = false,
  className = '',
}) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  const { value: activeValue, onChange, variant } = context
  const isActive = activeValue === value

  const baseStyles =
    'px-4 py-2 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    line: `border-b-2 -mb-px ${
      isActive
        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
    }`,
    card: `rounded-md ${
      isActive
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`,
    pills: `rounded-full ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
    }`,
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      role='tab'
      aria-selected={isActive}
    >
      {children}
    </button>
  )
}

export interface TabPanelsProps {
  children: React.ReactNode
  className?: string
}

export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  className = '',
}) => {
  return <div className={`mt-4 ${className}`}>{children}</div>
}

export interface TabPanelProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  children,
  className = '',
}) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')

  const { value: activeValue } = context

  if (activeValue !== value) return null

  return (
    <div
      role='tabpanel'
      className={`animate-in fade-in slide-in-from-left-2 duration-200 ${className}`}
    >
      {children}
    </div>
  )
}
