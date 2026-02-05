import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders board title', () => {
    render(<App />)
    expect(screen.getByText('React 게시판')).toBeInTheDocument()
  })

  it('renders post list', () => {
    render(<App />)
    expect(screen.getByText('게시판')).toBeInTheDocument()
  })
})
