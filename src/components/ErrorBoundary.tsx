import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('=== ERROR BOUNDARY CAUGHT ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('Component Stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '4rem auto',
          color: '#fff',
          background: '#1a1a2e',
          borderRadius: '12px',
          fontFamily: 'monospace',
        }}>
          <h1 style={{ color: '#ff5f56' }}>💥 React Crash</h1>
          <p style={{ color: '#c9d1d9' }}>{this.state.error?.message}</p>
          <pre style={{
            background: '#0d1117',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            overflow: 'auto',
            maxHeight: '400px',
            color: '#8b949e',
          }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
