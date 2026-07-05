import React from 'react'

const serializeError = (error: unknown) => {
  if (error instanceof Error) return error.message + '\n' + error.stack
  return JSON.stringify(error, null, 2)
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  /** Optional inline fallback — used by Product3D so a Three failure degrades gracefully. */
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: unknown }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      // Prefer an inline fallback if one was provided (e.g. the 3D canvas),
      // otherwise show the full-page error UI.
      if (this.props.fallback) return <>{this.props.fallback}</>

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-ink">
          <div className="card p-8 max-w-2xl w-full">
            <div className="label label-faint mb-3">— Error</div>
            <h2 className="editorial-h text-text text-3xl mb-4">Something went wrong.</h2>
            <pre className="font-mono text-xs text-muted whitespace-pre-wrap break-all">
              {serializeError(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-text text-ink px-5 py-2.5 font-sans text-sm font-semibold rounded-small"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
