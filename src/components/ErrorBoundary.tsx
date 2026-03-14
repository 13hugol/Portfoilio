import React from 'react'

const serializeError = (error: unknown) => {
  if (error instanceof Error) return error.message + '\n' + error.stack
  return JSON.stringify(error, null, 2)
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: unknown }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-500 rounded bg-dark-surface">
          <h2 className="text-red-500 font-mono mb-2">Something went wrong.</h2>
          <pre className="text-sm text-text-secondary whitespace-pre-wrap">
            {serializeError(this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
