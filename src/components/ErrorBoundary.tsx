import React, { Component, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface border border-line">
              <AlertCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-display text-3xl text-text mb-4">
              Something went wrong
            </h1>
            <p className="text-mute mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-accent text-primary-foreground rounded-md font-medium hover:bg-accent/90 transition-all duration-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;