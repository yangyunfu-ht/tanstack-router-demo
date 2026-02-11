import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

const TestComp = () => <div>Hello Test</div>

describe('Component Test', () => {
  it('renders correctly', () => {
    render(<TestComp />)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })
})
